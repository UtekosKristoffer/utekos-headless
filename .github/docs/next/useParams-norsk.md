# useParams

`useParams` er en **Client Component**-hook som lar deg lese en rutes
[dynamiske parametere](/docs/app/api-reference/file-conventions/dynamic-routes.md)
fylt inn av gjeldende URL.

```tsx filename="app/example-client-component.tsx" switcher
'use client'

import { useParams } from 'next/navigation'

export default function ExampleClientComponent() {
  const params = useParams<{ tag: string; item: string }>()

  // Rute -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params)

  return '...'
}
```

```jsx filename="app/example-client-component.js" switcher
'use client'

import { useParams } from 'next/navigation'

export default function ExampleClientComponent() {
  const params = useParams()

  // Rute -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params)

  return '...'
}
```

## Parametere

```tsx
const params = useParams()
```

`useParams` tar ingen parametere.

## Returnerer

`useParams` returnerer et objekt som inneholder gjeldende rutes utfylte
[dynamiske parametere](/docs/app/api-reference/file-conventions/dynamic-routes.md).

- Hver egenskap i objektet er et aktivt dynamisk segment.
- Egenskapens navn er segmentets navn, og egenskapens verdi er det segmentet er
  fylt inn med.
- Egenskapens verdi vil enten være en `string` eller et array av `string`-er
  avhengig av
  [typen dynamisk segment](/docs/app/api-reference/file-conventions/dynamic-routes.md).
- Hvis ruten ikke inneholder dynamiske parametere, returnerer `useParams` et
  tomt objekt.
- Hvis den brukes i Pages Router, vil `useParams` returnere `null` ved første
  render og oppdateres med egenskaper etter reglene over når routeren er klar.

For eksempel:

| Rute                            | URL         | `useParams()`             |
| ------------------------------- | ----------- | ------------------------- |
| `app/shop/page.js`              | `/shop`     | `{}`                      |
| `app/shop/[slug]/page.js`       | `/shop/1`   | `{ slug: '1' }`           |
| `app/shop/[tag]/[item]/page.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |
| `app/shop/[...slug]/page.js`    | `/shop/1/2` | `{ slug: ['1', '2'] }`    |

## Versjonshistorikk

| Versjon   | Endringer                |
| --------- | ------------------------ |
| `v13.3.0` | `useParams` introdusert. |
