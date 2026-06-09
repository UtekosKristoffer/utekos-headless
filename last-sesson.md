# FORRIGE PLAN - ikke fullført.

# Implementer Usercentrics CMP v3 og administrert sGTM

## Sammendrag

Oppdatert dokumentasjon er tilgjengelig og brukt. Implementasjonen bruker én konsistent
Usercentrics-arkitektur:

```text
Usercentrics CMP v3
ruleset: 9suQr3rGddL3Tb
        ↓
Google Consent Mode v2 + tjenestespesifikt samtykke
        ↓
GTM Web
        ↓
cloud.server.utekos.no
        ↓
Usercentrics-administrert sGTM
        ↓
GA4 + Google Ads + Microsoft Ads
```

- `cloud.server.utekos.no` beholdes som støttet førsteparts-subdomene.
- Resilient Script Loader brukes for GTM-scriptet.
- Cloud Run fjernes fra planen.
- Cookiebot CMP, Cookiebot GTM-template og CookieDeclaration-ID `9cb9d45f-...` brukes ikke.
- Meta Pixel og Utekos sin direkte Meta CAPI beholdes. Meta aktiveres ikke i sGTM eller Signals Gateway.
- Supabase-ledgeret forblir autoritativt for kritiske events, retry og revisjon.

## Implementasjonsendringer

### Usercentrics og samtykke

- Last Google Consent Mode-standardstatus som `beforeInteractive`, før CMP og GTM:
  - Alle valgfrie felter `denied`.
  - `security_storage: granted`.
  - `ads_data_redaction: true`.
  - `url_passthrough: false`.
- Last Usercentrics sin offisielle `uc-consent-signals.js` fra `cloud.server.utekos.no` før CMP-scriptet.
- Last CMP v3 med ruleset `9suQr3rGddL3Tb`.
- Bruk Usercentrics sin offisielle `ucConsentAllowedDps`-cookie som server-side consent-signal.
- Fjern den egenbygde `utekos-usercentrics-consent`-speilcookien.
- Bruk `ucEvent` som React-klientens autoritative samtykkeoppdatering.
- Usercentrics skal være eneste kilde til `gtag('consent', 'update', ...)`.

### Tjenestekategorier og gating

- `statistics`: PostHog, GA4, Microsoft Clarity, Vercel Analytics, Speed Insights og valgfri Sentry
  replay/profilering.
- `marketing`: Meta Pixel/CAPI, Google Ads, Microsoft Advertising/UET og Enhanced Conversions.
- `preferences`: Chatbase.
- Klarna betalingsfunksjonalitet behandles som nødvendig når den inngår i checkout; Klarna On-site Messaging
  behandles som markedsføring.
- Sentry-feilrapportering uten replay, profilering eller PII kan kjøre som nødvendig teknisk overvåkning.
- Lokaliser `transparenttextures.com`-ressursen for å fjerne unødvendig tredjepartsrequest.
- Aktiver Usercentrics auto-blocking først etter at alle skannede tjenester er klassifisert og testet.

### Tracking-ruter og ledger

- `/api/tracking-events` skal validere samtykke per provider, ikke blokkere hele eventet basert kun på
  Meta-samtykke.
- Eventet kan alltid lagres internt i Supabase-ledgeret med normalisert samtykkestatus.
- Meta og Microsoft dispatches bare med gyldig markedsføringssamtykke.
- Kundematching, hash’et e-post/telefon og Enhanced Conversions blokkeres uten markedsføringssamtykke.
- Shopify-webhooks skal ikke anta `marketing: true`.
- Shopify-kjøp lagres alltid internt, men sendes til annonseplattformer bare når tilhørende samtykke kan
  dokumenteres.
- Direkte GA4 Measurement Protocol beholdes for eksplisitte server-only/offline-events og skal ikke duplisere
  browser-events sendt via sGTM.

### Usercentrics sGTM

- Opprett Server GTM-container og velg `Manually provision tagging server`.
- Lim container-config-strengen inn i Usercentrics Server-Side Tracking.
- Koble `cloud.server.utekos.no` til Usercentrics-målet `f-5mpq2htvp2n7gt.server.usercentrics-sst.io`.
- Aktiver Smart Platform, geolocation headers og Resilient Script Loader.
- Verifiser `https://cloud.server.utekos.no/healthz`.
- Konfigurer GA4 Client, GA4-tag, Google Ads, Conversion Linker, Enhanced Conversions og Microsoft Ads.
- Bruk transformations til å fjerne uautoriserte og unødvendige felter.
- Alle server-tags får exception-triggere basert på Usercentrics DPS-samtykke.

