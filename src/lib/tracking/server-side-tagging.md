# Utekos server-side tagging

## Valgt arkitektur

- Usercentrics CMP v3 med settings ID `9suQr3rGddL3Tb` er eneste samtykkeplattform.
- Usercentrics Server-Side Tracking hoster sGTM-containeren.
- `cloud.server.utekos.no` er førsteparts-endepunktet.
- Supabase event ledger er autoritativt revisjons- og retry-lag.
- Meta Pixel og direkte Meta CAPI er de eneste Meta-kanalene.
- Meta Signals Gateway og Cloud Run brukes ikke.

## Verifiserte endepunkter (2026-06-11)

| Endepunkt                                                                   | Forventet     | Status |
| --------------------------------------------------------------------------- | ------------- | ------ |
| `https://cloud.server.utekos.no/healthz`                                    | `ok`          | 200    |
| `https://cloud.server.utekos.no/uc-consent-signals.js`                      | script        | 200    |
| `https://cloud.server.utekos.no/gtm.js?id=GTM-5TWMJQFP`                     | script        | 200    |
| `https://cloud.server.utekos.no/u2/f-5mpq2htvp2n7gt?xci2k=R1RNLTVUV01KUUZQ` | resilient GTM | 200    |
| `https://cloud.server.utekos.no/ns.html?id=GTM-5TWMJQFP`                    | iframe        | 200    |

## Samtykkeflyt

`<head>`-rekkefølge i [`UsercentricsScript.tsx`](../../components/cookie-consent/UsercentricsScript.tsx) og
[`layout.tsx`](../../app/layout.tsx):

1. Google Consent Mode defaults (`denied` fail-closed)
2. `https://cloud.server.utekos.no/uc-consent-signals.js` (sync, **før** CMP)
3. `autoblocker.js` (sync)
4. `loader.js` (async, `data-settings-id`)
5. GTM via [`GoogleTagManagerScript.tsx`](../../components/analytics/GoogleTagManagerScript.tsx) — lastes
   tidlig; Consent Mode styrer tag-firing, ikke script-montering

Nettleseren bruker `ucEvent`; serverrutene leser `ucConsentAllowedDps` fra requesten.

Google Consent Mode v2 oppdateres via
[`UsercentricsConsentProvider.tsx`](../../components/cookie-consent/UsercentricsConsentProvider.tsx) på
`ucEvent`.

Provider-dispatch opprettes bare når eventet har nødvendig DPS-samtykke:

- `Google Analytics` for dataLayer/sGTM (browser).
- `Meta Pixel` for Meta Pixel og direkte Meta CAPI.
- `Microsoft Advertising` for UET.

Shopify-webhooks lagres alltid i ledgeret, men sendes ikke til annonseplattformer uten dokumenterbart
samtykke.

## Vercel-miljøvariabler

```text
NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID=9suQr3rGddL3Tb
NEXT_PUBLIC_USERCENTRICS_SGTM_ORIGIN=https://cloud.server.utekos.no
NEXT_PUBLIC_USERCENTRICS_CONSENT_EVENT_NAME=ucEvent
NEXT_PUBLIC_USERCENTRICS_GOOGLE_ANALYTICS_SERVICE_NAME=<exact DPS name from Admin>
NEXT_PUBLIC_USERCENTRICS_GOOGLE_ADS_SERVICE_NAME=Google Ads
NEXT_PUBLIC_USERCENTRICS_META_SERVICE_NAME=Meta Pixel
NEXT_PUBLIC_USERCENTRICS_MICROSOFT_SERVICE_NAME=Microsoft Advertising
NEXT_PUBLIC_USERCENTRICS_POSTHOG_SERVICE_NAME=PostHog
NEXT_PUBLIC_USERCENTRICS_VERCEL_ANALYTICS_SERVICE_NAME=Vercel Analytics
NEXT_PUBLIC_USERCENTRICS_CHATBASE_SERVICE_NAME=Chatbase
NEXT_PUBLIC_USERCENTRICS_KLARNA_OSM_SERVICE_NAME=Klarna On-site Messaging
NEXT_PUBLIC_GOOGLE_GTM_ID=GTM-5TWMJQFP
NEXT_PUBLIC_GTM_RESILIENT_SCRIPT_URL=<optional override; default is Usercentrics Resilient Script Loader URL in code>
NEXT_PUBLIC_GTM_RESILIENT_NOSCRIPT_URL=<optional; default ns.html?id=GTM-5TWMJQFP>
NEXT_PUBLIC_ENABLE_GTM_IN_DEV=1
GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm
```

Standard GTM-script er Usercentrics Resilient Script Loader (`…/u2/f-5mpq2htvp2n7gt?xci2k=R1RNLTVUV01KUUZQ`).
Sett `NEXT_PUBLIC_GTM_RESILIENT_SCRIPT_URL` kun ved regenerering i Admin. Fallback uten resilient URL:
`https://cloud.server.utekos.no/gtm.js?id=GTM-5TWMJQFP`.

Aktiver `GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm` først etter vellykket GTM Web + sGTM Preview på `utekos.no`.

Lokal smoke: sett `NEXT_PUBLIC_ENABLE_GTM_IN_DEV=1` (ikke i produksjon uten behov).

## Manuell ekstern konfigurasjon (GTM + Usercentrics Admin)

### Usercentrics Admin

- [ ] Publiser ruleset/settings `9suQr3rGddL3Tb` (403 må bort)
- [ ] Verifiser `utekos.no` i Domain Management
- [ ] Kjør DPS-scan; klassifiser PostHog, Chatbase, Klarna OSM, GTM, GA, Google Ads, Meta, Microsoft
- [ ] Synkroniser DPS-navn med `NEXT_PUBLIC_USERCENTRICS_*_SERVICE_NAME`
- [x] Aktiver Resilient Script Loader (URL i `googleTagManagerConfig.ts`; env override valgfri)

### GTM Server container

- [ ] Installer Usercentrics Cookiebot consent signals client
- [ ] Velg Usercentrics Web CMP + cookie/event transport
- [ ] GA4 Web Client, GTM Web Container Client (`GTM-5TWMJQFP`)
- [ ] GA4-tag, Conversion Linker, Google Ads, Microsoft Ads med consent exception-triggere
- [ ] Preview domain = `https://cloud.server.utekos.no`
- [ ] Publiser

### GTM Web container `GTM-5TWMJQFP`

- [ ] Google Tag med Measurement ID
- [ ] `server_container_url` = `https://cloud.server.utekos.no`
- [ ] Consent-triggere på DPS-navn som matcher Admin
- [ ] Publiser

## Produksjonskontroll

- Verifiser på **https://utekos.no** (ikke googletagmanager.com): Tag Assistant Connected + GTM Preview
- Standardstatus, godta, avslå og tilbaketrekking i Tag Assistant
- `ucEvent`, `ucConsentAllowedDps` og sGTM Preview
- Meta Pixel og direkte CAPI deler `event_id`
- Meta sendes aldri via sGTM
- Browser-GA4 dupliseres ikke via Measurement Protocol når `GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm`
- Ukjente tjenester i DPS-skanningen er klassifisert
