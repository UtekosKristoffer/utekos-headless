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
| `https://cloud.server.utekos.no/ns.html?id=GTM-5TWMJQFP`                    | iframe        | 200    |
| `https://cloud.server.utekos.no/gtag/js?id=GT-MKRLF5WK`                    | Google tag    | 200    |
| `https://cloud.server.utekos.no/gtag/js?id=GT-P3JGLNDZ`                    | Google tag    | 200    |
| `https://cloud.server.utekos.no/gtag/js?id=AW-18180376403`                 | Google Ads    | 200    |
| `https://cloud.server.utekos.no/gtag/js?id=G-FCES3L0M9M`                   | measurement ID, ikke loader | 400 |

`GT-MKRLF5WK` er kanonisk Google-tag. Den serverte konfigurasjonen inkluderer destination IDs
`G-FCES3L0M9M` og `AW-18180376403`. Direkte `G-FCES3L0M9M`-script er derfor ikke et
produksjonsakseptkriterium.

## Samtykkeflyt

Autoblocker må være **første script i `<head>`**. Next.js 16 legger `/_next/static/chunks/*` foran
layout-scripts, så autoblocker prependes via `HTMLRewriter` i [`src/proxy.ts`](../../proxy.ts) (Next 16
erstatter `middleware.ts`). Lokalt (uten Vercel Edge) faller vi tilbake til
[`UsercentricsAutoblockerScript.tsx`](../../components/cookie-consent/UsercentricsAutoblockerScript.tsx).

`<head>`-rekkefølge i [`UsercentricsScript.tsx`](../../components/cookie-consent/UsercentricsScript.tsx) og
[`layout.tsx`](../../app/layout.tsx):

1. `autoblocker.js` (sync, først — via proxy på Vercel)
2. Google Consent Mode defaults (`denied` fail-closed)
3. `https://cloud.server.utekos.no/uc-consent-signals.js` (sync, **før** CMP)
4. `loader.js` (async, `data-settings-id`)
5. GTM via [`GoogleTagManagerScript.tsx`](../../components/analytics/GoogleTagManagerScript.tsx) — lastes
   tidlig; Consent Mode styrer tag-firing, ikke script-montering

Nettleseren bruker `ucEvent`; serverrutene leser `ucConsentAllowedDps` fra requesten.

Google Consent Mode v2 oppdateres via
[`UsercentricsConsentProvider.tsx`](../../components/cookie-consent/UsercentricsConsentProvider.tsx) på
`ucEvent`.

Provider-dispatch opprettes bare når eventet har nødvendig DPS-samtykke:

- `Google Analytics` for dataLayer/sGTM (browser).
- `Facebook Pixel` for Meta Pixel og direkte Meta CAPI.
- `Microsoft Advertising Remarketing` for Microsoft UET browser-events. Shopify purchase kan i tillegg
  sendes via Microsoft UET CAPI når `MICROSOFT_UET_CAPI_TOKEN` er satt og checkout-attribusjonen inneholder
  `msclkid`.

Shopify-webhooks lagres alltid i ledgeret, men sendes ikke til annonseplattformer uten dokumenterbart
samtykke. Microsoft CAPI bruker bare checkout-attribusjon som ble fanget ved markedsføringssamtykke.

## Vercel-miljøvariabler

```text
NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID=9suQr3rGddL3Tb
NEXT_PUBLIC_USERCENTRICS_SGTM_ORIGIN=https://cloud.server.utekos.no
NEXT_PUBLIC_USERCENTRICS_CONSENT_EVENT_NAME=ucEvent
NEXT_PUBLIC_USERCENTRICS_GOOGLE_ANALYTICS_SERVICE_NAME=<exact DPS name from Admin>
NEXT_PUBLIC_USERCENTRICS_GOOGLE_ADS_SERVICE_NAME=Google Ads
NEXT_PUBLIC_USERCENTRICS_META_SERVICE_NAME=Facebook Pixel
NEXT_PUBLIC_USERCENTRICS_MICROSOFT_SERVICE_NAME=Microsoft Advertising Remarketing
NEXT_PUBLIC_USERCENTRICS_CLARITY_SERVICE_NAME=Microsoft Clarity
NEXT_PUBLIC_USERCENTRICS_POSTHOG_SERVICE_NAME=PostHog
NEXT_PUBLIC_USERCENTRICS_VERCEL_ANALYTICS_SERVICE_NAME=Vercel Analytics
NEXT_PUBLIC_USERCENTRICS_CHATBASE_SERVICE_NAME=Chatbase
NEXT_PUBLIC_USERCENTRICS_KLARNA_OSM_SERVICE_NAME=Klarna On-site Messaging
NEXT_PUBLIC_GOOGLE_GTM_ID=GTM-5TWMJQFP
NEXT_PUBLIC_GTM_RESILIENT_SCRIPT_URL=<optional override; only after a newly generated loader is verified>
NEXT_PUBLIC_GTM_RESILIENT_NOSCRIPT_URL=<optional; default ns.html?id=GTM-5TWMJQFP>
NEXT_PUBLIC_ENABLE_GTM_IN_DEV=1
NEXT_PUBLIC_MICROSOFT_UET_TAG_ID=97247724
NEXT_PUBLIC_ENABLE_MICROSOFT_UET_IN_DEV=1
GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm
MICROSOFT_UET_CAPI_TOKEN=<token from Microsoft Advertising UET tag setup; optional but required for server-side purchase>
```

