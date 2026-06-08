import Script from 'next/script'
import {
  USERCENTRICS_RULESET_ID,
  USERCENTRICS_SGTM_ORIGIN
} from './usercentricsConfig'

const GOOGLE_CONSENT_DEFAULT_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
  window.gtag('consent', 'default', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  });
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('set', 'url_passthrough', false);
`

export function UsercentricsScript() {
  return (
    <>
      {/* Next.js injects beforeInteractive scripts from the root layout into <head>. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id='google-consent-default' strategy='beforeInteractive'>
        {GOOGLE_CONSENT_DEFAULT_SCRIPT}
      </Script>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        id='usercentrics-consent-signals'
        src={`${USERCENTRICS_SGTM_ORIGIN}/uc-consent-signals.js`}
        strategy='beforeInteractive'
      />
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        id='usercentrics-cmp'
        src='https://web.cmp.usercentrics.eu/ui/loader.js'
        strategy='beforeInteractive'
        data-ruleset-id={USERCENTRICS_RULESET_ID}
      />
    </>
  )
}
