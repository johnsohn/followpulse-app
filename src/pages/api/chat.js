import { get_encoding } from "tiktoken";
const supabase = require("./_supabase");
import requireAuth from "./_require-auth"
import OpenAI from 'openai';

const encoding = get_encoding("cl100k_base");

const openai = new OpenAI({
  apiKey: `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`,
  baseURL:`https://openrouter.ai/api/v1`
});

import withConcurrencyLimit from "./_ratelimit";

const togetherapi = async ({messages,model,files})=>{

  var data = {
      model: model,
      max_tokens: 2000,
      temperature:0.7,
      messages: messages
  };


  // openrouter setting
  data.transform = ["middle-out"];

  if (files && files.length > 0)
  {
    var l = data.messages.length-1;
    data.messages[l] = {
      role:data.messages[l].role,
      content:[
        {
          text:data.messages[l].content,
          type:'text'
        },
        ...files.map(e=>{return {image_url:e,detail:'low',type:"image_url"}})
      ]
    }
    console.log(data.messages);
  }

  const stream = await openai.chat.completions.create({...data,stream:true});
  return stream;
}


export default (async (req,res) => {

  if (req.method == "OPTIONS")
  {
    res.status(204);
    res.end();
    return;
  }

  requireAuth(withConcurrencyLimit(async (req, res) => {
  try{

    const { id,messages,model,files, websearch } = req.body;


    const userdata = await supabase.from("users").select("*").eq("id",req.user.id).single();

    if (userdata.data.freemessages < 1 && userdata.data.subscription_status != 'active')
    {
      // paywall this bitch
      throw "ERROR:PAYWALL"
    }
    else if (userdata.data.subscription_status != 'active')
    {
      // deduct free msg
      await supabase.from("users").update({freemessages:userdata.data.freemessages-1}).eq("id",req.user.id);
    }
    // verify model here!!!

    var chat_id = id || null;

    // new chat, create a title based on first msg and create the room
    if (!chat_id)
    {

      var title = messages?.[0]?.content || null;
      if (!title)
        title = `Chat #${Math.random().toString(32).substr(2,6)}`
      else {
        try{
        var _t = await openai.chat.completions.create({
          model:"openai/gpt-4o-mini",
          max_tokens:100,
          messages:[{role:'user',content:`Message:"""${title}"""\n\nRespond with a suitable short title without quotes for this message and stop.`}]

        });
        title = _t.choices[0].message.content.replace(/["']/g,'');
        }
        catch(err){
          console.log("Faced error whilst titling",err);
          title = title.substr(0,30)
        }

      }

      var roomcall = await supabase.from("rooms").insert({
        owner:req.user.id,
        title:title,
        model:model
      }).select().single();

      if (roomcall.error || !roomcall.data)
        throw "couldn't create room";

      chat_id = roomcall.data.id;
    }


    var clean_msgs = messages.filter(e => e.role === 'assistant' || e.role === 'user')

    if (clean_msgs.length < 1)
      throw "NO_MESSAGES"


    var llm_model = "openai/gpt-4o-mini";
    switch (model)
    {
      case "chatgpt":
      {
        llm_model = "openai/gpt-4o-mini";
        break;
      }
      case "gpt4":
      {
        llm_model = "openai/gpt-4-turbo";
        break;
      }
      case "gpt4o":
      {
        llm_model = "openai/gpt-4o";
        break;
      }
      case "gemini":
      {
        llm_model = "google/gemini-flash-1.5-8b";
        break;
      }
      case "claude":
      {
        llm_model = "anthropic/claude-3.5-sonnet:beta";
        break;
      }
      case "deepseekv3":
      {
        llm_model = "deepseek/deepseek-chat";
        break;
      }
      default:
        llm_model = "openai/gpt-4o-mini";
    }

    // openrouter functionality!!
    if (websearch)
      llm_model += ":online"
    console.log("model",llm_model)
    //  llm_model = "perplexity/llama-3.1-sonar-small-128k-online";

    const stream = await togetherapi({
      messages:clean_msgs,
      model:llm_model,
      files:files
    })

    if (!stream)
      throw "NO_STREAM"

    res.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'X-Conversation-ID':chat_id
    });

    var newmsg = "";
    for await (const chunk of stream) {
      var delta = chunk.choices[0]?.delta?.content || '';
      newmsg += delta;
      res.write(delta);
    }

    await supabase.from("messages").insert([{
      room:chat_id,
      role:'user',
      content:messages[messages.length-1].content
    },
    {
      room:chat_id,
      role:'assistant',
      content:newmsg
    }]);

    res.end()

  }catch(err){
      res.status(200);
      res.write((typeof err == 'string' && err.startsWith("ERROR:")) ? err : "ERROR:COULDNTGENERATE");
      res.end();
  }
}))(req,res)


});