Standard GTM-script er direkte sGTM-loader:
`https://cloud.server.utekos.no/gtm.js?id=GTM-5TWMJQFP`.

En tidligere Usercentrics Resilient Script Loader fortsatte å servere webcontainer-versjon `98` etter at
versjon `99` var publisert. `NEXT_PUBLIC_GTM_RESILIENT_SCRIPT_URL` skal derfor være unset. En resilient
override kan bare aktiveres etter at en ny URL er generert og verifisert mot gjeldende publiserte
webcontainer-versjon.

Aktiver `GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm` først etter vellykket GTM Web + sGTM Preview på `utekos.no`.

Lokal smoke: sett `NEXT_PUBLIC_ENABLE_GTM_IN_DEV=1` (ikke i produksjon uten behov).

## Manuell ekstern konfigurasjon (GTM + Usercentrics Admin)

### Usercentrics Admin

- [x] Publiser ruleset/settings `9suQr3rGddL3Tb`
- [x] Legg til Google Analytics, Google Ads og Facebook Pixel
- [x] Klassifiser Microsoft Clarity som `Statistikk`
- [x] Fjern `PostHog.com` og duplisert egendefinert PostHog; behold én `PostHog` som `Statistikk`
- [x] Synkroniser publiserte DPS-navn med `NEXT_PUBLIC_USERCENTRICS_*_SERVICE_NAME`
- [x] Verifiser publisert tjenestekart og bannerkonfigurasjon
- [x] Deaktiver gammel Resilient Script Loader som serverte webcontainer-versjon `98`

### GTM Server container

- [x] Behold Usercentrics consent-signals-client
- [x] Fjern duplisert GA4-client og feilkonfigurert server-tag
- [x] Aktiver gtag/dependency-serving i kanonisk GA4-client og map `G-FCES3L0M9M`
- [x] Publiser server-versjon `17`
- [x] Verifiser at `GT-MKRLF5WK`, `GT-P3JGLNDZ` og `AW-18180376403` serveres med HTTP 200
- [x] Ikke opprett native Google Ads conversion-tags: aktive primærkonverteringer er GA4-importer

### GTM Web container `GTM-5TWMJQFP`

- [x] Klargjør workspace `102`: fjern GTM-eid CMP, dupliserte Google-tags og ungated Clarity/UET
- [x] Begrens GA4-eventtaggen til eksplisitte forretningshendelser
- [x] Sett `GT-MKRLF5WK` som kanonisk Google-tag med `server_container_url=https://cloud.server.utekos.no`
- [x] Publiser web-versjon `99`
- [x] Verifiser direkte sGTM-script inneholder webcontainer-versjon `99`

Servicekontonøkkelen er rotert og GA4 property `489598217`, Realtime API, Data API og Admin API er verifisert
med HTTP 200. GTM OAuth-tokenet har nødvendige scopes for Quick Preview, container-versjoner og publisering.
Rollback-versjoner er web `98` og server `15`.

## Produksjonskontroll

- Verifiser på **https://utekos.no** (ikke googletagmanager.com): Tag Assistant Connected + GTM Preview
- Standardstatus, godta, avslå og tilbaketrekking i Tag Assistant
- `ucEvent`, `ucConsentAllowedDps` og sGTM Preview
- Meta Pixel og direkte CAPI deler `event_id`
- Meta sendes aldri via sGTM
- Browser-GA4 dupliseres ikke via Measurement Protocol når `GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm`
- Ukjente tjenester i DPS-skanningen er klassifisert
