
const supabase = require("./_supabase");
import requireAuth from "./_require-auth"


export default requireAuth(async (req,res) => {


  try{

    const { gclid,gads,fbclid } = req.body;

    await supabase.from("users").update({gclid:gclid,gads:gads,fbclid:fbclid}).eq('id',req.user.id);

    res.json({status:'success',data:{}})

  }catch(err){
      res.json({status:'error'});
  }


});
