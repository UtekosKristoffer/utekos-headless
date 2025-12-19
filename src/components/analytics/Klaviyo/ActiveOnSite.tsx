/* eslint-disable quotes */
import Script from 'next/script'
const klaviyoInitCode = `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
`

export function ActiveOnSite() {
  return (
    <Script
      type='text/javascript'
      async
      src='https://static.klaviyo.com/onsite/js/UPBWw8/klaviyo.js'
    ></Script>
  )
}

export function KlaviyoObject() {
  return (
    <>
      <Script type='text/javascript' id='init-klaviyo'>
        {`!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`}
      </Script>
    </>
  )
}

export function KlaviyoIdentify() {
  return (
    <>
      <Script type='text/javascript' id='klaviyo-identify'>
        {`klaviyo.push('identify', { 'email': 'kristoffer@utekos.no' });
        klaviyo.track('Viewed Page', { 'page name': 'Utekos' });`}
      </Script>
    </>
  )
}
