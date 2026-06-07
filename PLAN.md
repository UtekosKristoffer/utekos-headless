# PROJECT PLAN

## Status

STATUS: PLANNING

[Vendor-agnostic Metrics API setup](https://supabase.com/docs/guides/telemetry/metrics/vendor-agnostic.md)

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
