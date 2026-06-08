# Utekos server-side tagging

## Valgt arkitektur

- Usercentrics CMP v3 med ruleset `9suQr3rGddL3Tb` er eneste samtykkeplattform.
- Usercentrics Server-Side Tracking hoster sGTM-containeren.
- `cloud.server.utekos.no` er førsteparts-endepunktet.
- Supabase event ledger er autoritativt revisjons- og retry-lag.
- Meta Pixel og direkte Meta CAPI er de eneste Meta-kanalene.
- Meta Signals Gateway og Cloud Run brukes ikke.

## Samtykkeflyt

`https://cloud.server.utekos.no/uc-consent-signals.js` lastes før CMP-scriptet.
Scriptet vedlikeholder Usercentrics sitt offisielle `ucConsentAllowedDps`-signal.
Nettleseren bruker `ucEvent`, mens serverrutene leser `ucConsentAllowedDps` fra
requesten.

Google Consent Mode v2 får en tidlig standardstatus med valgfrie lagringstyper
satt til `denied`. Usercentrics er eneste kilde til senere consent updates.

Provider-dispatch opprettes bare når eventet har nødvendig DPS-samtykke:

- `Google Analytics` for direkte GA4-fallback.
- `Meta Pixel` for Meta Pixel og direkte Meta CAPI.
- `Microsoft Advertising` for UET.

Shopify-webhooks lagres alltid i ledgeret, men sendes ikke til
annonseplattformer uten dokumenterbart samtykke.

## Vercel-miljøvariabler

```text
NEXT_PUBLIC_USERCENTRICS_RULESET_ID=9suQr3rGddL3Tb
NEXT_PUBLIC_USERCENTRICS_SGTM_ORIGIN=https://cloud.server.utekos.no
NEXT_PUBLIC_USERCENTRICS_CONSENT_EVENT_NAME=ucEvent
NEXT_PUBLIC_USERCENTRICS_GOOGLE_ANALYTICS_SERVICE_NAME=Google Analytics
NEXT_PUBLIC_USERCENTRICS_GOOGLE_ADS_SERVICE_NAME=Google Ads
NEXT_PUBLIC_USERCENTRICS_META_SERVICE_NAME=Meta Pixel
NEXT_PUBLIC_USERCENTRICS_MICROSOFT_SERVICE_NAME=Microsoft Advertising
NEXT_PUBLIC_USERCENTRICS_POSTHOG_SERVICE_NAME=PostHog
NEXT_PUBLIC_USERCENTRICS_VERCEL_ANALYTICS_SERVICE_NAME=Vercel Analytics
NEXT_PUBLIC_USERCENTRICS_CHATBASE_SERVICE_NAME=Chatbase
NEXT_PUBLIC_USERCENTRICS_KLARNA_OSM_SERVICE_NAME=Klarna On-site Messaging
NEXT_PUBLIC_GTM_RESILIENT_SCRIPT_URL=<generated Usercentrics resilient loader URL>
GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm
```

`NEXT_PUBLIC_GTM_RESILIENT_SCRIPT_URL` må være den eksakte URL-en som genereres
av Usercentrics Resilient Script Loader. Uten denne bruker applikasjonen
`https://cloud.server.utekos.no/gtm.js?id=<web-container-id>`.

Aktiver `GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm` først etter at web-containeren
sender browser-events til server-containeren. Direkte GA4 Measurement Protocol
beholdes kun for eksplisitte server-only/offline-events.

## Ekstern konfigurasjon

1. Opprett server-container i GTM og velg **Manually provision tagging server**.
2. Lim container-config-strengen inn i Usercentrics Server-Side Tracking.
3. Legg `cloud.server.utekos.no` til containeren med Smart Platform og pek
   CNAME hos One.com til målet Usercentrics viser.
4. Verifiser `https://cloud.server.utekos.no/healthz`.
5. Installer Usercentrics Cookiebot consent signals client i server-containeren,
   velg **Usercentrics Web CMP** og cookie delivery.
6. Konfigurer GA4 Client, GA4-tag, Conversion Linker, Google Ads, Enhanced
   Conversions og Microsoft Ads med DPS-baserte exception-triggere.
7. Aktiver geolocation headers og Resilient Script Loader.
8. Klassifiser alle tjenester fra DPS-skanningen før auto-blocking aktiveres.

Scanner-rapporten fra 8. juni 2026 har fortsatt `TODO` for PostHog-ressurser på
`portal.utekos.no`, Chatbase og Klarna On-site Messaging. Disse må knyttes til
de eksakte DPS-navnene som brukes i miljøvariablene over. Den tidligere
`transparenttextures.com`-ressursen er lokalisert i applikasjonen.

## Produksjonskontroll

- Verifiser standardstatus, godta, avslå og tilbaketrekking i Tag Assistant.
- Verifiser `ucEvent`, `ucConsentAllowedDps` og sGTM Preview.
- Verifiser at Meta Pixel og direkte CAPI deler `event_id`.
- Verifiser at Meta aldri sendes via sGTM.
- Verifiser at browser-GA4 ikke dupliseres via Measurement Protocol.
- Verifiser at ukjente tjenester i Usercentrics DPS-skanningen er klassifisert.
