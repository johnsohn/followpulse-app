const supabase = require("./_supabase");
const crypto = require('crypto');
const hash = s => crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex');

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
  hostname = hostname == 'localhost' ? 'trychatbotappnow.com' : hostname;

  if (!hostname) {
    return res.status(400).json({ message: 'No hostname found' })
  }

  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30) // changed to 30 instead of 7

    const { data: conversions, error } = await supabase
      .from('users')
      .select('gclid, email, createdAt')
      .gte('createdAt', sevenDaysAgo.toISOString())
      .eq('gads', hostname)
      .not('gclid', 'is', null)

    if (error) throw error

    const formattedConversions = conversions.map(conv => ({
      "Email":hash(conv.email),
      "Google Click ID": conv.gclid,
      "Conversion Name": "offlinesignup",
      "Conversion Time": new Date(conv.createdAt).toLocaleString('sv',{ timeZone: 'UTC' }).replace('T', ' ')+"+0000",
      "Conversion Value": 0.1,
      "Conversion Currency": "USD"
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
