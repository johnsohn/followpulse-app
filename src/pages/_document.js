import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <script dangerouslySetInnerHTML={{ __html: `
        let p=new URLSearchParams(window.location.search);
        ['gclid','gads','fbclid'].forEach(k=>p.get(k)&&localStorage.setItem(k,p.get(k)));
          `}}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          var mypixel = "";
          if (window.location.hostname == "chatsai.app")
          {
          fbq('init', "2000645"+"537084333");
          fbq('track', 'PageView');
          }

            `}}
          />
        <script dangerouslySetInnerHTML={{ __html: `
          var cla = "";
          if (window.location.hostname == "chatsai.app")
            cla = "q0iq9"+"skmos";
          (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", cla);

        `}} />
        <script dangerouslySetInnerHTML={{ __html: `

                  const MIXPANEL_PROXY_DOMAIN = "https://miami.${(!process.env.NODE_ENV || process.env.NODE_ENV == 'development') ? "chatsai.app" : "window.location.host"}";
                  const MIXPANEL_CUSTOM_LIB_URL = MIXPANEL_PROXY_DOMAIN+"/lib.min.js";

                  (function (f, b) { if (!b.__SV) { var e, g, i, h; window.mixpanel = b; b._i = []; b.init = function (e, f, c) { function g(a, d) { var b = d.split("."); 2 == b.length && ((a = a[b[0]]), (d = b[1])); a[d] = function () { a.push([d].concat(Array.prototype.slice.call(arguments, 0))); }; } var a = b; "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel"); a.people = a.people || []; a.toString = function (a) { var d = "mixpanel"; "mixpanel" !== c && (d += "." + c); a || (d += " (stub)"); return d; }; a.people.toString = function () { return a.toString(1) + ".people (stub)"; }; i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split( " "); for (h = 0; h < i.length; h++) g(a, i[h]); var j = "set set_once union unset remove delete".split(" "); a.get_group = function () { function b(c) { d[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); a.push([e, call2]); }; } for ( var d = {}, e = ["get_group"].concat( Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]); return d; }; b._i.push([e, f, c]); }; b.__SV = 1.2; e = f.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === f.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; g = f.getElementsByTagName("script")[0]; g.parentNode.insertBefore(e, g); } })(document, window.mixpanel || []);



                  mixpanel.init("758e629a93a33a6c2350797d7602e98c",{debug:${!process.env.NODE_ENV || process.env.NODE_ENV == 'development'},api_host:MIXPANEL_PROXY_DOMAIN,ignore_dnt: true,persistence: 'localStorage',track_pageview: false,
                  api_routes: {
                     track: 'pueblo/',
                     engage: 'teriyaki/',
                     groups: 'chicken/',
                   }
                  });



                  `}} />
                  <script dangerouslySetInnerHTML={{ __html: `
                    if (new URLSearchParams(window.location.search).get('payment') === 'true') {
                        const orderId = new URLSearchParams(window.location.search).get('session_id');
                        mixpanel.track('Purchase', { $insert_id: orderId, orderId:orderId });
                    }
                    `}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
