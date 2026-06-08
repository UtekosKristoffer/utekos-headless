# PROJECT PLAN

## Status

STATUS: PLANNING

[Vendor-agnostic Metrics API setup](https://supabase.com/docs/guides/telemetry/metrics/vendor-agnostic.md)

## Tracking-domener og event collector

Dato: 2026-06-08

- `/api/tracking-events` på `utekos.no` er den Utekos-kontrollerte event collectoren for marketing-events.
- `portal.utekos.no` er kanonisk PostHog-ingest. Utekos eier DNS-navnet hos One.com, mens PostHog driver
  mottakstjenesten bak CNAME-en.
- Den parallelle Vercel-relayen på `/relay-MAhe` er fjernet.
- Meta, Google og andre annonseplattformer skal integreres som provider-adaptere bak
  `/api/tracking-events`, ikke via PostHog-proxien.
- `cloud.server.utekos.no` er produksjonsdomene for Usercentrics-administrert server-side GTM.
- Usercentrics CMP v3 med ruleset-ID `9suQr3rGddL3Tb` er autoritativ samtykkekilde. Utekos sin event collector
  leser Usercentrics sin offisielle førsteparts-cookie `ucConsentAllowedDps` server-side og lagrer normalisert
  status i event-ledgeret.
- Google-nettleserevents skal eies av sGTM når `GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm` aktiveres. Direkte GA4
  Measurement Protocol beholdes for Shopify-, offline- og server-only-events.
- `GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm` skal ikke aktiveres før Usercentrics-containeren, custom domain,
  consent-signaler og GTM-containerne er verifisert.
- Usercentrics Server-Side Tracking med **sGTM Container** er valgt som administrert hosting. Cloud Run og
  Meta Signals Gateway skal ikke brukes fordi Meta allerede har direkte Pixel + CAPI.
- Usercentrics sin offisielle `ucConsentAllowedDps` brukes som server-side samtykkesignal. Provider-dispatch
  og retry-kø opprettes bare for tjenester som hadde dokumentert DPS-samtykke da eventet ble mottatt.
- Usercentrics må publisere window-eventet `ucEvent` med `consent_status` og tjenestenavn. Uten eventet
  forblir alle valgfrie provider-events fail-closed.
- `/sporing` er kun en deaktivert `204`-sink for den tidligere server-side GTM-løsningen.

## Sentry metrics og profiling

Dato: 2026-06-08

- `@sentry/nextjs`, `@sentry/browser` og `@sentry/profiling-node` er låst til versjon `10.56.0`.
- Node-profilering bruker `nodeProfilingIntegration()`. Browser replay, tracing og profilering er deaktivert
  inntil de kan initialiseres eksplisitt bak Usercentrics-tjenesten `Sentry Replay`.
- `Document-Policy: js-profiling` sendes på dokumentresponser for å aktivere browser-profilering.
- Sentry-konfigurasjonen bruker Vercels eksisterende `PERFORMANCE_SENTRY_*`-variabler med fallback til
  standard `SENTRY_*`-navn.
- En kontrollert metric `sentry_setup_verification` og profiling-trace `sentry-profiling-verification` er
  sendt med vellykket SDK-flush.
- Sentry sourcemaps er verifisert lastet opp til organisasjonen `utekos` og prosjektet
  `sentry-utekos-headless`.
- Produksjonsdeployment `dpl_CCVsFjDshb51GG2D4VQRmLjqmYrg` er aliasert til `utekos.no`.

## Løst hendelse: Supabase pooler brukte utdatert databasepassord

Dato: 2026-06-08

- Tracking-lageret er Supabase-prosjektet `supabase-pink-lens` med prosjektref `hkoawfbomhnzupcsdggb`, ikke
  Utekos Atlas-prosjektet.
- Supavisor-feilen kom fra den aktive produksjonsdeploymenten, som fortsatt brukte miljøvariabler fra før
  Supabase-databasepassordet ble korrigert i Vercel.
- Vercel Production-verdiene for både session pooler og transaction pooler er verifisert mot
  `hkoawfbomhnzupcsdggb`.
- Sist kjente fungerende deployment er redeployet med de oppdaterte miljøvariablene som
  `dpl_2X5JkmYPGLZBf3RYc5aEdaTvUzyu` og aliasert til `utekos.no`.
- En kontrollert Web Vital ble skrevet til `ops.web_vitals` i `supabase-pink-lens` og deretter slettet.
- Ingen nye Vercel runtime-feil ble registrert etter verifikasjonen.

## Løst hendelse: PostHog-prosjekt uten events

Dato: 2026-06-07

- Produksjonsappen brukte et PostHog project token som tilhørte et annet prosjekt enn det aktive prosjektet
  `posthog-celeste-mountain`.
- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` i Vercel Production er korrigert til tokenet for det aktive prosjektet.
- Produksjonen er redeployet som `dpl_GA2tz1Y41HFjPivNKCjETmoYQEYE`.
- EU-relayen på `/relay-MAhe/capture/` er verifisert med HTTP 200.
- Verifikasjonseventet `utekos_production_relay_verification` er bekreftet mottatt i det aktive PostHog-
  prosjektet.
- PostHog fortsetter å respektere analyse-samtykke før vanlige browser-events sendes.

## Løst hendelse: Meta CAPI-token utløpt

Dato: 2026-06-07

- Produksjonens `META_ACCESS_TOKEN` og `META_SYSTEM_USER_TOKEN` er verifisert gyldige via Meta Graph API v24
  `/debug_token`. Begge er uten utløpsdato.
- Permanente Meta-autentiseringsfeil skal markeres som `failed` uten automatisk retry. Payload beholdes for
  kontrollert re-køing etter tokenrotasjon.
- `META_CAPI_ENABLED=true` er aktiv i Production.
- `META_TEST_EVENT_CODE` og `NEXT_PUBLIC_META_TEST_EVENT_CODE` er fjernet fra Production, slik at live
  produksjonshendelser ikke sendes som Test Events.
- Live CAPI-hendelse er verifisert fra `utekos.no`.
- 64 bevarte Meta-hendelser ble replayet med originale `event_id`; alle 64 lyktes. 60 tilhørende dead-letter-
  poster er markert løst.

## Ressursisolering og SLO-policy

Dato: 2026-06-04

Hovedprinsipp: kritiske brukerflater og adminflater skal aldri vente på sekundær logging, tracking,
katalogsynk, full audit eller analysearbeid. Tunge jobber skal kjøres isolert med lease, idempotency,
begrenset parallellitet, retry/backoff og synlig job-status.

### Kritiske arbeidslaster

| Arbeidslast                            | Ressurser                                                      | SLO                                                                                                           |
| -------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Cart og checkout-forberedelse          | Shopify Storefront API, cart cache tags, cookies               | p95 under 1.5s for app-logikk. Tracking må ikke blokkere success-respons.                                     |
| Produkt-, collection- og search-flater | Next.js cache, Shopify Storefront API ved cache miss           | p95 under 1.2s ved cache hit. Cache miss skal bruke fallback, stale data eller kontrollert revalidering.      |
| Proxy og normal sidetrafikk            | Vercel Function, PostHog rewrite, intern logging ved behov     | Respons skal ikke vente på Redis, app-logg eller analytics-dispatch.                                          |
| Admin status/dashboard                 | Snapshot-lager, Merchant status snapshot, Redis eller database | p95 under 2s. Skal lese forhåndsberegnet status, ikke trigge full Shopify- eller Merchant-kataloglesing live. |

### Sekundære arbeidslaster

| Arbeidslast                | Ressurser                                 | SLO                                                                                                             |
| -------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| App-logging                | Redis/app logs                            | Best-effort. Skal ha kort timeout og kan droppes ved feil. Må aldri blokkere kritisk respons.                   |
| Browser/server tracking    | Meta CAPI, GA4/sGTM, Redis logs           | HTTP-respons under 300ms etter validering. Provider-dispatch kjøres i bakgrunn eller kø.                        |
| Newsletter-sideeffekter    | Resend, Shopify subscriber sync, tracking | Primær brukerbekreftelse returneres først. CRM, tracking og subscriber-sync kjøres separat med retry.           |
| Kontaktskjema-sideeffekter | Resend, Atlas-forwarding, Redis logs      | Brukerrespons avhenger kun av nødvendig innsending. Atlas/logging er sekundært og skal ikke gjøre flyten skjør. |

### Operasjonelle tunge jobber

| Arbeidslast                       | Ressurser                                                      | SLO                                                                                                     |
| --------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Google Merchant catalog sync      | Shopify Admin API, Google Merchant API, Vercel Function/worker | Fullført innen 15 min. Ingen overlappende kjøringer. Siste vellykkede sync skal være yngre enn 6 timer. |
| Meta catalog sync                 | Shopify Admin API, Meta Catalog API, Vercel Function/worker    | Fullført innen 5 min. Siste vellykkede sync skal være yngre enn 24 timer.                               |
| Full katalogaudit/statusberegning | Shopify Admin API, Google Merchant API, snapshot-lager         | Skal kjøres planlagt eller manuelt i bakgrunn. Dashboard skal bare lese siste snapshot.                 |

### Delte ressursregler

- Shopify Admin API brukes av katalogsynk, Merchant-status og subscriber-sync. Tunge jobber skal ha egne rate
  limits og må ikke dele live request-budsjett med kritiske flater.
- Redis brukes til app-logs og enkelte attribution-/statusdata. Logging er sekundært og skal alltid være
  timeout-beskyttet.
- Google Merchant, Meta og GA4/sGTM er eksterne providerressurser. Feil eller treghet hos disse skal ikke
  forplante seg til cart, checkout, produktflater eller admin-status.
- Vercel Functions i `arn1` skal ha tydelig runtime-policy: korte bruker-/dashboardruter, egne lange
  operasjonelle jobber og best-effort tracking/logging.
- Tunge jobber skal eksponere job-id, status, starttid, sluttid, feil og siste vellykkede kjøring.

### Akseptkriterier

- Ingen kritisk route/action venter på logging, tracking eller provider-dispatch som ikke er nødvendig for
  brukerresponsen.
- Dashboard/status leser snapshot og starter ikke full kataloginnhenting som del av vanlig statusrespons.
- Merchant og Meta sync har lease/idempotency før de regnes som produksjonsklare tunge jobber.
- Alle nye AI-, tracking-, katalog- og dashboardarbeidslaster må klassifiseres som kritisk, sekundær eller
  operasjonell tung jobb før implementering.
