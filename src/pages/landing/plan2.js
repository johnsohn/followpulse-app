import Logo from "@/components/Logo"
import Icon from "@/components/Icon"
import {useEffect,useState,useCallback} from "react"
import {useRouter} from "next/router"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
  Elements
} from '@stripe/react-stripe-js';

import CheckoutForm from "@/components/CheckoutForm";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import {useAuth} from "@/lib/auth"

export default function Home() {

  const [selectedPlan, setSelectedPlan] = useState("12months")
  const [stage,setStage] = useState('selectplan');
  const [isSkippable,setSkippable] = useState(true);
  const auth = useAuth();

  useEffect(()=>{
    mixpanel.track("paywall",{type:'page'});
  },[])

  useEffect(()=>{
    if (typeof window !== "undefined" && window?.localStorage?.hardpaywall)
      setSkippable(false);
    // if the user has a sub, he's not going to this page.
    if (!!auth.user && auth.user.subscription_status == "active")
      router.replace("/chat");
  },[auth.user])

  useEffect(()=>{
    if (typeof window !== "undefined" && window?.localStorage?.hardpaywall)
      setSkippable(false);

    var mycid = setInterval(()=>{
      if (typeof window !== "undefined" && window?.localStorage?.hardpaywall)
        setSkippable(false);
      if (isSkippable)
        clearInterval(mycid)
    },100);

    return ()=>{clearInterval(mycid)}
  },[])

  /*

  <!-- Event snippet for purchase conversion page -->
  <script>
    gtag('event', 'conversion', {
        'send_to': 'AW-16744115885/Y4eGCLn1vN4ZEK3dm7A-',
        'value': 1.0,
        'currency': 'USD',
        'transaction_id': ''
    });
  </script>
  <!-- Event snippet for add_to_cart conversion page -->
  <script>
    gtag('event', 'conversion', {'send_to': 'AW-16744115885/zKTaCMOTtd4ZEK3dm7A-'});
  </script>

*/
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(`/api/checkout_sessions?plan=${encodeURIComponent(selectedPlan)}${auth.user.email ? "&email="+encodeURIComponent(auth.user.email) : ""}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [selectedPlan,auth]);

  const stripe_options = {fetchClientSecret};

  const [didCart,setCart] = useState(false);

  useEffect(()=>{
    if (didCart)
      return;
    if (stage === "pay")
    {
      setCart(true);
      //gtag('event', 'conversion', {'send_to': 'AW-16744115885/zKTaCMOTtd4ZEK3dm7A-'});
    }
  },[stage])

  const router = useRouter();

  const plans = [
    { id: "1month", name: "1 Month", price: "$19.99", perDay: "$0.67" },
    {
      id: "3months",
      name: "3 Months",
      price: "$39.99",
      perDay: "$0.44",
      popular: true,
      save: "33%"
    },
    {
      id: "12months",
      name: "12 Months",
      price: "$59.99",
      perDay: "$0.16",
      save: "75%"
    }
  ]

  const features = [
    { name: "Access to ChatGPT", description: "Chat with ChatGPT", free: true, icon:"Brain"},
    {
      name: "Access to GPT-4o",
      description: "More accurate and detailed answers",
      free: false,
      img:"/logos/openai.svg",
    },
    {
      name: "Access to Google Gemini",
      description: "Google's latest AI model",
      free: false,
      img:"/logos/gemini.svg",
    },
    {
      name: "Access to Claude Sonnet",
      description: "Anthropic's most popular AI model",
      free: false,
      img:"/logos/claude-ai-square-1.webp",
    },
    {
      name: "Unlock Advanced Tools",
      description:
        "Access advanced AI tools such as Image Generator and Ask PDF",
      free: false,
      icon:"Pickaxe"
    },
    {
      name: "No Limits",
      description: "Unlimited dialogues with all AI models",
      free: false,
      icon:"Infinity"
    },
    {
      name: "Chat in WhatsApp",
      description: "Use Chatbot App within WhatsApp",
      free: false,
      comingSoon: true,
      img:"/logos/whatsapp.svg",
    }
  ]

  return (
    <div className="w-full min-h-screen bg-white md:bg-zinc-900 flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="hidden md:w-1/2 md:flex md:items-center md:justify-center">
        <FeatureList features={features} />
      </div>

      {stage == "pay" && (
      <div className="flex flex-col max-w-sm mx-auto p-0 text-center md:w-1/2 md:max-w-none md:bg-white md:justify-center md:p-0 md:relative">
      <button onClick={()=>setStage('selectplan')} className="inline-flex items-center mx-auto underline"><Icon name="ArrowLeft" size="14" /> Go back</button>


      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={stripe_options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>

      </div>

      )}

      {/* Content Section */}
      {stage == 'selectplan' && (
      <div className="flex-grow flex flex-col max-w-sm mx-auto p-6 text-center md:w-1/2 md:max-w-none md:bg-white md:justify-center md:p-16 md:relative">
        {isSkippable && (<button onClick={()=>router.push("/chat")} className="fixed right-4 top-4 font-semibold text-xl underline decoration-zinc-300">Skip</button>)}
        <div className="md:flex md:items-center md:justify-center md:mx-auto">

        <div className="w-full max-w-lg bg-white p-6 rounded-r-lg">

          <h2 className="text-3xl font-bold mb-2">
            Upgrade to Chatbot Pro
          </h2>
          <p className="text-gray-600 mb-6">
            Unlock the full potential of Chatbot App
          </p>


          <RadioGroup
            value={selectedPlan}
            onValueChange={setSelectedPlan}
            className="space-y-2"
          >
            {plans.map(plan => (
              <div key={plan.id} className="cursor-pointer" onClick={()=>setSelectedPlan(plan.id)}>
                {plan.popular && (
                  <div className="text-center bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-t-lg w-full">
                    MOST POPULAR
                  </div>
                )}
                <div
                  className={`flex items-center justify-between p-4 rounded-lg border  ${
                    plan.popular ? "rounded-t-none" : ""
                  } ${
                    selectedPlan === plan.id
                      ? "bg-green-100 border-green-500"
                      : "bg-gray-100"
                  }`}
                >
                  <RadioGroupItem
                    value={plan.id}
                    id={plan.id}
                    className="sr-only"

                  />
                  <Label
                    htmlFor={plan.id}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        selectedPlan === plan.id
                          ? "bg-white border-green-500 border-[5px]"
                          : "border-gray-400"
                      }`}
                    />
                    <div>
                      <div className="font-semibold text-xl">{plan.name}</div>
                      <div className="text-sm text-zinc-500 hidden">{plan.price}</div>
                    </div>
                  </Label>
                  <div className="text-right">
                    <div className="flex flex-row gap-1 items-center">
                    <div className="text-xl md:text-3xl lg:text-4xl font-bold">{plan.perDay}</div>
                    <div className="text-sm">Per Day</div>
                    </div>
                    {plan.save && (
                      <div className="text-xs text-red-500">
                        Save {plan.save}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>

          {/*
          <Button onClick={()=>{setStage('pay')}} className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 w-full mt-6 bg-green-500 py-8 text-xl text-white hover:bg-green-800">
            Continue
          </Button>
          */}

          <Button onClick={()=>{mixpanel.track("add_to_cart",{source:window.location.pathname,plan:selectedPlan});setStage('pay')}} className={`mt-2 font-semibold text-2xl relative overflow-hidden bg-green-500 text-white px-6 py-6 rounded-md w-full hover:bg-green-700 transition-colors duration-200 before:content-[''] before:absolute before:top-0 before:left-0  before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent  before:-translate-x-full before:animate-shine`}>
           Continue
          </Button>





          <p className="text-xs text-center mt-4 text-gray-500">
            Without cancellation, I accept that Chatbot AI App will automatically charge {plans.find(e=>e.id==selectedPlan).price} USD every {plans.find(e=>e.id==selectedPlan).name} until I cancel. Cancel anytime.
            By proceeding with the purchase of a plan, you agree to our <QuickIframe url="/terms-of-service">Terms
            of Service</QuickIframe>, <QuickIframe url="/privacy-policy">Privacy Policy</QuickIframe> and <QuickIframe url="/refund-policy">Refund & Cancellation Policy</QuickIframe>.
          </p>
          <div className="flex justify-center items-center mt-4 text-green-500">
            <CheckIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">Pay safe & secure</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <PaymentIcon src="/logos/paypal-5c19df2a.svg" alt="PayPal" />
            <PaymentIcon src="/logos/apple-pay-5df72b2d.svg" alt="Apple Pay" />
            <PaymentIcon src="/logos/google-pay-1d8062b9.svg" alt="Google Pay" />
            <PaymentIcon src="/logos/visa-0075bb30.svg" alt="Visa" />
            <PaymentIcon src="/logos/mastercard-7a0dfc50.svg" alt="Mastercard" />
            <PaymentIcon src="/logos/discover-a84729c1.svg" alt="Discover" />
            <PaymentIcon src="/logos/amex-3988bb61.svg" alt="American Express" />
            <PaymentIcon src="/logos/maestro-4a390b7c.svg" alt="Maestro" />
          </div>

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
      )}




    </div>
  );
}


