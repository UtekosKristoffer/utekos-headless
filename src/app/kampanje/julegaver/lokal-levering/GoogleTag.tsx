import Script from 'next/script'

export function GoogleTagLocalDelivery() {
  const scriptLocalDelivery = `gtag('event', 'conversion', { 'send_to': 'AW-17819485818/OGgpCLfd09QbEPqM_7BC', 'value': 1.0, 'currency': 'NOK' });`
  return (
    <>
      <Script
        id='google-tag-local-delivery'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{ __html: scriptLocalDelivery }}
      />
    </>
  )
}
