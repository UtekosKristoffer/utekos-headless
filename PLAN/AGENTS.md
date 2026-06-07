# Migrasjonsplan: Tracking, Observability og Dataflyt

notebooklm-mcp er ment som et av flere verktøy, ikke nødvendigvis som ditt eneste. Ligger forøvrig også docs
om posthog og, next og vercel der. Context7 og dokumentasjon internt i kodebasen er også alltid tilgjengelig.

CASE: Prosjektet skal gjennom en større migrasjon. Total refaktorering av infrastruktur knyttet til sporing,
observability, telemetry, logging, analytics, consent management system og generell data-flow.

Er skapt integrertasjoner med supabase/postgres, posthog, sentry, redis finnes enda. Vurder hvilke data og
arbeid som skal tilknyttes hvor. Utforsk og benytt aktuelle og optimale tillegg i supabase.

- Eksempler på noen integreringeer og oppdateringer der: @supabase/server Cron Data API Database Webhooks
  GraphiQL GraphQL Iceberg Wrapper Vault Realtime Edge Functions

capi-param-builder-nodejs pakken skal benyttes der den kan, les docs/meta/capi-nodejs.md

- [CAPI Param Builder](https://context7.com/facebook/capi-param-builder)
- [CAPI README](https://github.com/facebook/capi-param-builder/blob/main/nodejs/README.md)
  facebook-nodejs-business-sdk skal dermed primært benyttes der det er aktuelt med dens ytterligere features.
  Vurder på bakgrunn av docs.

---

portal.utekos.no er opprettet som reverse-proxy i posthog - sgtm.utekos.no er historie og skal eliminieres fra
prosjektet.

Ingen avhengihet til google cloud platform

Ekstra: Etabler datavarehusstrategi: Utform en multi-datavarehusstrategi som isolerer arbeidsbelastninger for
å forhindre ressurskonflikter. Site Reliability Engineering: Identifiser kritiske scenarioer: Definer hva som
utgjør et problem, hva som danner "kø" eller spørringer må vente på ledige ressurser før de kan kjøres, hvor
de ikke bør.

Sørg for dedup av alle hendelser til meta. PLAN.md har en rapport knyttet til dette. Ignorer eventuell logikk
og arbeid som nevnes der, men ikke inngåri i prosjektet nå. Ellers gjelder:

.cursor/rules/main-project-blueprint.mdc .cursor/rules/principles.mdc
.cursor/rules/targets/performance-targets.mdc .cursor/rules/tracking/meta/capi-params.mdc

Ressurser: [@posthog](plugin://posthog@openai-curated) [@sentry](plugin://sentry@openai-curated)  
[@supabase](plugin://supabase@openai-curated) [@shopify](plugin://shopify@openai-curated)
[@superpowers](plugin://superpowers@openai-curated)  
[$modern-web-guidance](/Users/kristofferohnstadhjelmeland/utekos-headless/.agents/skills/modern-web-guidance/SKILL.md) [$next-cache-components](/Users/kristofferohnstadhjelmeland/utekos-headless/.agents/skills/next-cache-components/SKILL.md)
docs/migration/llms-docs-url.md Forventes at alt under docs/meta/\* blir lest og tatt hensyn til, dog ikke
utelukkende;

- selvsagt alle aktuelle MCP

MERK: Avvent eventuell autorisering før start. Tilgangene må være i orden.

Forventes at alt under docs/meta/\* blir lest og tatt hensyn til, dog ikke utelukkende;

Nåværende aktive annonseplattformer: META, Microsoft og Google Ads + Google Analytics og Google Tag Manager
eksisterer også. Alle er viktig, men META er viktigst. Her skal det vurderes og legges en plan på hvordan i
større grad benytte seg av flere av deres APIer; Marketing API, Conversion API, Insight API og samtidig sørge
for å få med seg seg alle aktuelle eventer og samtidig sørge for maksimal Data Quality og Matching. Pinterest
kan slettes.

Mulig jeg har glemt eller oversett enkelte tilgjengelige integrasjoner som er nyttig; ikke tolk det som at de
er uaktuelle.

Skap en plan på hvordan dette bør angripes, og anslå hvor mye som bør endres og implementeres nå i denne
fasen, for å sørge for at alt arbeid gjøres med maksimal presisjon og er i henhold til interne regler,
prinsipper og ekstrne docs. Deretter utfør.

## Summary

- Dokumentasjonsgrunnlag er tilstrekkelig for planlegging: jeg har lest `PLAN.md`, relevante Cursor-regler,
  `docs/meta/*`, Supabase-skjemaene, tracking-koden, Context7 for CAPI Param Builder/PostHog/Supabase,
  NotebookLM-notebooken og offisiell Sentry-dokumentasjon.
- Denne fasen bør være en kontrollert infrastrukturrefaktor, ikke full “alt på én gang”-migrasjon: ca. 35-50
  berørte filer, 2-4 Supabase schema/migration-endringer og tydelig fjerning av sGTM/Pinterest fra aktiv
  dataflyt.
- Implementering er ikke utført i denne runden fordi vi er i Plan Mode. Før implementering må tilgangene
  verifiseres: Meta token/pixel/dataset, PostHog proxy, Supabase service role/Vault, Sentry DSN/OTLP og Vercel
  env/cron.

## Key Changes

- Etabler én sentral tracking pipeline:
  - Ny event envelope med Zod-validering for `PageView`, `ViewContent`, `AddToCart`, `InitiateCheckout`,
    `Purchase`, `Lead`, `Search` og relevante custom-events.
  - Alle Meta browser/server-par sendes med identisk `event_name` og `event_id`.
  - `capi-param-builder-nodejs` blir primær kilde for `_fbc`, `_fbp`, client IP og normalisert/hashet PII.
  - `facebook-nodejs-business-sdk` beholdes for CAPI dispatch, Marketing API, Insights API, Dataset Quality
    API og Catalog API.
- Fjern uønsket/utdatert tracking:
  - Fjern `sgtm.utekos.no` som default i layout, GA4 server dispatch og env-eksempler.
  - Fjern Pinterest fra aktiv pixel/server-dispatch, attribution-platform config og newsletter/purchase side
    effects.
  - Ikke introduser Google Cloud Platform-avhengighet; Merchant/GCP-bundet arbeid parkeres eller isoleres
    utenfor denne trackingfasen.
- Rydd observability:
  - Bruk `@vercel/otel` som grunnlag for server traces.
  - Legg til Sentry Next.js kun som feil-/trace-destinasjon dersom autorisasjon/env er verifisert; ellers
    behold Vercel logs + OTel.
  - Samle client errors, web vitals og route handler-feil gjennom én ikke-blokkerende observability-adapter.
- Rydd PostHog:
  - Bruk én PostHog-integrasjon, ikke både `instrumentation-client` init og inline script.
  - Bruk `portal.utekos.no` som PostHog host når reverse proxyen er verifisert.
  - Default skal være opt-out/ingen capture før consent; pageview styres eksplisitt.
- Supabase blir operasjonelt lager:
  - `marketing`: consent snapshots, attribution, event ledger, Meta quality snapshots.
  - `ops`: integration jobs, provider dispatch attempts, SLO incidents, dead-letter queue.
  - `partner`: beholdes for partner/referral, men Pinterest fjernes som aktiv annonseplattform.
  - Data API eksponerer fortsatt ikke interne schemas som default; server skriver via service role.
  - Bruk Cron/pg_cron for planlagte kvalitetssjekker, Database Webhooks kun for async side effects, Vault for
    tokens, Realtime kun for admin-status.

## Data Warehouse Strategy

- Primær operasjonell warehouse nå: Supabase Postgres, isolert i schemas og tabeller med idempotency keys.
- Produktanalyse: PostHog, via `portal.utekos.no`, for sessions, funnels, feature flags og product analytics.
- Feil og traces: Sentry/Vercel OTel, ikke Supabase.
- Langsiktig analytisk warehouse: eksporter fra Supabase/PostHog til Iceberg/Snowflake-lignende lager senere;
  ikke bygg dette i første fase.
- Kritisk regel: brukerresponser, cart, checkout og produktflater må aldri vente på
  analytics/logging/provider-dispatch.

## SRE og Failure Policy

- Problem: provider-dispatch feiler, EMQ/dedup faller, queue-lag vokser, cron overlapper, eller kritisk route
  blokkeres av sekundær jobb.
- Kø: alt som er eksternt, retrybart eller ikke nødvendig for brukerrespons: Meta CAPI retries, Dataset
  Quality API, Insights API, PostHog enrichment, Sentry/log drains, catalog sync.
- Ikke kø: cart mutation, checkout redirect, produktdata ved cache hit, consent state read.
- Alle provider attempts får `event_id`, `idempotency_key`, `provider`, `status`, `attempt_count`,
  `next_attempt_at`, `last_error`.
- Hard policy: tracking endpoint skal validere og returnere raskt; dispatch skjer best-effort/background eller
  via ops queue.

## Test Plan

- Unit: Zod event schemas, consent mapping, Param Builder adapter, Meta user_data builder, dedup event_id
  generation.
- Integration: `/api/tracking-events`, checkout capture, Shopify orders-paid webhook, PostHog initialization,
  web-vitals endpoint.
- Regression: Meta Pixel + CAPI sender samme `eventID/event_id` for
  PageView/AddToCart/InitiateCheckout/Purchase.
- Security: ingen PII i logs, ingen raw secrets i repo, no-store headers på tracking endpoints.
- Build checks: `npm run lint`, `npm run build`, `npm run knip`, og Supabase schema lint/test når lokal
  Supabase er oppe.

## Assumptions

- `portal.utekos.no` er en PostHog-managed/custom reverse proxy host og skal brukes direkte som `api_host`,
  ikke erstattes av en ny `/ingest` Next proxy uten eksplisitt behov.
- Meta er viktigst i fase 1; Microsoft/Google beholdes, men får ikke blokkere Meta-grunnmuren.
- Google Ads/GA4 skal videreføres uten GCP/sGTM-avhengighet.
- Eksisterende dirty worktree må respekteres; implementering må lese berørte filer på nytt og jobbe med
  endringene som allerede ligger der.
- Credential-filer som allerede finnes lokalt under `src/api/lib/cloud-credentials` må behandles som
  kompromitterte: roteres og fjernes fra repo-historikk som separat sikkerhetsoppgave.

```text
Implementert:

Sentral consent-gated tracking-pipeline med rask 202-respons og Next.js after().
CAPI Param Builder for _fbc, _fbp og client IP.
Meta/Google provider-dispatch parallelt med samme event_id.
Supabase event ledger, provider attempts, dead-letter og SLO-tabeller.
Purchase-webhook koblet til samme ledger/statusmodell.
PostHog konsolidert til én consent-gated init via portal.utekos.no.
Aktiv Pinterest/Snap/TikTok-dispatch og Pinterest API-rute fjernet.

Alle sGTM-fallbacks fjernet. GA4 bruker direkte Measurement Protocol når server-container ikke er konfigurert.
Rå IP-, fbp-, fbc- og external-id-verdier fjernet fra logger.
Sentrale filer:
tracking-events/route.ts
processBrowserEvent.ts
warehouse
20_marketing.sql
40_ops.sql

Verifisert:
npm run build: bestått
npx tsc --noEmit: bestått
Målrettet ESLint: bestått
supabase db reset: bestått
supabase db lint --local: bestått
git diff --check: bestått

Full npm run lint og npm run knip feiler fortsatt på store eksisterende backlogs utenfor migrasjonen. Sentry, Vault og en faktisk Cron-basert retry-worker er ikke aktivert ennå; feil markeres derfor ærlig som failed, ikke som planlagte retries.
```
