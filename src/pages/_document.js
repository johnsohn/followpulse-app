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
      
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
