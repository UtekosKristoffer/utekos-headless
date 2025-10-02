# fetch

Next.js utvider
[Web `fetch()` API](https://developer.mozilla.org/docs/Web/API/Fetch_API) slik
at hver forespørsel på serveren kan angi sin egen persistente caching og
revaliderings-semantikk.

I nettleseren indikerer `cache`-alternativet hvordan en fetch-forespørsel vil
samhandle med _nettleserens_ HTTP-cache. Med denne utvidelsen indikerer `cache`
hvordan en _server-side_ fetch-forespørsel vil samhandle med rammeverkets
persistente [Data Cache](/docs/app/guides/caching.md#data-cache).

Du kan kalle `fetch` med `async` og `await` direkte i Server Components.

```tsx filename="app/page.tsx" switcher
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/page.js" switcher
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## `fetch(url, options)`

Siden Next.js utvider
[Web `fetch()` API](https://developer.mozilla.org/docs/Web/API/Fetch_API), kan
du bruke alle
[native alternativer](https://developer.mozilla.org/docs/Web/API/fetch#parameters).

### `options.cache`

Konfigurer hvordan forespørselen skal samhandle med Next.js
[Data Cache](/docs/app/guides/caching.md#data-cache).

```ts
fetch(`https://...`, { cache: 'force-cache' | 'no-store' })
```

- **`auto no cache`** (standard): Next.js henter ressursen fra ekstern server
  ved hver forespørsel i utvikling, men vil hente én gang under `next build`
  fordi ruten blir statisk prerendret. Hvis
  [Dynamiske API-er](/docs/app/getting-started/partial-prerendering.md#dynamic-rendering)
  oppdages på ruten, vil Next.js hente ressursen ved hver forespørsel.
- **`no-store`**: Next.js henter ressursen fra ekstern server ved hver
  forespørsel, selv om Dynamiske API-er ikke oppdages på ruten.
- **`force-cache`**: Next.js ser etter en matchende forespørsel i sin Data
  Cache.
  - Hvis det finnes en match og den er fersk, returneres den fra cachen.
  - Hvis det ikke finnes en match eller en utdatert match, vil Next.js hente
    ressursen fra ekstern server og oppdatere cachen med den nedlastede
    ressursen.

### `options.next.revalidate`

```ts
fetch(`https://...`, { next: { revalidate: false | 0 | number } })
```

Angi cache-levetiden til en ressurs (i sekunder).
[Data Cache](/docs/app/guides/caching.md#data-cache).

- **`false`** - Cache ressursen på ubestemt tid. Semantisk ekvivalent med
  `revalidate: Infinity`. HTTP-cachen kan fjerne eldre ressurser over tid.
- **`0`** - Forhindrer at ressursen caches.
- **`number`** - (i sekunder) Angi at ressursen skal ha en cache-levetid på maks
  `n` sekunder.

> **Nyttig å vite**:
>
> - Hvis en individuell `fetch()`-forespørsel setter et `revalidate`-nummer
>   lavere enn
>   [standard `revalidate`](/docs/app/api-reference/file-conventions/route-segment-config.md#revalidate)
>   for en rute, vil hele rutens revalideringsintervall bli redusert.
> - Hvis to fetch-forespørsler med samme URL i samme rute har forskjellige
>   `revalidate`-verdier, vil den laveste verdien bli brukt.
> - Motstridende alternativer som `{ revalidate: 3600, cache: 'no-store' }` er
>   ikke tillatt, begge vil bli ignorert, og i utviklingsmodus vil en advarsel
>   bli skrevet ut i terminalen.

### `options.next.tags`

```ts
fetch(`https://...`, { next: { tags: ['collection'] } })
```

Angi cache-tags for en ressurs. Data kan deretter revalideres on-demand ved bruk
av [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md). Maks
lengde for en egendefinert tag er 256 tegn og maks antall tag-elementer er 128.

## Feilsøking

### Fetch standard `auto no store` og `cache: 'no-store'` viser ikke ferske data i utvikling

Next.js cacher `fetch`-responser i Server Components på tvers av Hot Module
Replacement (HMR) i lokal utvikling for raskere responser og for å redusere
kostnader for fakturerte API-kall.

Som standard gjelder
[HMR-cache](/docs/app/api-reference/config/next-config-js/serverComponentsHmrCache.md)
for alle fetch-forespørsler, inkludert de med standard `auto no cache` og
`cache: 'no-store'`-alternativ. Dette betyr at ikke-cachende forespørsler ikke
vil vise ferske data mellom HMR-oppdateringer. Cachen vil imidlertid bli tømt
ved navigering eller full sideoppdatering.

Se
[`serverComponentsHmrCache`](/docs/app/api-reference/config/next-config-js/serverComponentsHmrCache.md)
dokumentasjonen for mer informasjon.

### Hard oppdatering og caching i utvikling

I utviklingsmodus, hvis forespørselen inkluderer `cache-control: no-cache`
header, ignoreres `options.cache`, `options.next.revalidate` og
`options.next.tags`, og `fetch`-forespørselen hentes fra kilden.

Nettlesere inkluderer vanligvis `cache-control: no-cache` når cachen er
deaktivert i utviklerverktøy eller ved hard oppdatering.

## Versjonshistorikk

| Versjon   | Endringer            |
| --------- | -------------------- |
| `v13.0.0` | `fetch` introdusert. |
