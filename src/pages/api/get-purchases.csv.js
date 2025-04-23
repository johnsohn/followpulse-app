const supabase = require("./_supabase");
const crypto = require('crypto');
const hash = s => crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex');
const Stripe = require('stripe');


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = [
  'price_1Q6sTnApM3x3Gh9EpT05hnFp',
  'price_1Q6sUHApM3x3Gh9EuR4TbbAO',
  'price_1Q6sUaApM3x3Gh9E4ZTNX3Ec'
];

async function getAllEvents(startingDate) {
  let allEvents = [];
  let hasMore = true;
  let lastEventId = null;

  while (hasMore) {
    const events = await stripe.events.list({
      type: 'checkout.session.completed',
      created: {
        gte: startingDate
      },
      limit: 100,
      starting_after: lastEventId ? lastEventId : undefined
    });

    allEvents = [...allEvents, ...events.data];
    hasMore = events.has_more;

    if (events.data.length > 0) {
      lastEventId = events.data[events.data.length - 1].id;
    } else {
      hasMore = false;
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return allEvents;
}

async function enrichWithSupabaseData(orders) {
  const emails = [...new Set(orders.map(order => order.email))];

  const { data: userData, error } = await supabase
    .from('users')
    .select('email, gclid, gads')
    .in('email', emails);

  if (error) {
    console.error('Supabase query error:', error);
    throw error;
  }

  const userDataMap = userData.reduce((acc, user) => {
    acc[user.email] = user;
    return acc;
  }, {});

  return orders.map(order => ({
    ...order,
    gclid: userDataMap[order.email]?.gclid || null,
    gads: userDataMap[order.email]?.gads || null
  }));
}





function convertToCSV(data) {
  // If no data, return just headers
  if (!data.length) {
    return 'Email,Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\n'
  }

  const headers = Object.keys(data[0]).join(',')
  const rows = data.map(row =>
    Object.values(row)
      .map(value => {
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      })
      .join(',')
  ).join('\n')

  return `${headers}\n${rows}`
}


export default async function handler(
  req,
  res
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Get hostname from request
  var hostname = req.headers.host?.split(':')[0] // remove port if present
  hostname = hostname == 'localhost' ? 'chatsai.app' : hostname;

  if (!hostname) {
    return res.status(400).json({ message: 'No hostname found' })
  }

  try {

    const ninetyDaysAgo = Math.floor(Date.now() / 1000) - (90 * 24 * 60 * 60);

    const allEvents = await getAllEvents(ninetyDaysAgo);

    const orders = (await Promise.all(allEvents.map(async event => {
      try {
        const session = event.data.object;

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const priceId = lineItems.data[0]?.price?.id;

        if (PRICE_IDS.includes(priceId)) {
          return {
            email: session.customer_details.email,
            orderId: session.id,
            amount: session.amount_total / 100,
            currency: session.currency,
            time: new Date(event.created * 1000).toISOString(),
            priceId: priceId
          };
        }
      } catch (error) {
        console.error(`Error processing event ${event.id}:`, error);
        return null;
      }
      return null;
    }))).filter(Boolean);

    orders.sort((a, b) => new Date(b.time) - new Date(a.time));

    const enrichedOrders = await enrichWithSupabaseData(orders);
    /*
    return res.status(200).json({
      orders: enrichedOrders,
      total: enrichedOrders.length,
      timeRange: {
        from: new Date(ninetyDaysAgo * 1000).toISOString(),
        to: new Date().toISOString()
      }
    });
    */
    const formattedConversions = enrichedOrders
    // get orders that originated from this domain
    .filter(e=>e.gads==hostname)
    // remove duplicate orders from same email
    .filter((obj, index, self) =>
      index === self.findIndex(item => item.email === obj.email)
    )
    .map(conv => ({
      "Email":hash(conv.email),
      "Google Click ID": conv.gads == hostname ? conv.gclid : null,
      "Conversion Name": "offlinepurchase",
      "Conversion Time": new Date(conv.time).toLocaleString('sv',{ timeZone: 'UTC' }).replace('T', ' ')+"+0000",
      "Conversion Value": conv.amount,
      "Conversion Currency": conv.currency.toUpperCase(),
      "OrderID":conv.orderId,
      //"Domain":conv.gads
    }))

    const csv = convertToCSV(formattedConversions)


    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=conversions.csv')
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.status(200).send(csv)


  } catch (error) {
    console.error('Error fetching conversions:', error, 'for hostname:', hostname)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