### Opprydding

- Fjern uferdig Cloud Run-script og Cloud Run-dokumentasjon.
- Fjern eller karantener `/api/capi`.
- Fjern gammel custom consent-UI og foreldet `profile_marketing`-logikk.
- Oppdater `PLAN.md` til Usercentrics-administrert sGTM.
- Ikke legg inn Cookiebot CookieDeclaration-scriptet på personvernsiden.
- Bruk Usercentrics sin egen tjeneste-/personvernoversikt som dokumentasjonskilde.

## Testplan

- Ingen valgfrie scripts, cookies eller provider-events før samtykke.
- Google Consent Mode-standardstatus finnes før GTM lastes.
- Google cookieless-signaler respekterer Consent Mode.
- Godta, avslå og tilbaketrekking oppdaterer React-gates, GTM Web, sGTM og serverruter.
- PostHog starter bare med statistikksamtykke.
- Chatbase starter bare med preferansesamtykke.
- Meta Pixel og direkte CAPI bruker identisk `event_id`.
- Ingen Meta-event sendes via sGTM.
- Ingen doble GA4- eller Microsoft-events.
- Shopify-kjøp lagres uten nettleser, men annonse-dispatch krever dokumentert samtykke.
- Scanner-rapporten viser ingen uklassifiserte tjenester.
- `cloud.server.utekos.no/healthz`, GTM Preview, GA4 DebugView og provider-testverktøy verifiseres.

## Antakelser og standardvalg

- Usercentrics CMP v3 er eneste CMP.
- `9suQr3rGddL3Tb` er korrekt produksjons-ruleset.
- Usercentrics administrerer sGTM-hosting; Cloud Run brukes ikke.
- Førsteparts-subdomene velges fremfor same-origin proxy fordi det er direkte støttet av Usercentrics,
  beholder klient-IP og unngår ekstra Vercel-proxykostnad og feilkilde.
- Same-origin endpoint kan vurderes senere dersom Usercentrics tilbyr en dokumentert administrert løsning for
  dette.
- Eksisterende urelaterte endringer i den skitne worktree-en skal bevares.

Dokumentasjonsgrunnlag: [Usercentrics sGTM setup](https://usercentrics.com/docs/sst/sgtm/get-started/),
[server-side consent](https://usercentrics.com/docs/sst/sgtm/consent-server-side/),
[dataflyt](https://usercentrics.com/docs/sst/sgtm/learn-more/data-flows-within-server-side-gtm/),
[endpoint-sammenligning](https://usercentrics.com/docs/sst/sgtm/learn-more/subdomain-vs-same-origin-endpoints/)
og [Resilient Script Loader](https://usercentrics.com/docs/sst/sgtm/features/resilient-script-loader/).

https://github.com/googleanalytics/google-analytics-mcp

https://mcpmarket.com/server/google-tag-manager-4

# Historiske META-data

- IKKE GODT NOK. Finn ut hvorfor og tett hull

PageView:

Percent of Events Sending

IP Address: Not hashed - no hash required 80.47% of total events

User Agent Not hashed - no hash required 100% of total events

Browser ID (fbp) Not hashed - no hash required 100% of total events

External ID Not hashed - no hash required 99.33% of total events Coverage Meter

Click ID (fbc) Not hashed - no hash required Increase coverage 63.3% of total events

ViewContent har 55% på IP Address og 71% av Click ID (fbc).

Generelt for alle: Suboptimal innsamling av nyttig data, utenom ved kjøp. Har jo ikke innsyn navn, e.post tlf,
adresse eller noe slikt. Men: Mulig å gå satt opp noe geoIP som gir oss info om plassering i hvert fall, og
kan Sende  State, Country, City, Zip?  

view_category og add_to_cart med identisk:  IP Address Not hashed - no hash required 100% of total events

User Agent Not hashed - no hash required 100% of total events

Browser ID (fbp) Not hashed - no hash required 100% of total events

External ID Not hashed - no hash required 100% of total events
