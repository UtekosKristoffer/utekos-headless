## Merchant API og signalopprydding for Utekos

### Mål

- Gjøre Google Merchant API til autoritativ katalogkanal for Google.
- Få deterministisk innsikt i produktfeil, warnings og konto-/policy-signaler.
- Rydde ut inkonsistente URL- og domene-signaler som kan gi falske Merchant-varsler.

### Arbeidsantakelser

- Primær offentlig butikk-URL er `https://utekos.no`.
- `https://kasse.utekos.no` brukes kun til Shopify checkout og skal ikke brukes som Merchant landing page.
- Primært marked er `NO`, språk `no`, valuta `NOK` til Shopify-data eksplisitt tilsier noe annet.
- Google Customer Reviews inngår ikke i denne leveransen fordi Shopify checkout-sandbox ikke støtter klassisk Google opt-in-snippet på en policy-kompatibel måte.

### Implementeringsplan

1. Etablere delt catalog sync-domene for Shopify-produktdata som kan brukes av både Meta og Google.
2. Utvide Shopify Admin-kilden med `sku`, `barcode`, `vendor`, bilder, pris, lagerstatus, vekt og Google custom labels.
3. Implementere Merchant Center-domene under `src/lib/google/merchant-center` med:
   - config-validering
   - service account-auth via `google-auth-library`
   - datasource-resolusjon
   - produktmapping
   - full reconcile-sync
   - sletting av stale produkter
   - status- og issue-normalisering
4. Eksponere interne ruter:
   - `GET /api/internal/google/merchant/sync?dryRun=1|0`
   - `GET /api/internal/google/merchant/status`
   - `GET /api/cron/sync-google-merchant`
5. Legge til Vercel-cron for Google-sync hver 6. time.
6. Rydde repoet for offentlige `www`- og `/products/`-referanser som kan lekke inn i JSON-LD, feed-payloads eller andre signalflater.
7. Verifisere at site-signaler fortsatt er korrekte:
   - `<!DOCTYPE html>`
   - 200-respons for browser- og Googlebot-UA
   - canonical matcher Merchant `link`
   - `OnlineStore`- og `Product`-JSON-LD inneholder kontaktpunkt, adresse og returpolicy
   - robots/noindex blokkerer ikke butikk- eller produktsider

### Konfig

- `GOOGLE_MERCHANT_ACCOUNT_ID=5759759298`
- `GOOGLE_MERCHANT_SERVICE_ACCOUNT_JSON`
- `GOOGLE_MERCHANT_QUOTA_PROJECT=nifty-structure-490519-u6`
- `GOOGLE_MERCHANT_SYNC_SECRET`
- `GOOGLE_MERCHANT_DATA_SOURCE_ID` (valgfri)

### Operative krav

- Merchant auth skal standardiseres på servicekontoen `tag-manager-service-account@nifty-structure-490519-u6.iam.gserviceaccount.com`.
- API-nøkler skal ikke brukes til Merchant API.
- Merchant `link` skal alltid være `https://utekos.no/produkter/{handle}` og aldri `/products/*`.
- `brand` skal settes fra Shopify `vendor`, med fallback til `Utekos` bare når produktet faktisk er eget merke.
- `gtin` skal bruke `barcode` når verdien er gyldig.
- `mpn` skal bruke `sku` når GTIN mangler og SKU faktisk er legitim produsentidentifikator.
- `identifierExists=false` skal bare brukes når identifikatorer legitimt ikke finnes.
- Payloaden skal alltid sende `availability`, `price`, `image_link`, `shipping_weight`, `condition` og `custom_label_0..4`.
- Google-sync og Meta-sync kan dele catalog data-layer, men ikke runtime eller feilhåndtering.

### Testplan

1. Auth smoke test mot Merchant API med valgt servicekonto og quota-prosjekt.
2. `dryRun`-sync på lite produktutvalg for å verifisere payload og identifikatorregler.
3. Live upsert av minst ett kjent produkt og etterfølgende lesing av produktstatus/issues.
4. Full reconcile-test som verifiserer opprettelse, oppdatering og sletting av stale Merchant-produkter.
5. Live site audit mot `utekos.no` med browser- og Googlebot-UA for butikk-, produkt-, kontakt- og returflater.
6. Verifisere at Merchant status-endepunktet returnerer både Merchant-feil og site-signalresultater i strukturert form.
