import Script from 'next/script'

const DEFAULT_MICROSOFT_UET_TAG_ID = '97247724'

export const MICROSOFT_UET_TAG_ID =
  process.env.NEXT_PUBLIC_MICROSOFT_UET_TAG_ID || DEFAULT_MICROSOFT_UET_TAG_ID

export const SHOULD_LOAD_MICROSOFT_UET =
  !!MICROSOFT_UET_TAG_ID && process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview'

type MicrosoftUetTagProps = {
  tagId?: string
}

const MICROSOFT_UET_CONSENT_SYNC_SCRIPT = `
  (function() {
    var hasCompletedInitialConsentSync = false;
    var previousMarketingConsent = false;

    function parseStoredConsent(value) {
      if (!value) return false;
      try {
        var parsed = JSON.parse(value);
        return !!parsed && parsed.marketing === true;
      } catch (error) {
        return false;
      }
    }

    function readCookie(name) {
      var prefix = name + '=';
      var parts = document.cookie ? document.cookie.split('; ') : [];
      for (var index = 0; index < parts.length; index += 1) {
        var part = parts[index];
        if (part.indexOf(prefix) === 0) {
          return decodeURIComponent(part.slice(prefix.length));
        }
      }
      return null;
    }

    function hasMarketingConsent() {
      try {
        if (parseStoredConsent(window.localStorage.getItem('utekos_cookie_consent'))) {
          return true;
        }
      } catch (error) {}

      return parseStoredConsent(readCookie('cookie-consent'));
    }

    function updateMicrosoftUetConsent() {
      var hasConsent = hasMarketingConsent();
      window.uetq = window.uetq || [];
      window.uetq.push('consent', 'update', {
        ad_storage: hasConsent ? 'granted' : 'denied'
      });

      if (
        hasCompletedInitialConsentSync
        && hasConsent
        && !previousMarketingConsent
      ) {
        windowq.push('pageLoad');
      }

      previousMarketingConsent = hasConsent;
      hasCompletedInitialConsentSync = true;
    }

    updateMicrosoftUetConsent();
    window.addEventListener('cookie_consent_saved', updateMicrosoftUetConsent);
    window.addEventListener('storage', function(event) {
      if (event.key === 'utekos_cookie_consent') updateMicrosoftUetConsent();
    });
  })();
`

const MICROSOFT_UET_ENHANCED_CONVERSIONS_SCRIPT = `
  (function() {
    function parseStoredConsent(value) {
      if (!value) return false;
      try {
        var parsed = JSON.parse(value);
        return !!parsed && parsed.marketing === true;
      } catch (error) {
        return false;
      }
    }

    function readCookie(name) {
      var prefix = name + '=';
      var parts = document.cookie ? document.cookie.split('; ') : [];
      for (var index = 0; index < parts.length; index += 1) {
        var part = parts[index];
        if (part.indexOf(prefix) === 0) {
          return decodeURIComponent(part.slice(prefix.length));
        }
      }
      return '';
    }

    function hasMarketingConsent() {
      try {
        if (parseStoredConsent(window.localStorage.getItem('utekos_cookie_consent'))) {
          return true;
        }
      } catch (error) {}

      return parseStoredConsent(readCookie('cookie-consent'));
    }

    function setMicrosoftUetPid() {
      if (!hasMarketingConsent()) return;

      var email = readCookie('ute_user_hash') || readCookie('email_hash');
      var phone = readCookie('ute_phone_hash');
      if (!email && !phone) return;

      window.uetq = window.uetq || [];
      window.uetq.push('set', {
        pid: {
          em: email || '',
          ph: phone || ''
        }
      });
    }

    window.uet_report_conversion = function(productId, revenueValue, currency) {
      window.uetq = window.uetq || [];
      setMicrosoftUetPid();
      window.uetq.push('event', 'PRODUCT_PURCHASE', {
        ecomm_prodid: productId,
        ecomm_pagetype: 'PURCHASE',
        revenue_value: Number(revenueValue) || 0,
        currency: currency || 'NOK'
      });
    };

    setMicrosoftUetPid();
    window.addEventListener('cookie_consent_saved', setMicrosoftUetPid);
    window.addEventListener('storage', function(event) {
      if (event.key === 'utekos_cookie_consent') setMicrosoftUetPid();
    });
  })();
`

function createMicrosoftUetBootstrapScript(tagId: string): string {
  return `
    (function(w,d,t,u,o) {
      w[u] = w[u] || [];
      w[u].push('consent', 'default', { ad_storage: 'denied' });
      o = {
        ti: ${JSON.stringify(tagId)},
        enableAutoSpaTracking: true,
        enableAutoConsent: false
      };
      o.ts = (new Date()).getTime();
      var script = d.createElement(t);
      script.src = 'https://bat.bing.net/bat.js?ti=' + o.ti + (u !== 'uetq' ? '&q=' + u : '');
      script.async = 1;
      script.onload = script.onreadystatechange = function() {
        var state = this.readyState;
        if (!state || state === 'loaded' || state === 'complete') {
          o.q = w[u];
          w[u] = new UET(o);
          w[u].push('pageLoad');
          script.onload = script.onreadystatechange = null;
        }
      };
      var firstScript = d.getElementsByTagName(t)[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    })(window, document, 'script', 'uetq');
  `
}

export function MicrosoftUetTag({ tagId = MICROSOFT_UET_TAG_ID }: MicrosoftUetTagProps) {
  if (!SHOULD_LOAD_MICROSOFT_UET || !tagId) return null

  return (
    <>
      <Script id='microsoft-uet-bootstrap' strategy='afterInteractive'>
        {createMicrosoftUetBootstrapScript(tagId)}
      </Script>
      <Script id='microsoft-uet-enhanced-conversions' strategy='afterInteractive'>
        {MICROSOFT_UET_ENHANCED_CONVERSIONS_SCRIPT}
      </Script>
      <Script id='microsoft-uet-consent-sync' strategy='afterInteractive'>
        {MICROSOFT_UET_CONSENT_SYNC_SCRIPT}
      </Script>
    </>
  )
}
