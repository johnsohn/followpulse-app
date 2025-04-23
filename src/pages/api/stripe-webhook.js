const getRawBody = require("raw-body");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const supabase = require("./_supabase");

// Disable next.js body parsing (stripe needs the raw body to validate the event)
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getCustomerEmail(object) {
  try{
  if (object?.customer_email) {
    return object.customer_email;
  }
  const customer = await stripe.customers.retrieve(object.customer);
  return customer.email;

  }catch(err){return ""}
}

export default async (req, res) => {


  const prices = {
    'price_1Q6sTnApM3x3Gh9EpT05hnFp':1,
    'price_1Q6sUHApM3x3Gh9EuR4TbbAO':3,
    'price_1Q6sUaApM3x3Gh9E4ZTNX3Ec':12
  }


  const headers = req.headers;

  try {
    const rawBody = await getRawBody(req);

    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`stripeEvent: ${stripeEvent.type}`);

    // Get the object from stripeEvent
    const object = stripeEvent.data.object;
    var subscription;
    //console.log(stripeEvent);
    const custiemail = getCustomerEmail(object);

    switch (stripeEvent.type) {
      case "checkout.session.completed":
          // Fetch subscription
          subscription = await stripe.subscriptions.retrieve(
            object.subscription
          );


          // return if this isnt relevant to us
          if (!prices.hasOwnProperty(subscription.items.data[0].price.id))
            break;

          var update = {
            subscription_status:"active",
            billing_start:new Date(subscription.current_period_start*1000).toISOString(),
            billing_end:new Date(subscription.current_period_end*1000).toISOString()
          };


          console.log("checkout",update);

          const custiemail = getCustomerEmail(object);

          await supabase.from("users").update(update).eq('email',custiemail);
          //await updateUser(customer.id,{nMessages:0,rollingCreditsMax:owedCredit,periodCount:0});
          break;

      case "invoice.paid":

        // no money fuck
        if (object.amount_due <= 0)
          break;

        subscription = await stripe.subscriptions.retrieve(
          object.subscription
        );
        // If a payment succeeded we update stored subscription status to "active"
        // in case it was previously "trialing" or "past_due".
        // We skip if amount due is 0 as that's the case at start of trial period.

        var up = {
            subscription_status:"active",
            nMessages:0,
            billing_start:new Date(subscription.current_period_start*1000).toISOString(),
            billing_end:new Date(subscription.current_period_end*1000).toISOString()
          };
        console.log("invoice paid",up);



        await supabase.from("users").update(up).eq('email',custiemail);

        break;


      case "customer.subscription.updated":


        await supabase.from("users").update({"subscription_status":object.status}).eq('email',custiemail);

          //stripePriceId: object.items.data[0].price.id,
          //stripeSubscriptionStatus: object.status,


        // 💡 You could also read "cancel_at_period_end" if you'd like to email user and learn why they cancelled
        // or convince them to renew before their subscription is deleted at end of payment period.
        break;

      case "customer.subscription.deleted":

        await supabase.from("users").update({"subscription_status":"canceled"}).eq('email',custiemail);
        // If a subscription was deleted update stored subscription status to "canceled".
        // Keep in mind this won't be called right away if "Cancel at end of billing period" is selected
        // in Billing Portal settings (https://dashboard.stripe.com/settings/billing/portal). Instead you'll
        // get a "customer.subscription.updated" event with a cancel_at_period_end value.


        break;

      case "customer.subscription.trial_will_end":
        // This event happens 3 days before a trial ends
        // 💡 You could email user letting them know their trial will end or you can have Stripe do that
        // automatically 7 days in advance: https://dashboard.stripe.com/settings/billing/automatic

        break;

      // no default
    }

    // Send success response
    res.send({ status: "success" });
  } catch (error) {
    console.log("stripe webhook error", error);

    // Send error response
    res.status(500).end()
  }
};
