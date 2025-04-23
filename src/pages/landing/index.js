import Logo from "@/components/Logo"
import Icon from "@/components/Icon"
import {useEffect,useState} from "react"
import {useRouter} from "next/router"

export async function getServerSideProps({ req }) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const host = req.headers.host || ''

  return {
    props: {
      domain:host,
      brand:host.includes(".") ? host.split(".")[0] : host
    },
  }
}

export default function Home({domain,brand}) {
  const router = useRouter();
  const [stage,setStage] = useState(0);
  const [isLoading,setLoading] = useState(false);
  useEffect(()=>{
    mixpanel.track("classic_funnel",{slide:stage})
  },[])
  const continuebtn = ()=>{

    console.log('continuebtn',stage)
    if (stage == 1)
      router.prefetch("/signup");

    if (stage < 3)
    {
      mixpanel.track("classic_funnel",{slide:stage+1})
      return setStage(e=>e+1);
    }

    setLoading(true);
    router.replace("/signup");

  }

  useEffect(() => {
    if (!router.isReady) return;
    const { gclid,fbclid } = router.query;
    if (gclid) localStorage.setItem('gclid', gclid);
    if (fbclid)
      localStorage.setItem("hardpaywall","true");
  }, [router.isReady, router.query]);

  useEffect(() => {

    var imageUrls = [1,2,3,4].map(e=>`/assets/funnel-screen-${e}.png`);
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
    const preloadLink = document.createElement('link');
    preloadLink.href = '/signup';
    preloadLink.rel = 'preload';
    preloadLink.as = 'document';
    document.head.appendChild(preloadLink);
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-900 flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="md:w-1/2 md:flex md:flex-col md:items-center md:justify-between md:p-12">
        <div className="md:max-w-2xl md:max-h-[80vh] md:flex md:items-center md:justify-center">
          <img
            src={`/assets/funnel-screen-${stage + 1}.png`}
            className="object-contain max-h-72 md:max-h-full w-full"
            style={{maskImage:'linear-gradient(0deg,transparent 0,#000 40%)'}}
          />
        </div>
        <div className="hidden md:block">


          <span className="tracking-tighter text-xs text-white">{brand} is powered by OpenAI's technology but operates as an independent service provider. While we integrate AI models from companies like OpenAI, Google, and Anthropic, we are not affiliated with, endorsed by, or officially connected to these organizations. All trademarks and intellectual property rights belong to their respective owners.</span>

          <div className="flex flex-row gap-1">
          <a href="/terms-of-service" target="_blank" className="underline text-white text-xs">Terms of Service</a>
          <a href="/privacy-policy" target="_blank" className="underline text-white text-xs">Privacy Policy</a>
          </div>



        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow flex flex-col max-w-sm mx-auto p-6 text-center md:w-1/2 md:max-w-none md:bg-white md:justify-center md:p-16 md:relative">
        <div className="md:max-w-md md:mx-auto">
          {stage == 0 && (
            <div className="flex flex-col h-full md:h-auto">
              <h1 className="font-bold text-white md:text-black text-4xl text-center mt-6 mb-6">Get unlimited access to ChatGPT</h1>
              <span className="text-white md:text-black text-xl">Welcome to Chatbot App.</span>
              <span className="text-white md:text-black text-xl">Enjoy unlimited access to GPT-4o.</span>
              <span className="text-white md:text-black text-xl">Ask AI Questions & get instant answers.</span>
            </div>
          )}

          <div className={`${stage != 1 && "hidden"} flex flex-col h-full md:h-auto`}>
            <h1 className="font-bold text-white md:text-black text-4xl text-center mt-6 mb-6">Get Instant Answers</h1>
            <span className="text-zinc-200 md:text-black text-xl">Chatbot App is capable of responding to any of your questions or needs. Just ask.</span>
          </div>

          <div className={`${stage != 2 && "hidden"} flex flex-col h-full md:h-auto`}>
            <h1 className="font-bold text-white md:text-black text-4xl text-center mt-6 mb-6">Power of AI in Your Pocket</h1>
            <span className="text-zinc-200 md:text-black text-xl">Chatbot App seemlessy integrated with Whatsapp, on your fingertips wherever and whenever.</span>
          </div>

          <div className={`${stage != 3 && "hidden"} flex flex-col h-full md:h-auto`}>
            <h1 className="font-bold text-white md:text-black text-4xl text-center mt-6 mb-6">Advanced AI Tools</h1>
            <span className="text-zinc-200 md:text-black text-xl">Advanced AI tools, designed to execute specialized functions, are available. These include Ask PDF, Image Generator, and others.</span>
          </div>

          {/* Continue Button

            <div className="fixed bottom-0 left-0 right-0 p-6 mx-auto max-w-sm md:relative md:w-full md:max-w-none md:mt-12 md:p-0">

             */}
          <div className="p-6 mx-auto max-w-sm md:relative md:w-full md:max-w-none md:mt-12 md:p-0">
            <button onClick={continuebtn} disabled={isLoading} className="disabled:bg-zinc-400 inline-flex items-center justify-center relative w-full max-w-sm md:max-w-none py-4 px-6 bg-black shadow-lg rounded-lg text-2xl text-white">
              {isLoading ? (<Icon name="LoaderCircle" className="animate-spin" size="35"/>) : (<><span className="font-semibold">Continue</span><Icon name="ArrowRight" className="absolute right-4 animate-point-right size-8" /></>)}
            </button>

            <div className="mt-4">
            <span className="tracking-tighter text-xs text-white">{brand} is powered by OpenAI's technology but operates as an independent service provider. While we integrate AI models from companies like OpenAI, Google, and Anthropic, we are not affiliated with, endorsed by, or officially connected to these organizations. All trademarks and intellectual property rights belong to their respective owners.</span>
            <div className="flex flex-row gap-1 justify-center">
            <a href="/terms-of-service" target="_blank" className="underline text-white text-xs">Terms of Service</a>
            <a href="/privacy-policy" target="_blank" className="underline text-white text-xs">Privacy Policy</a>
            </div>
            </div>

          </div>
        </div>


        {/* OpenAI Logo */}
        <div className="hidden md:flex md:flex-row md:items-center md:justify-between md:absolute md:bottom-6 md:right-6">




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
