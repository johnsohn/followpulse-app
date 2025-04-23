
const supabase = require("./_supabase");
import requireAuth from "./_require-auth"

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
const input = {};


import withConcurrencyLimit from "./_ratelimit";


export default requireAuth(withConcurrencyLimit(async (req,res) => {

  if (req.method == "OPTIONS")
  {
    res.status(204);
    res.end();
    return;
  }

  requireAuth(async (req, res) => {
  try{

    const { prompt } = req.body;

    // verify model here!!!

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: prompt,
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 0,
          negative_prompt: "worst quality, low quality",
          num_inference_steps: 4
        }
      }
    );

    res.json({status:'success',data:output});

  }catch(err){
      console.log("image gen error",err)
      res.json({status:'error'});
  }
})(req,res)


}));
