# generateStaticParams

Funksjonen `generateStaticParams` kan brukes sammen med
[dynamiske rutesegmenter](/docs/app/api-reference/file-conventions/dynamic-routes.md)
for å
[**generere ruter statisk**](/docs/app/getting-started/partial-prerendering.md#static-rendering)
ved byggetid i stedet for på forespørsel ved kjøretid.

```tsx filename="app/blog/[slug]/page.tsx" switcher
// Returnerer en liste med `params` for å fylle [slug] dynamisk segment
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())

  return posts.map(post => ({
    slug: post.slug
  }))
}

// Flere versjoner av denne siden vil bli generert statisk
// ved bruk av `params` returnert fra `generateStaticParams`
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ...
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
// Returnerer en liste med `params` for å fylle [slug] dynamisk segment
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())

  return posts.map(post => ({
    slug: post.slug
  }))
}

// Flere versjoner av denne siden vil bli generert statisk
// ved bruk av `params` returnert fra `generateStaticParams`
export default async function Page({ params }) {
  const { slug } = await params
  // ...
}
```

> **Nyttig å vite**:
>
> - Du kan bruke
>   [`dynamicParams`](/docs/app/api-reference/file-conventions/route-segment-config.md#dynamicparams)
>   segment-konfigurasjon for å kontrollere hva som skjer når et dynamisk
>   segment besøkes som ikke ble generert med `generateStaticParams`.
> - Du må returnere
>   [et tomt array fra `generateStaticParams`](#all-paths-at-build-time) eller
>   bruke
>   [`export const dynamic = 'force-static'`](/docs/app/api-reference/file-conventions/route-segment-config.md#dynamic)
>   for å revalidere (ISR) [stier ved kjøretid](#all-paths-at-runtime).
> - Under `next dev` vil `generateStaticParams` bli kalt når du navigerer til en
>   rute.
> - Under `next build` kjører `generateStaticParams` før tilhørende Layouts
>   eller Pages genereres.
> - Under revalidering (ISR) vil ikke `generateStaticParams` bli kalt igjen.
> - `generateStaticParams` erstatter funksjonen
>   [`getStaticPaths`](/docs/pages/api-reference/functions/get-static-paths.md)
>   i Pages Router.

## Parametere

`options.params` (valgfritt)

Hvis flere dynamiske segmenter i en rute bruker `generateStaticParams`, vil den
underliggende `generateStaticParams`-funksjonen kjøres én gang for hvert sett
med `params` som forelderen genererer.

`params`-objektet inneholder de utfylte `params` fra foreldrenes
`generateStaticParams`, som kan brukes til å
[generere `params` i et undersegment](#multiple-dynamic-segments-in-a-route).

## Returnerer

`generateStaticParams` skal returnere et array med objekter hvor hvert objekt
representerer utfylte dynamiske segmenter for én rute.

- Hver egenskap i objektet er et dynamisk segment som skal fylles ut for ruten.
- Egenskapens navn er segmentets navn, og verdien er det segmentet skal fylles
  med.

| Eksempelrute                     | `generateStaticParams` Return Type        |
| -------------------------------- | ----------------------------------------- |
| `/product/[id]`                  | `{ id: string }[]`                        |
| `/products/[category]/[product]` | `{ category: string, product: string }[]` |
| `/products/[...slug]`            | `{ slug: string[] }[]`                    |

## Enkelt dynamisk segment

```tsx filename="app/product/[id]/page.tsx" switcher
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

// Tre versjoner av denne siden vil bli generert statisk
// ved bruk av `params` returnert fra `generateStaticParams`
// - /product/1
// - /product/2
// - /product/3
export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // ...
}
```

```jsx filename="app/product/[id]/page.js" switcher
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

// Tre versjoner av denne siden vil bli generert statisk
// ved bruk av `params` returnert fra `generateStaticParams`
// - /product/1
// - /product/2
// - /product/3
export default async function Page({ params }) {
  const { id } = await params
  // ...
}
```

## Flere dynamiske segmenter

```tsx filename="app/products/[category]/[product]/page.tsx" switcher
export function generateStaticParams() {
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' }
  ]
}

// Tre versjoner av denne siden vil bli generert statisk
// ved bruk av `params` returnert fra `generateStaticParams`
// - /products/a/1
// - /products/b/2
// - /products/c/3
export default async function Page({
  params
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product } = await params
  // ...
}
```

```jsx filename="app/products/[category]/[product]/page.js" switcher
export function generateStaticParams() {
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' }
  ]
}

// Tre versjoner av denne siden vil bli generert statisk
// ved bruk av `params` returnert fra `generateStaticParams`
// - /products/a/1
// - /products/b/2
// - /products/c/3
export default async function Page({ params }) {
  const { category, product } = await params
  // ...
}
```

## Catch-all dynamisk segment

```tsx filename="app/product/[...slug]/page.tsx" switcher
export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}

// Tre versjoner av denne siden vil bli generert statisk
// ved bruk av `params` returnert fra `generateStaticParams`
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default async function Page({
  params
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  // ...
}
```

```jsx filename="app/product/[...slug]/page.js" switcher
export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}

// Tre versjoner av denne siden vil bli generert statisk
// ved bruk av `params` returnert fra `generateStaticParams`
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default async function Page({ params }) {
  const { slug } = await params
  // ...
}
```

## Eksempler

### Statisk rendering

#### Alle stier ved byggetid

For å rendre alle stier statisk ved byggetid, oppgi hele listen med stier til
`generateStaticParams`:

```tsx filename="app/blog/[slug]/page.tsx" switcher
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())

  return posts.map(post => ({
    slug: post.slug
  }))
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())

  return posts.map(post => ({
    slug: post.slug
  }))
}
```

#### Delmengde av stier ved byggetid

For å rendre en delmengde av stier statisk ved byggetid, og resten første gang
de besøkes ved kjøretid, returner en delvis liste med stier:

```tsx filename="app/blog/[slug]/page.tsx" switcher
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())

  // Render de første 10 innleggene ved byggetid
  return posts.slice(0, 10).map(post => ({
    slug: post.slug
  }))
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())

  // Render de første 10 innleggene ved byggetid
  return posts.slice(0, 10).map(post => ({
    slug: post.slug
  }))
}
```

Deretter kan du bruke
[`dynamicParams`](/docs/app/api-reference/file-conventions/route-segment-config.md#dynamicparams)
segment-konfigurasjon for å kontrollere hva som skjer når et dynamisk segment
besøkes som ikke ble generert med `generateStaticParams`.

```tsx filename="app/blog/[slug]/page.tsx" switcher
// Alle innlegg utenom topp 10 vil bli 404
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())
  const topPosts = posts.slice(0, 10)

  return topPosts.map(post => ({
    slug: post.slug
  }))
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
// Alle innlegg utenom topp 10 vil bli 404
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())
  const topPosts = posts.slice(0, 10)

  return topPosts.map(post => ({
    slug: post.slug
  }))
}
```

#### Alle stier ved kjøretid

For å rendre alle stier statisk første gang de besøkes, returner et tomt array
(ingen stier vil bli rendret ved byggetid) eller bruk
[`export const dynamic = 'force-static'`](/docs/app/api-reference/file-conventions/route-segment-config.md#dynamic):

```jsx filename="app/blog/[slug]/page.js"
export async function generateStaticParams() {
  return []
}
```

> **Nyttig å vite:** Du må alltid returnere et array fra `generateStaticParams`,
> selv om det er tomt. Ellers vil ruten bli rendret dynamisk.

```jsx filename="app/changelog/[slug]/page.js"
export const dynamic = 'force-static'
```

### Deaktiver rendering for uspesifiserte stier

For å forhindre at uspesifiserte stier blir rendret statisk ved kjøretid, legg
til `export const dynamicParams = false` i et rutesegment. Når denne
konfigurasjonen brukes, vil kun stier oppgitt av `generateStaticParams` bli
servert, og uspesifiserte ruter vil gi 404 eller matche (for
[catch-all ruter](/docs/app/api-reference/file-conventions/dynamic-routes.md#catch-all-segments)).

### Flere dynamiske segmenter i en rute

Du kan generere params for dynamiske segmenter over gjeldende layout eller side,
men **ikke under**. For eksempel, gitt ruten
`app/products/[category]/[product]`:

- `app/products/[category]/[product]/page.js` kan generere params for **både**
  `[category]` og `[product]`.
- `app/products/[category]/layout.js` kan **kun** generere params for
  `[category]`.

Det finnes to tilnærminger for å generere params for en rute med flere dynamiske
segmenter:

#### Generer params nedenfra og opp

Generer flere dynamiske segmenter fra det underliggende rutesegmentet.

```tsx filename="app/products/[category]/[product]/page.tsx" switcher
// Generer segmenter for både [category] og [product]
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then(res => res.json())

  return products.map(product => ({
    category: product.category.slug,
    product: product.id
  }))
}

export default function Page({
  params
}: {
  params: Promise<{ category: string; product: string }>
}) {
  // ...
}
```

```jsx filename="app/products/[category]/[product]/page.js" switcher
// Generer segmenter for både [category] og [product]
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then(res => res.json())

  return products.map(product => ({
    category: product.category.slug,
    product: product.id
  }))
}

export default function Page({ params }) {
  // ...
}
```

#### Generer params ovenfra og ned

Generer foreldresegmentene først og bruk resultatet til å generere
undersegmentene.

```tsx filename="app/products/[category]/layout.tsx" switcher
// Generer segmenter for [category]
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then(res => res.json())

  return products.map(product => ({
    category: product.category.slug
  }))
}

export default function Layout({
  params
}: {
  params: Promise<{ category: string }>
}) {
  // ...
}
```

```jsx filename="app/products/[category]/layout.js" switcher
// Generer segmenter for [category]
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then(res => res.json())

  return products.map(product => ({
    category: product.category.slug
  }))
}

export default function Layout({ params }) {
  // ...
}
```

En underliggende rutesegments `generateStaticParams`-funksjon kjøres én gang for
hvert segment en foreldres `generateStaticParams` genererer.

Den underliggende `generateStaticParams`-funksjonen kan bruke `params` returnert
fra foreldres `generateStaticParams`-funksjon for å generere sine egne segmenter
dynamisk.

```tsx filename="app/products/[category]/[product]/page.tsx" switcher
// Generer segmenter for [product] ved å bruke `params` fra
// foreldres `generateStaticParams`-funksjon
export async function generateStaticParams({
  params: { category }
}: {
  params: { category: string }
}) {
  const products = await fetch(
    `https://.../products?category=${category}`
  ).then(res => res.json())

  return products.map(product => ({
    product: product.id
  }))
}

export default function Page({
  params
}: {
  params: Promise<{ category: string; product: string }>
}) {
  // ...
}
```

```jsx filename="app/products/[category]/[product]/page.js" switcher
// Generer segmenter for [product] ved å bruke `params` fra
// foreldres `generateStaticParams`-funksjon
export async function generateStaticParams({ params: { category } }) {
  const products = await fetch(
    `https://.../products?category=${category}`
  ).then(res => res.json())

  return products.map(product => ({
    product: product.id
  }))
}

export default function Page({ params }) {
  // ...
}
```

Merk at params-argumentet kan aksesseres synkront og inneholder kun
foreldresegmentets params.

For typekomplettering kan du bruke TypeScript sin `Awaited`-helper sammen med
enten
[`Page Props helper`](/docs/app/api-reference/file-conventions/page.md#page-props-helper)
eller
[`Layout Props helper`](/docs/app/api-reference/file-conventions/layout.md#layout-props-helper):

```ts filename="app/products/[category]/[product]/page.tsx" switcher
export async function generateStaticParams({
  params: { category }
}: {
  params: Awaited<LayoutProps<'/products/[category]'>['params']>
}) {
  const products = await fetch(
    `https://.../products?category=${category}`
  ).then(res => res.json())

  return products.map(product => ({
    product: product.id
  }))
}
```

> **Nyttig å vite**: `fetch`-forespørsler blir automatisk
> [memoisert](/docs/app/guides/caching.md#request-memoization) for samme data på
> tvers av alle `generate`-prefikserte funksjoner, Layouts, Pages og Server
> Components. React
> [`cache` kan brukes](/docs/app/guides/caching.md#react-cache-function) hvis
> `fetch` ikke er tilgjengelig.

## Versjonshistorikk

| Versjon   | Endringer                           |
| --------- | ----------------------------------- |
| `v13.0.0` | `generateStaticParams` introdusert. |
