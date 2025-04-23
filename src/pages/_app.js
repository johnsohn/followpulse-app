import "@/styles/globals.css";
import {AuthProvider,useAuth} from "../lib/auth"
import { QueryClientProvider } from "../lib/db";
import { Inter } from 'next/font/google'
import {useEffect} from "react"
import {apiRequest} from "../lib/apireq"
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
import { usePathname, useSearchParams } from "next/navigation";

// Create a wrapper component that uses the auth context
function AuthWrapper({ children }) {
  const auth = useAuth();

  useEffect(() => {
    console.log("user change")
    if (!!!auth.user) return;

    if (typeof window !== "undefined" && window?.localStorage) {
      var gclid = new URLSearchParams(window.location.search).get('gclid') || window.localStorage.getItem("gclid");
      var gads = new URLSearchParams(window.location.search).get('gads') || window.localStorage.getItem("gads") || window.location.host;
      var fbclid = new URLSearchParams(window.location.search).get('fbclid') || window.localStorage.getItem("fbclid");
      if (gclid && !auth.user.gclid) {
        apiRequest("update-user", "POST", {gclid: gclid, gads: gads});
        fbq('track', 'CompleteRegistration');
      }
      else if (fbclid && !auth.user.fbclid)
      {
        apiRequest("update-user", "POST", {fbclid:fbclid});
        fbq('track', 'CompleteRegistration');
      }
    }
  }, [auth.user]);

  return children;
}





export default function App({ Component, pageProps }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {

    const paramsObject = {};
    searchParams.forEach((value, key) => {
      paramsObject[key] = value;
    });
    mixpanel.track("page_view",{
      path: pathname,
      query: paramsObject,
      host: window.location.origin,
    });

    //fbq('track', 'PageView');
    //analyticsInstance.page();
  }, [pathname, searchParams]);

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: `
          html{
            font-family: ${inter.style.fontFamily};
           font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
          }
        `}} />
    <QueryClientProvider>
    <AuthProvider>
    <AuthWrapper>
    <Component {...pageProps} />
    </AuthWrapper>
    </AuthProvider>
    </QueryClientProvider>
    </>
  );
}
