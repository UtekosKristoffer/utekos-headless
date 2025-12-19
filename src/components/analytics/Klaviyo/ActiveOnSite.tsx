import Script from 'next/script'
export function ActiveOnSite() {
  return (
    <Script
      type='text/javascript'
      async
      strategy='afterInteractive'
      src='https://static.klaviyo.com/onsite/js/UPBWw8/klaviyo.js'
    ></Script>
  )
}
