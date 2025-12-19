import { cacheLife } from 'next/cache'
export function KlaviyoBaseObject() {
  'use cache'
  cacheLife('max')
  const klaviyoObjectBaseCode = `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new 
    Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var
    n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var 
    t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return 
    e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var
    n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(klaviyoObjectBaseCode).replace(/</g, '\\u003c')
      }}
    />
  )
}
