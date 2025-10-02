# Caching i Next.js

Next.js forbedrer ytelsen til applikasjonen din og reduserer kostnader ved å
cache renderingsarbeid og dataforespørsler. Denne siden gir en grundig oversikt
over Next.js caching-mekanismer, API-ene du kan bruke for å konfigurere dem, og
hvordan de samhandler med hverandre.

> **Nyttig å vite**: Denne siden hjelper deg å forstå hvordan Next.js fungerer
> under panseret, men er **ikke** essensiell kunnskap for å være produktiv med
> Next.js. De fleste caching-hevristikker i Next.js bestemmes av API-bruken din
> og har standardinnstillinger for best ytelse med null eller minimal
> konfigurasjon. Hvis du heller vil hoppe rett til eksempler,
> [start her](/docs/app/getting-started/fetching-data.md).

## Oversikt

Her er en oversikt over de ulike caching-mekanismene og deres formål:

| Mekanisme                                   | Hva                           | Hvor   | Formål                                               | Varighet                      |
| ------------------------------------------- | ----------------------------- | ------ | ---------------------------------------------------- | ----------------------------- |
| [Request Memoization](#request-memoization) | Return-verdier fra funksjoner | Server | Gjenbruk data i React Component-treet                | Per-request livssyklus        |
| [Data Cache](#data-cache)                   | Data                          | Server | Lagre data på tvers av brukerforespørsler og deploys | Persistent (kan revalideres)  |
| [Full Route Cache](#full-route-cache)       | HTML og RSC payload           | Server | Redusere renderingskostnad og forbedre ytelse        | Persistent (kan revalideres)  |
| [Router Cache](#client-side-router-cache)   | RSC Payload                   | Klient | Redusere serverforespørsler ved navigasjon           | Brukersesjon eller tidsbasert |

Som standard vil Next.js cache så mye som mulig for å forbedre ytelse og
redusere kostnader. Dette betyr at ruter **statisk rendres** og dataforespørsler
**caches** med mindre du velger det bort. Diagrammet under viser standard
caching- oppførsel: når en rute statisk rendres ved byggetid og når en statisk
rute besøkes første gang.

![Diagram som viser standard caching-oppførsel i Next.js for de fire mekanismene, med HIT, MISS og SET ved byggetid og når en rute besøkes første gang.](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/caching-overview.png)

Caching-oppførsel endres avhengig av om ruten er statisk eller dynamisk rendret,
data er cached eller ikke, og om en forespørsel er del av et første besøk eller
senere navigasjon. Avhengig av brukstilfelle kan du konfigurere caching for
individuelle ruter og dataforespørsler.

Fetch-caching støttes **ikke** i `middleware`. Alle fetches gjort inne i
`middleware` vil være uten caching.

## Request Memoization

Next.js utvider [`fetch` API](#fetch) for automatisk **memoisering** av
forespørsler med samme URL og opsjoner. Dette betyr at du kan kalle en
fetch-funksjon for samme data flere steder i et React-komponenttre, men den vil
bare utføres én gang.

![Dedupliserte Fetch Requests](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/deduplicated-fetch-requests.png)

For eksempel, hvis du trenger samme data på tvers av en rute (f.eks. i Layout,
Page og flere komponenter), trenger du ikke hente data øverst i treet og sende
props mellom komponenter. Du kan hente data i komponentene som trenger det uten
å bekymre deg for ytelsesproblemer med flere nettverksforespørsler for samme
data.

```tsx filename="app/example.tsx" switcher
async function getItem() {
  // `fetch`-funksjonen er automatisk memoized og resultatet
  // caches
  const res = await fetch('https://.../item/1')
  return res.json()
}

// Denne funksjonen kalles to ganger, men utføres kun første gang
const item = await getItem() // cache MISS

// Andre kall kan være hvor som helst i ruten
const item = await getItem() // cache HIT
```

```jsx filename="app/example.js" switcher
async function getItem() {
  // `fetch`-funksjonen er automatisk memoized og resultatet
  // caches
  const res = await fetch('https://.../item/1')
  return res.json()
}

// Denne funksjonen kalles to ganger, men utføres kun første gang
const item = await getItem() // cache MISS

// Andre kall kan være hvor som helst i ruten
const item = await getItem() // cache HIT
```

**Hvordan Request Memoization fungerer**

![Diagram som viser hvordan fetch-memoization fungerer under React-rendering.](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/request-memoization.png)

- Under rendering av en rute, første gang en bestemt forespørsel kalles, vil
  resultatet ikke være i minnet og det blir en cache `MISS`.
- Funksjonen utføres, data hentes fra ekstern kilde, og resultatet lagres i
  minnet.
- Senere kall til samme forespørsel i samme render-pass blir cache `HIT`, og
  data returneres fra minnet uten å utføre funksjonen.
- Når ruten er rendret og render-pass er fullført, "nullstilles" minnet og alle
  memoiseringsoppføringer fjernes.

> **Nyttig å vite**:
>
> - Request memoization er en React-funksjon, ikke en Next.js-funksjon. Den er
>   inkludert her for å vise samspillet med andre caching-mekanismer.
> - Memoization gjelder kun `GET`-metoden i `fetch`-forespørsler.
> - Memoization gjelder kun React-komponenttreet, altså:
>   - Gjelder `fetch` i `generateMetadata`, `generateStaticParams`, Layouts,
>     Pages og andre Server Components.
>   - Gjelder ikke `fetch` i Route Handlers, da de ikke er del av
>     React-komponenttreet.
> - For tilfeller der `fetch` ikke passer (f.eks. noen databaseklienter,
>   CMS-klienter eller GraphQL-klienter), kan du bruke
>   [React `cache`-funksjonen](#react-cache-function) for å memoize funksjoner.

### Varighet

Cachen varer så lenge en serverforespørsel pågår, til React-komponenttreet er
ferdig rendret.

### Revalidering

Memoiseringen deles ikke mellom serverforespørsler og gjelder kun under
rendering, så det er ikke behov for revalidering.

### Velge bort

Memoization gjelder kun `GET`-metoden i `fetch`-forespørsler, andre metoder som
`POST` og `DELETE` memoiseres ikke. Denne standardoppførselen er en React-
optimalisering og vi anbefaler ikke å velge den bort.

For å styre individuelle forespørsler kan du bruke
[`signal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal)
fra
[`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

```js filename="app/example.js"
const { signal } = new AbortController()
fetch(url, { signal })
```

## Data Cache

Next.js har en innebygd Data Cache som **persisterer** resultatet av
datahentinger på tvers av **serverforespørsler** og **deploys**. Dette er mulig
fordi Next.js utvider den native `fetch`-API-en slik at hver forespørsel på
serveren kan angi sin egen persistente caching-semantikk.

> **Nyttig å vite**: I nettleseren indikerer `cache`-opsjonen til `fetch`
> hvordan en forespørsel samhandler med nettleserens HTTP-cache, i Next.js
> indikerer `cache`-opsjonen hvordan en server-side forespørsel samhandler med
> serverens Data Cache.

Du kan bruke [`cache`](#fetch-optionscache) og
[`next.revalidate`](#fetch-optionsnextrevalidate)-opsjonene til `fetch` for å
konfigurere caching-oppførselen.

I utviklingsmodus gjenbrukes `fetch`-data for
[Hot Module Replacement (HMR)](/docs/app/api-reference/functions/fetch.md#fetch-default-auto-no-store-and-cache-no-store-not-showing-fresh-data-in-development),
og caching-opsjoner ignoreres for
[hard refreshes](/docs/app/api-reference/functions/fetch.md#hard-refresh-and-caching-in-development).

**Hvordan Data Cache fungerer**

![Diagram som viser hvordan cached og ikke-cached fetch-forespørsler samhandler med Data Cache. Cached requests lagres i Data Cache og memoiseres, uncached requests hentes fra datakilden, lagres ikke i Data Cache, og memoiseres.](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/data-cache.png)

- Første gang en `fetch`-forespørsel med `'force-cache'`-opsjon kalles under
  rendering, sjekker Next.js Data Cache for et cached svar.
- Hvis cached svar finnes, returneres det umiddelbart og
  [memoiseres](#request-memoization).
- Hvis cached svar ikke finnes, hentes data fra datakilden, resultatet lagres i
  Data Cache og memoiseres.
- For ikke-cached data (f.eks. ingen `cache`-opsjon eller
  `{ cache: 'no-store' }`), hentes resultatet alltid fra datakilden og
  memoiseres.
- Uansett om data er cached eller ikke, memoiseres forespørslene alltid for å
  unngå dupliserte forespørsler for samme data under en React-render-pass.

> **Forskjeller mellom Data Cache og Request Memoization**
>
> Begge caching-mekanismer forbedrer ytelsen ved å gjenbruke cached data, men
> Data Cache er persistent på tvers av forespørsler og deploys, mens memoization
> kun varer for én forespørsel.

### Varighet

Data Cache er persistent på tvers av forespørsler og deploys med mindre du
revaliderer eller velger det bort.

### Revalidering

Cached data kan revalideres på to måter:

- **Tidsbasert revalidering**: Revalider data etter en viss tid og ved ny
  forespørsel. Nyttig for data som endres sjelden og hvor ferskhet ikke er
  kritisk.
- **On-demand revalidering:** Revalider data basert på en hendelse (f.eks.
  skjemainnsending). On-demand revalidering kan bruke tag- eller path-basert
  tilnærming for å revalidere grupper av data samtidig. Nyttig når du vil vise
  oppdatert data så raskt som mulig (f.eks. når innhold fra headless CMS
  oppdateres).

#### Tidsbasert revalidering

For å revalidere data med et tidsintervall, bruk `next.revalidate`-opsjonen til
`fetch` for å angi cache-livstid (i sekunder).

```js
// Revalider maks hver time
fetch('https://...', { next: { revalidate: 3600 } })
```

Alternativt kan du bruke
[Route Segment Config-opsjoner](#segment-config-options) for å konfigurere alle
`fetch`-forespørsler i et segment eller for tilfeller der du ikke kan bruke
`fetch`.

**Hvordan tidsbasert revalidering fungerer**

![Diagram som viser hvordan tidsbasert revalidering fungerer, etter revalideringsperioden returneres gammel data første gang, deretter revalideres data.](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/time-based-revalidation.png)

- Første gang en fetch med `revalidate` kalles, hentes data fra ekstern kilde og
  lagres i Data Cache.
- Forespørsler innenfor tidsrammen (f.eks. 60 sekunder) returnerer cached data.
- Etter tidsrammen returnerer neste forespørsel cached (nå utdatert) data.
  - Next.js starter revalidering av data i bakgrunnen.
  - Når data er hentet, oppdateres Data Cache med fersk data.
  - Hvis bakgrunnsrevalidering feiler, beholdes forrige data uendret.

Dette ligner på
[**stale-while-revalidate**](https://web.dev/articles/stale-while-revalidate)
oppførsel.

#### On-demand revalidering

Data kan revalideres on-demand etter path ([`revalidatePath`](#revalidatepath))
eller cache-tag ([`revalidateTag`](#fetch-optionsnexttags-and-revalidatetag)).

**Hvordan on-demand revalidering fungerer**

![Diagram som viser hvordan on-demand revalidering fungerer, Data Cache oppdateres med fersk data etter revalideringsforespørsel.](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/on-demand-revalidation.png)

- Første gang en `fetch` kalles, hentes data fra ekstern kilde og lagres i Data
  Cache.
- Når on-demand revalidering trigges, fjernes relevante cache-oppføringer.
  - Dette er forskjellig fra tidsbasert revalidering, som beholder utdatert data
    til fersk data er hentet.
- Neste forespørsel blir cache `MISS`, og data hentes fra ekstern kilde og
  lagres i Data Cache.

### Velge bort

Hvis du _ikke_ vil cache svaret fra `fetch`, kan du gjøre følgende:

```js
let data = await fetch('https://api.vercel.app/blog', { cache: 'no-store' })
```

## Full Route Cache

> **Relaterte begreper**:
>
> Du kan se begrepene **Automatic Static Optimization**, **Static Site
> Generation** eller **Static Rendering** brukt om hverandre for prosessen med å
> rendre og cache ruter i applikasjonen din ved byggetid.

Next.js rendrer og cacher automatisk ruter ved byggetid. Dette er en
optimalisering som lar deg servere cached rute i stedet for å rendre på serveren
for hver forespørsel, og gir raskere sideinnlasting.

For å forstå hvordan Full Route Cache fungerer, er det nyttig å se på hvordan
React håndterer rendering, og hvordan Next.js cacher resultatet:

### 1. React-rendering på serveren

På serveren bruker Next.js Reacts API-er for å orkestrere rendering.
Renderingsarbeidet deles opp i biter: etter individuelle rutesegmenter og
Suspense-grenser.

Hver bit rendres i to steg:

1. React rendrer Server Components til et spesielt dataformat, optimalisert for
   streaming, kalt **React Server Component Payload**.
2. Next.js bruker React Server Component Payload og Client Component
   JavaScript-instruksjoner for å rendre **HTML** på serveren.

Dette betyr at vi ikke må vente på at alt skal rendre før vi cacher arbeidet
eller sender respons. I stedet kan vi streame responsen etter hvert som arbeidet
fullføres.

> **Hva er React Server Component Payload?**
>
> React Server Component Payload er en kompakt binær representasjon av det
> rendrede React Server Components-treet. Den brukes av React på klienten for å
> oppdatere DOM. Payloaden inneholder:
>
> - Det rendrede resultatet av Server Components
> - Plassholdere for hvor Client Components skal rendres og referanser til deres
>   JavaScript-filer
> - Props sendt fra Server Component til Client Component
>
> Les mer i
> [Server Components](/docs/app/getting-started/server-and-client-components.md)
> dokumentasjonen.

### 2. Next.js-caching på serveren (Full Route Cache)

![Standardoppførsel for Full Route Cache, viser hvordan React Server Component Payload og HTML caches på serveren for statisk rendrede ruter.](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/full-route-cache.png)

Standardoppførselen i Next.js er å cache det rendrede resultatet (React Server
Component Payload og HTML) av en rute på serveren. Dette gjelder statisk
rendrede ruter ved byggetid, eller under revalidering.

### 3. React-hydrering og -reconciliation på klienten

Ved forespørsel, på klienten:

1. HTML brukes for å vise en rask, ikke-interaktiv forhåndsvisning av Client og
   Server Components.
2. React Server Components Payload brukes for å reconcile Client- og rendret
   Server Component-tre, og oppdatere DOM.
3. JavaScript-instruksjonene brukes for å
   [hydrere](https://react.dev/reference/react-dom/client/hydrateRoot) Client
   Components og gjøre applikasjonen interaktiv.

### 4. Next.js-caching på klienten (Router Cache)

React Server Component Payload lagres i klientens
[Router Cache](#client-side-router-cache) – en separat minne-cache, delt opp
etter individuelle rutesegmenter. Router Cache brukes for å forbedre
navigasjonsopplevelsen ved å lagre tidligere besøkte ruter og prefetching av
fremtidige ruter.

### 5. Senere navigasjoner

Ved senere navigasjoner eller prefetching, sjekker Next.js om React Server
Components Payload er lagret i Router Cache. Hvis ja, sendes ingen ny
forespørsel til serveren.

Hvis rutesegmentene ikke er i cachen, henter Next.js React Server Components
Payload fra serveren og fyller Router Cache på klienten.

### Statisk og dynamisk rendering

Om en rute caches ved byggetid avhenger av om den rendres statisk eller
dynamisk. Statiske ruter caches som standard, mens dynamiske ruter rendres ved
forespørsel og caches ikke.

Dette diagrammet viser forskjellen mellom statisk og dynamisk rendering, med
cached og ikke-cached data:

![Hvordan statisk og dynamisk rendering påvirker Full Route Cache. Statiske ruter caches ved byggetid eller etter datarevalidering, mens dynamiske ruter aldri caches](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/static-and-dynamic-routes.png)

Les mer om
[statisk og dynamisk rendering](/docs/app/getting-started/partial-prerendering.md#static-rendering).

### Varighet

Som standard er Full Route Cache persistent. Render-output caches på tvers av
brukerforespørsler.

### Invalidering

Det finnes to måter å invalidere Full Route Cache:

- **[Revalidere data](/docs/app/guides/caching.md#revalidating)**: Revalidering
  av [Data Cache](#data-cache) vil også invalidere Router Cache ved å rendre
  komponenter på serveren og cache det nye render-output.
- **Deploy på nytt**: I motsetning til Data Cache, som persisterer på tvers av
  deploys, tømmes Full Route Cache ved nye deploys.

### Velge bort

Du kan velge bort Full Route Cache, altså rendre komponenter dynamisk for hver
innkommende forespørsel, ved å:

- **Bruke [Dynamic API](#dynamic-apis)**: Dette velger ruten bort fra Full Route
  Cache og rendrer den dynamisk ved forespørsel. Data Cache kan fortsatt brukes.
- **Bruke `dynamic = 'force-dynamic'` eller `revalidate = 0` i route segment
  config**: Dette hopper over Full Route Cache og Data Cache. Komponenter
  rendres og data hentes for hver forespørsel til serveren. Router Cache gjelder
  fortsatt som klient-side cache.
- **Velge bort [Data Cache](#data-cache)**: Hvis en rute har en
  `fetch`-forespørsel som ikke caches, velger dette ruten bort fra Full Route
  Cache. Data for den spesifikke `fetch`-forespørselen hentes for hver
  forespørsel. Andre `fetch`-forespørsler som eksplisitt aktiverer caching
  caches fortsatt i Data Cache. Dette gir en hybrid av cached og ikke-cached
  data.

## Klient-side Router Cache

Next.js har en minnebasert klient-side router cache som lagrer RSC payload for
rutesegmenter, delt opp etter layouts, loading states og sider.

Når en bruker navigerer mellom ruter, cacher Next.js besøkte rutesegmenter og
[prefetcher](/docs/app/getting-started/linking-and-navigating.md#prefetching)
ruter brukeren sannsynligvis vil navigere til. Dette gir umiddelbar
tilbake-/fremover-navigering, ingen full-side reload mellom navigasjoner, og
bevaring av nettleser- og React-state i delte layouts.

Med Router Cache:

- **Layouts** caches og gjenbrukes ved navigasjon
  ([partial rendering](/docs/app/getting-started/linking-and-navigating.md#client-side-transitions)).
- **Loading states** caches og gjenbrukes ved navigasjon for
  [umiddelbar navigasjon](/docs/app/api-reference/file-conventions/loading.md#instant-loading-states).
- **Sider** caches ikke som standard, men gjenbrukes ved
  tilbake-/fremover-navigering i nettleseren. Du kan aktivere caching for
  sidesegmenter med den eksperimentelle
  [`staleTimes`](/docs/app/api-reference/config/next-config-js/staleTimes.md)
  config-opsjonen.

> **Nyttig å vite:** Denne cachen gjelder spesifikt Next.js og Server
> Components, og er forskjellig fra nettleserens
> [bfcache](https://web.dev/bfcache/), selv om resultatet ligner.

### Varighet

Cachen lagres i nettleserens midlertidige minne. To faktorer avgjør hvor lenge
router-cachen varer:

- **Sesjon**: Cachen persisterer ved navigasjon. Den tømmes ved sideoppdatering.
- **Automatisk invalidasjonsperiode**: Cachen for layouts og loading states
  invaliders automatisk etter en viss tid. Varigheten avhenger av hvordan
  ressursen ble
  [prefetchet](/docs/app/api-reference/components/link.md#prefetch), og om
  ressursen ble
  [statisk generert](/docs/app/getting-started/partial-prerendering.md#static-rendering):
  - **Standard prefetching** (`prefetch={null}` eller ikke spesifisert): ikke
    cached for dynamiske sider, 5 minutter for statiske sider.
  - **Full prefetching** (`prefetch={true}` eller `router.prefetch`): 5 minutter
    for både statiske og dynamiske sider.

En sideoppdatering vil tømme **alle** cached segmenter, mens automatisk
invalidasjonsperiode kun påvirker det individuelle segmentet fra det ble
prefetchet.

> **Nyttig å vite**: Den eksperimentelle
> [`staleTimes`](/docs/app/api-reference/config/next-config-js/staleTimes.md)
> config-opsjonen kan brukes for å justere automatisk invalidasjonstid.

### Invalidering

Det finnes to måter å invalidere Router Cache:

- I en **Server Action**:
  - Revalidere data on-demand etter path med
    ([`revalidatePath`](/docs/app/api-reference/functions/revalidatePath.md))
    eller cache-tag med
    ([`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md))
  - Bruk av
    [`cookies.set`](/docs/app/api-reference/functions/cookies.md#setting-a-cookie)
    eller
    [`cookies.delete`](/docs/app/api-reference/functions/cookies.md#deleting-cookies)
    invaliders Router Cache for å forhindre at ruter som bruker cookies blir
    utdaterte (f.eks. autentisering).
- Kall [`router.refresh`](/docs/app/api-reference/functions/use-router.md)
  invaliders Router Cache og henter ny data fra serveren for gjeldende rute.

### Velge bort

Fra og med Next.js 15 er sidesegmenter valgt bort som standard.

> **Nyttig å vite:** Du kan også velge bort
> [prefetching](/docs/app/getting-started/linking-and-navigating.md#prefetching)
> ved å sette `prefetch`-prop til `<Link>`-komponenten til `false`.

## Cache-interaksjoner

Når du konfigurerer de ulike caching-mekanismene, er det viktig å forstå hvordan
de samhandler:

### Data Cache og Full Route Cache

- Revalidering eller valg bort av Data Cache **vil** invalidere Full Route
  Cache, siden render-output avhenger av data.
- Invalidere eller velge bort Full Route Cache **påvirker ikke** Data Cache. Du
  kan rendre en rute dynamisk som har både cached og ikke-cached data. Dette er
  nyttig når mesteparten av siden bruker cached data, men noen komponenter
  trenger data som må hentes ved forespørsel. Du kan rendre dynamisk uten å
  bekymre deg for ytelsen ved å hente all data på nytt.

### Data Cache og klient-side Router cache

- For å umiddelbart invalidere Data Cache og Router cache, bruk
  [`revalidatePath`](#revalidatepath) eller
  [`revalidateTag`](#fetch-optionsnexttags-and-revalidatetag) i en
  [Server Action](/docs/app/getting-started/updating-data.md).
- Revalidering av Data Cache i en
  [Route Handler](/docs/app/api-reference/file-conventions/route.md) **vil
  ikke** umiddelbart invalidere Router Cache, siden Route Handler ikke er
  knyttet til en spesifikk rute. Dette betyr at Router Cache fortsetter å
  servere forrige payload til en hard refresh eller automatisk
  invalidasjonsperiode har gått ut.

## API-er

Tabellen under gir en oversikt over hvordan ulike Next.js-API-er påvirker
caching:

| API                                                                     | Router Cache               | Full Route Cache           | Data Cache                 | React Cache         |
| ----------------------------------------------------------------------- | -------------------------- | -------------------------- | -------------------------- | ------------------- |
| [`<Link prefetch>`](#link)                                              | Cache                      |                            |                            |                     |
| [`router.prefetch`](#routerprefetch)                                    | Cache                      |                            |                            |                     |
| [`router.refresh`](#routerrefresh)                                      | Revalidate                 |                            |                            |                     |
| [`fetch`](#fetch)                                                       |                            |                            | Cache                      | Cache (GET og HEAD) |
| [`fetch` `options.cache`](#fetch-optionscache)                          |                            |                            | Cache eller velg bort      |                     |
| [`fetch` `options.next.revalidate`](#fetch-optionsnextrevalidate)       |                            | Revalidate                 | Revalidate                 |                     |
| [`fetch` `options.next.tags`](#fetch-optionsnexttags-and-revalidatetag) |                            | Cache                      | Cache                      |                     |
| [`revalidateTag`](#fetch-optionsnexttags-and-revalidatetag)             | Revalidate (Server Action) | Revalidate                 | Revalidate                 |                     |
| [`revalidatePath`](#revalidatepath)                                     | Revalidate (Server Action) | Revalidate                 | Revalidate                 |                     |
| [`const revalidate`](#segment-config-options)                           |                            | Revalidate eller velg bort | Revalidate eller velg bort |                     |
| [`const dynamic`](#segment-config-options)                              |                            | Cache eller velg bort      | Cache eller velg bort      |                     |
| [`cookies`](#cookies)                                                   | Revalidate (Server Action) | Velg bort                  |                            |                     |
| [`headers`, `searchParams`](#dynamic-apis)                              |                            | Velg bort                  |                            |                     |
| [`generateStaticParams`](#generatestaticparams)                         |                            | Cache                      |                            |                     |
| [`React.cache`](#react-cache-function)                                  |                            |                            |                            | Cache               |
| [`unstable_cache`](/docs/app/api-reference/functions/unstable_cache.md) |                            |                            | Cache                      |                     |

### `<Link>`

Som standard prefetcher `<Link>`-komponenten automatisk ruter fra Full Route
Cache og legger React Server Component Payload til Router Cache.

For å deaktivere prefetching, sett `prefetch`-prop til `false`. Dette vil ikke
hoppe over cache permanent, rutesegmentet caches fortsatt klient-side når
brukeren besøker ruten.

Les mer om [`<Link>`-komponenten](/docs/app/api-reference/components/link.md).

### `router.prefetch`

`prefetch`-opsjonen til `useRouter`-hooken kan brukes for å manuelt prefetch en
rute. Dette legger React Server Component Payload til Router Cache.

Se [`useRouter`-hooken](/docs/app/api-reference/functions/use-router.md) API-
referanse.

### `router.refresh`

`refresh`-opsjonen til `useRouter`-hooken kan brukes for å manuelt oppdatere en
rute. Dette tømmer Router Cache fullstendig og henter ny data fra serveren for
gjeldende rute. `refresh` påvirker ikke Data eller Full Route Cache.

Det rendrede resultatet reconciles på klienten mens React-state og
nettleser-state bevares.

Se [`useRouter`-hooken](/docs/app/api-reference/functions/use-router.md) API-
referanse.

### `fetch`

Data returnert fra `fetch` caches _ikke_ automatisk i Data Cache.

Standard caching-oppførsel for `fetch` (f.eks. når `cache`-opsjonen ikke er
spesifisert) tilsvarer å sette `cache`-opsjonen til `no-store`:

```js
let data = await fetch('https://api.vercel.app/blog', { cache: 'no-store' })
```

Se [`fetch` API Reference](/docs/app/api-reference/functions/fetch.md) for flere
opsjoner.

### `fetch options.cache`

Du kan velge caching for individuelle `fetch` ved å sette `cache`-opsjonen til
`force-cache`:

```jsx
// Velg caching
fetch(`https://...`, { cache: 'force-cache' })
```

Se [`fetch` API Reference](/docs/app/api-reference/functions/fetch.md) for flere
opsjoner.

### `fetch options.next.revalidate`

Du kan bruke `next.revalidate`-opsjonen til `fetch` for å angi
revalideringsperiode (i sekunder) for en individuell `fetch`-forespørsel. Dette
revaliderer Data Cache, som igjen revaliderer Full Route Cache. Fersk data
hentes og komponenter rendres på nytt på serveren.

```jsx
// Revalider maks etter 1 time
fetch(`https://...`, { next: { revalidate: 3600 } })
```

Se [`fetch` API reference](/docs/app/api-reference/functions/fetch.md) for flere
opsjoner.

### `fetch options.next.tags` og `revalidateTag`

Next.js har et cache-tagging-system for finjustert datacaching og revalidering.

1. Ved bruk av `fetch` eller
   [`unstable_cache`](/docs/app/api-reference/functions/unstable_cache.md), kan
   du tagge cache-oppføringer med én eller flere tags.
2. Deretter kan du kalle `revalidateTag` for å tømme cache-oppføringer knyttet
   til den taggen.

For eksempel, du kan sette en tag ved henting av data:

```jsx
// Cache data med en tag
fetch(`https://...`, { next: { tags: ['a', 'b', 'c'] } })
```

Deretter, kall `revalidateTag` med en tag for å tømme cache-oppføringen:

```jsx
// Revalider oppføringer med en spesifikk tag
revalidateTag('a')
```

Det finnes to steder du kan bruke `revalidateTag`, avhengig av hva du ønsker:

1. [Route Handlers](/docs/app/api-reference/file-conventions/route.md) – for å
   revalidere data som respons på en tredjeparts-hendelse (f.eks. webhook).
   Dette invaliders ikke Router Cache umiddelbart, siden Route Handler ikke er
   knyttet til en spesifikk rute.
2. [Server Actions](/docs/app/getting-started/updating-data.md) – for å
   revalidere data etter en brukerhandling (f.eks. skjemainnsending). Dette
   invaliders Router Cache for tilhørende rute.

### `revalidatePath`

`revalidatePath` lar deg manuelt revalidere data **og** rendre rutesegmenter
under en spesifikk path i én operasjon. Kall av `revalidatePath` revaliderer
Data Cache, som igjen invaliders Full Route Cache.

```jsx
revalidatePath('/')
```

Det finnes to steder du kan bruke `revalidatePath`, avhengig av hva du ønsker:

1. [Route Handlers](/docs/app/api-reference/file-conventions/route.md) – for å
   revalidere data som respons på en tredjeparts-hendelse (f.eks. webhook).
2. [Server Actions](/docs/app/getting-started/updating-data.md) – for å
   revalidere data etter en brukerinteraksjon (f.eks. skjemainnsending, klikk på
   knapp).

Se
[`revalidatePath` API reference](/docs/app/api-reference/functions/revalidatePath.md)
for mer informasjon.

> **`revalidatePath`** vs. **`router.refresh`**:
>
> Kall av `router.refresh` tømmer Router Cache og rendrer rutesegmenter på
> serveren uten å invalidere Data Cache eller Full Route Cache.
>
> Forskjellen er at `revalidatePath` tømmer Data Cache og Full Route Cache, mens
> `router.refresh()` ikke endrer Data Cache og Full Route Cache, da det er et
> klient-side API.

### Dynamiske API-er

Dynamiske API-er som `cookies` og `headers`, og `searchParams`-prop i Pages,
avhenger av runtime-informasjon fra innkommende forespørsel. Bruk av disse
velger ruten bort fra Full Route Cache, altså rendres ruten dynamisk.

#### `cookies`

Bruk av `cookies.set` eller `cookies.delete` i en Server Action invaliders
Router Cache for å forhindre at ruter som bruker cookies blir utdaterte (f.eks.
for å reflektere endringer i autentisering).

Se [`cookies`](/docs/app/api-reference/functions/cookies.md) API reference.

### Segment Config Options

Route Segment Config-opsjoner kan brukes for å overstyre standarder for
rutesegmentet eller når du ikke kan bruke `fetch`-API (f.eks. databaseklient
eller tredjepartsbiblioteker).

Følgende Route Segment Config-opsjoner velger bort Full Route Cache:

- `const dynamic = 'force-dynamic'`

Denne config-opsjonen velger alle fetches bort fra Data Cache (`no-store`):

- `const fetchCache = 'default-no-store'`

Se
[`fetchCache`](/docs/app/api-reference/file-conventions/route-segment-config.md#fetchcache)
for flere avanserte opsjoner.

Se
[Route Segment Config](/docs/app/api-reference/file-conventions/route-segment-config.md)
dokumentasjonen for flere opsjoner.

### `generateStaticParams`

For
[dynamiske segmenter](/docs/app/api-reference/file-conventions/dynamic-routes.md)
(f.eks. `app/blog/[slug]/page.js`), paths levert av `generateStaticParams`
caches i Full Route Cache ved byggetid. Ved forespørsel caches også paths som
ikke var kjent ved byggetid første gang de besøkes.

For å rendre alle paths statisk ved byggetid, lever hele listen til
`generateStaticParams`:

```jsx filename="app/blog/[slug]/page.js"
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())

  return posts.map(post => ({
    slug: post.slug
  }))
}
```

For å rendre et utvalg av paths ved byggetid, og resten første gang de besøkes,
returner en delvis liste:

```jsx filename="app/blog/[slug]/page.js"
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())

  // Rendrer de første 10 postene ved byggetid
  return posts.slice(0, 10).map(post => ({
    slug: post.slug
  }))
}
```

For å rendre alle paths første gang de besøkes, returner en tom array (ingen
paths rendres ved byggetid) eller bruk
[`export const dynamic = 'force-static'`](/docs/app/api-reference/file-conventions/route-segment-config.md#dynamic):

```jsx filename="app/blog/[slug]/page.js"
export async function generateStaticParams() {
  return []
}
```

> **Nyttig å vite:** Du må returnere en array fra `generateStaticParams`, selv
> om den er tom. Ellers rendres ruten dynamisk.

```jsx filename="app/changelog/[slug]/page.js"
export const dynamic = 'force-static'
```

For å deaktivere caching ved forespørsel, legg til
`export const dynamicParams = false` i et rutesegment. Når denne config-opsjonen
brukes, serveres kun paths levert av `generateStaticParams`, og andre ruter vil
gi 404 eller matche (for
[catch-all routes](/docs/app/api-reference/file-conventions/dynamic-routes.md#catch-all-segments)).

### React `cache`-funksjon

React `cache`-funksjonen lar deg memoize returverdien til en funksjon, slik at
du kan kalle samme funksjon flere ganger, men kun utføre den én gang.

`fetch`-forespørsler med `GET` eller `HEAD` memoiseres automatisk, så du trenger
ikke å wrappe dem i React `cache`. For andre `fetch`-metoder, eller ved bruk av
datahentingsbiblioteker (som noen database-, CMS- eller GraphQL-klienter) som
ikke memoiserer forespørsler, kan du bruke `cache` for å memoize
dataforespørsler manuelt.

```ts filename="utils/get-item.ts" switcher
import { cache } from 'react'
import db from '@/lib/db'

export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```

```js filename="utils/get-item.js" switcher
import { cache } from 'react'
import db from '@/lib/db'

export const getItem = cache(async id => {
  const item = await db.item.findUnique({ id })
  return item
})
```
