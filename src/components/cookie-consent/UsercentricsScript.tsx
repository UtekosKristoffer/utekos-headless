import { USERCENTRICS_SETTINGS_ID } from './usercentricsConfig'

export const GOOGLE_CONSENT_DEFAULT_SCRIPT = `
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

export function GoogleConsentDefaultScript() {
  return (
    <script id='google-consent-default' dangerouslySetInnerHTML={{ __html: GOOGLE_CONSENT_DEFAULT_SCRIPT }} />
  )
}

export function UsercentricsCmpScript() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src='https://web.cmp.usercentrics.eu/modules/autoblocker.js'></script>
      <script
        id='usercentrics-cmp'
        src='https://web.cmp.usercentrics.eu/ui/loader.js'
        data-settings-id={USERCENTRICS_SETTINGS_ID}
        async
      />
    </>
  )
}

export function UsercentricsScript() {
  return (
    <>
      <GoogleConsentDefaultScript />
      <UsercentricsCmpScript />
    </>
  )
}
