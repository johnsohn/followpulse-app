import Logo from "@/components/Logo"
import Icon from "@/components/Icon"
import {useEffect,useState,useCallback,useRef} from "react"
import {useRouter} from "next/router"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReviewSection from "@/components/ReviewSection"


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import {useAuth} from "@/lib/auth";
const reviews = [
  {
    name:"Sara",
    role:"Product Manager",
    headline:"Exactly what I needed",
    body:"Having Claude, Gemini, and ChatGPT in one place has streamlined our whole AI workflow. No more tab switching. It's exactly what our team needed!"
  },
  {
    name:"Will",
    role:"UX Writer",
    headline:"Find of the year",
    body:"It has simplified my content creation process with its amazing chat and image generation. Plus it offers all the industry standard AI models in one place. That’s totally amazing!"
  },
  {
    name:"James",
    role:"Marketer",
    headline:"Best AI Assistant",
    body:"This has been a lifesaver for my content needs. The AI creates amazing visuals and marketing copy that actually sounds human - it's cut my work time in half."
  },
]

export default function Home() {
  const getredirect = ()=>{
    var appendix = "";
    var gclid = router?.query?.gclid || localStorage.getItem("gclid")
    if (gclid)
      appendix = "?gclid="+encodeURIComponent(gclid)+"&gads="+encodeURIComponent(window.location.hostname);

    var x = window.location.host;
    //x = x.startsWith("localhost") ? "chatbotaiapp.com" : x;
    var y = window.location.protocol+"//"+x+"/landing/plan"+appendix
    console.log("REDIRECT",y);
    return y;
  };
  const [isEmailLoading,setEmailLoading] = useState(false);
  const [emailSent,setEmailSent] = useState(false);
  const emailLogin = ()=>{
    try{
    setEmailSent(false);
    if (!email)
      return;
    auth.signinWithMagicLink(email,getredirect());
    setEmailLoading(true);
    setTimeout(()=>{setEmailSent(true);setEmailLoading(false);},5000);
    }catch(err){}
  }
  const auth = useAuth();

  useEffect(()=>{
    if (!!auth.user)
      router.replace("/chat");
  },[auth])

  const [selectedPlan, setSelectedPlan] = useState("3months")
  const [stage,setStage] = useState('email');
  const [email,setEmail] = useState(null);
  const emailRef = useRef(0);
  const [signupflex,setSignupflex] = useState(null);

  // A/B test the left side of the signup to see if i can boost signup CR%
  useEffect(()=>{
    var sf = ["reviewshower","modern"][Math.floor(Math.random()*2)]
    setSignupflex(sf);
    mixpanel.track('$experiment_started', {'Experiment name': 'signupflex', 'Variant name': sf})
  },[])

  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-white md:bg-zinc-900 flex flex-col md:flex-row">
      {/* Image Section */}


        <div className="hidden md:w-1/2 md:flex md:flex-col md:items-center md:justify-center px-6">

        {signupflex == "modern" && (<>

        <div className="flex flex-row items-center justify-center gap-6 mb-6 text-white">
        <img src="/laurel_l.svg" style={{filter:"invert(100%)",opacity:'50%'}}/>

        <div className="flex flex-col items-center justify-center">

        <span className="font-semibold text-2xl">#1</span>
        <span className="text-lg font-semibold">AI Assistant</span>

        <div className="flex flex-row gap-1">
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        </div>

        <span className="font-bold text-4xl">30M+ users</span>
        <span className="text-md">100K+ ratings</span>
        </div>

        <img src="/laurel_r.svg" style={{filter:"invert(100%)",opacity:'50%'}}/>

        </div>

        <span className="text-white font-semibold text-3xl text-center mb-3">Available on</span>
        <div className="flex items-center justify-center gap-6">

        {["chrome","safari","opera","firefox","edge"].map((e,i)=>{
          return (
            <img src={`/logos/browsers/${e}.svg`} className="rounded-lg p-2 bg-zinc-800"/>
          )
        })}

        </div>

        <span className="text-white font-semibold text-3xl text-center my-6">Trusted by Millions</span>
        <div className="flex flex-row overflow-x-hidden gap-2 w-full max-w-md lg:max-w-4xl rounded-lg max-h-[300px] w-full">
        <div className="slide-right flex flex-row gap-2">
        {[...reviews,...reviews].map((e,i)=>{
          return (
        <div key={i} className="bg-zinc-800 rounded-lg p-2 flex flex-col min-w-[250px]">
        <span className="font-semibold mb-1 text-white">{e.headline}</span>
        <div className="flex flex-row gap-1 mb-1">
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        <Icon name="Star" className="text-yellow-500 fill-yellow-500"/>
        </div>
        <span className="text-sm text-zinc-200">{e.body}</span>

        <div className="mt-auto"><span className="font-semibold text-sm text-zinc-100">{e.name}</span><span className="text-zinc-300 text-sm"> - {e.role}</span></div>

        </div>
        )})}
        </div>

        </div>
        </>)}
          {signupflex == "reviewshower" && (<>
          <ReviewSection />
          <div className="flex flex-col items-center justify-center mt-2">
          <span className="text-white font-semibold text-3xl text-center mb-3">Available on</span>
          <div className="flex items-center justify-center gap-6">

          {["chrome","safari","opera","firefox","edge"].map((e,i)=>{
            return (
              <img src={`/logos/browsers/${e}.svg`} className="bg-zinc-800 rounded-lg p-2"/>
            )
          })}

          </div>
          </div>
          </>)}
        </div>





      <div className="flex-grow flex flex-col max-w-sm mx-auto px-2 md:p-6 text-center md:w-1/2 md:max-w-none md:bg-white md:justify-center md:p-16 md:relative">
        {/*<button onClick={()=>router.push("https://chat.chatbotaiapp.com")} className="fixed right-4 top-4 font-semibold text-xl underline decoration-zinc-300">Skip</button>*/}
        <div className="md:hidden w-full mb-6 mt-2 flex flex-col items-center">
          <div className="flex flex-row gap-1 items-center justify-center text-zinc-800">
          <span className="font-bold text-5xl">35M+</span>
          <div className="flex flex-col">
          <span className="font-bold text-2xl">HAPPY</span>
          <span className="font-bold text-2xl">USERS</span>
          </div>

          </div>
          <div className="flex flex-row">
          <Icon name="Star" className="text-yellow-300" fill="#fde047" />
          <Icon name="Star" className="text-yellow-300" fill="#fde047" />
          <Icon name="Star" className="text-yellow-300" fill="#fde047" />
          <Icon name="Star" className="text-yellow-300" fill="#fde047" />
          <Icon name="Star" className="text-yellow-300" fill="#fde047" />
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-center md:mx-auto">

        <div className="w-full max-w-lg bg-white md:p-6 rounded-r-lg">

          <div className="flex flex-row justify-center items-center">
          <img src="/logo.png"  width="50" className="bg-black rounded-xl p-2" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Join millions of Happy Users
          </h2>
          <p className="text-gray-600 mb-6">
            Rest assured, your data remains secure, and you will not be subjected to any spam!
          </p>



          <button onClick={(e)=>{e.preventDefault();auth.signinWithProvider("google",getredirect())}} className="py-4 px-4 bg-gray-100 w-full rounded-lg font-semibold flex flex-row items-center justify-center hover:bg-gray-200">
          <svg className="mr-2 h-6 w-6" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Continue with Google</button>

          <div className="flex flex-row items-center gap-4 my-2">
          <div className="h-[1px] bg-zinc-300 w-full rounded-full" />
          <span className="text-zinc-600">OR</span>
          <div className="h-[1px] bg-zinc-300 w-full rounded-full" />
          </div>

          <span className="font-semibold"></span>
          <form onSubmit={(e)=>{e.preventDefault();emailLogin();}}>
          <div className="flex flex-row items-center bg-gray-100 rounded-lg py-4 px-4 gap-2 mt-2">



          <label for="email" className="inline-flex items-center gap-1 font-semibold"><Icon name="Mail" />Email</label>
          <input id="email" required type="email" onChange={(e)=>{setEmail(e.target.value)}} className="bg-transparent w-full h-full focus:outline-none" placeholder="your@email.com"/>
          </div>

          {emailSent && (<span className="text-green-600 text-sm">We have sent a login link to your e-mail. Please check your inbox to continue.</span>)}
          <button disabled={isEmailLoading || !email || email.length < 1} type="submit" className="disabled:bg-gray-100 disabled:text-zinc-500 rounded-lg w-full py-3 px-4 mt-2 bg-green-500 text-white hover:bg-green-600 font-semibold transition-colors">
            {isEmailLoading ? (<Icon name="LoaderCircle" className="animate-spin" />) : "Continue with Email"}
          </button>

          <span className="text-xs">By signing in, you agree to our <a className="underline" href="/terms-of-service" target="_blank">Terms of Service</a> and <a className="underline" href="/privacy-policy" target="_blank">Privacy Policy</a>.</span>

          </form>




        </div>

        </div>


        {/* OpenAI Logo */}
        <div className="hidden md:static md:transform-none md:translate-x-0 md:left-auto md:block md:absolute md:bottom-6 md:right-6">
          <img
            src="/assets/powered-by-openai.svg"
            alt="Powered by OpenAI"
            className="h-12"
          />
        </div>
      </div>




    </div>
  );
}



const QuickIframe = ({ children, url }) => {
  const title = children;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="underline hover:cursor-pointer">
        {children}
        </span>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4" style={{ height: '80vh' }}>
          <iframe
            src={url}
            title={title}
            width="100%"
            height="100%"
            style={{
              border: 'none',
              borderRadius: '4px',
            }}
          />
        </div>
        <DialogClose asChild>
          <Button variant="default" className="w-full">Close this pop-up</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
