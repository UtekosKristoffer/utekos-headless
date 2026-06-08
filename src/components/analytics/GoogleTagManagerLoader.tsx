'use client'

import Script from 'next/script'

type GoogleTagManagerLoaderProps = {
  gtmId: string
  scriptUrl: string
}

function createGoogleTagManagerBootstrapScript(scriptUrl: string): string {
  return `
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    (function(w,d,s,l,u){
      var first=d.getElementsByTagName(s)[0];
      var script=d.createElement(s);
      var dl=l!='dataLayer'?'&l='+l:'';
      script.async=true;
      script.src=u+dl;
      first.parentNode.insertBefore(script,first);
    })(window,document,'script','dataLayer',${JSON.stringify(scriptUrl)});
  `
}

export function GoogleTagManagerLoader({ gtmId, scriptUrl }: GoogleTagManagerLoaderProps) {
  return (
    <Script id={`gtm-loader-${gtmId}`} strategy='afterInteractive'>
      {createGoogleTagManagerBootstrapScript(scriptUrl)}
    </Script>
  )
}
