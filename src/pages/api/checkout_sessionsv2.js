const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: '2022-11-15; custom_checkout_beta=v1;',
  }
);

const prices = {
  '1month':'price_1Q6sTnApM3x3Gh9EpT05hnFp',
  '3months':'price_1Q6sUHApM3x3Gh9EuR4TbbAO',
  '12months':'price_1Q6sUaApM3x3Gh9E4ZTNX3Ec'
}

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'custom',
          customer_email: req?.query?.email || undefined,
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of
              // the product you want to sell
              price: prices?.[req?.query?.plan] || prices['3months'],
              quantity: 1,
            },
          ],
          mode: 'subscription',
          return_url:`${req.headers.origin}/?payment=true&session_id={CHECKOUT_SESSION_ID}`,
          metadata: {
            user_agent: (req.headers?.['user-agent'] || ''),
            ip_address:(req.headers?.['cf-connecting-ip'] || req.headers?.['x-real-ip'] || req.headers?.['x-forwarded-for']?.split(',')[0] || ''),
          }

        });

        res.send({clientSecret: session.client_secret});
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    case "GET":
      try {
        const session =
          await stripe.checkout.sessions.retrieve(req.query.session_id);

        res.send({
          status: session.status,
          customer_email: session.customer_details.email
        });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    default:
      res.setHeader('Allow', req.method);
      res.status(405).end('Method Not Allowed');
  }
}
