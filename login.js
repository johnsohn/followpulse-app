const { createClient } = require("@supabase/supabase-js");

SUPABASE_URL=`https://heqkfymbfhlwwxmlasrt.supabase.co`
SUPABASE_SECRET_KEY=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcWtmeW1iZmhsd3d4bWxhc3J0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzUxMjE4MiwiZXhwIjoyMDQzMDg4MTgyfQ.H3a10gXX_dUzPG0S38DyR5K4efEH-X1M8mc4KcRWp-c`;

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);
async function createAccessToken(email) {
  const { data, error } = await supabase.auth.admin.generateLink({
  type: 'magiclink',
  email: email,
  options:{redirectTo:"http://localhost:3000/"}
  })
  console.log(data,error)
}

//createAccessToken('emreduzgun59@gmail.com')
createAccessToken('ceo@alabnawi.com')