function FeatureList({ features }) {
  return (
    <div className="space-y-4 text-white">
      <div
        className="grid grid-cols-[1fr_auto_auto] gap-12 items-center border-b border-zinc-500"
      >
        <div>
          <h3 className="font-medium"></h3>
          <p className="text-sm text-gray-400"></p>
        </div>
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xl font-bold">
          Free
        </div>
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xl font-bold">
          Pro
        </div>
      </div>
      {features.map((feature, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_auto_auto] gap-12 items-center"
        >
          <div>
            <div className="flex flex-row items-center gap-1">
            {feature.img && (<img src={feature.img} width="22" className="text-white"/>)}
            {feature.icon && (<Icon name={feature.icon} width="22" className="text-white"/>)}
            <h3 className="font-semibold">{feature.name}</h3>
            </div>
            <p className="text-lg text-gray-400">{feature.description}</p>
            {feature.comingSoon && (
              <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mt-1">
                Coming Soon
              </span>
            )}
          </div>
          <div className={`flex-shrink-0 w-7 h-7 rounded-full ${feature.free ? "bg-green-500" : "bg-zinc-600"} flex items-center justify-center`}>
            {feature.free ? (
              <CheckIcon className="w-6 h-6 text-zinc-900" />
            ) : (
              <XIcon className="w-6 h-6 text-zinc-900" />
            )}
          </div>
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
            <CheckIcon className="w-6 h-6 text-zinc-900" />
          </div>
        </div>
      ))}
    </div>
  )
}


function PaymentIcon({ src, alt }) {
  return <img src={src} alt={alt} className="h-8" />
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
