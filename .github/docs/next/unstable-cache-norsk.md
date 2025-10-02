# unstable_cache

> **Advarsel:** Dette API-et vil bli erstattet av
> [`use cache`](/docs/app/api-reference/directives/use-cache.md) når det blir
> stabilt.

`unstable_cache` lar deg cache resultatene av kostbare operasjoner, som
databaseforespørsler, og gjenbruke dem på tvers av flere forespørsler.

```jsx
import { getUser } from './data';
import { unstable_cache } from 'next/cache';

const getCachedUser = unstable_cache(
    async (id) => getUser(id),
    ['my-app-user']
);

export default async function Component({ userID }) {
    const user = await getCachedUser(userID);
    ...
}
```

> **Nyttig å vite**:
>
> - Tilgang til dynamiske datakilder som `headers` eller `cookies` inne i en
>   cache-scope støttes ikke. Hvis du trenger disse dataene inne i en cached
>   funksjon, bruk `headers` utenfor den cached funksjonen og send nødvendig
>   dynamisk data inn som et argument.
> - Dette API-et bruker Next.js sin innebygde
>   [Data Cache](/docs/app/guides/caching.md#data-cache) for å lagre resultatet
>   på tvers av forespørsler og deployeringer.

## Parametere

```jsx
const data = unstable_cache(fetchData, keyParts, options)()
```

- `fetchData`: Dette er en asynkron funksjon som henter dataene du ønsker å
  cache. Den må være en funksjon som returnerer en `Promise`.
- `keyParts`: Dette er et ekstra array med nøkler som gir ytterligere
  identifikasjon til cachen. Som standard bruker `unstable_cache` allerede
  argumentene og den stringifiserte versjonen av funksjonen din som
  cache-nøkkel. Det er valgfritt i de fleste tilfeller; du trenger kun å bruke
  det når du benytter eksterne variabler uten å sende dem som parametere. Det er
  viktig å legge til closures brukt i funksjonen hvis du ikke sender dem som
  parametere.
- `options`: Dette er et objekt som styrer hvordan cachen oppfører seg. Det kan
  inneholde følgende egenskaper:
  - `tags`: Et array med tags som kan brukes til å kontrollere
    cache-invalidering. Next.js bruker ikke dette for å identifisere funksjonen
    unikt.
  - `revalidate`: Antall sekunder etter cachen skal revalideres. Utelat eller
    send inn `false` for å cache på ubestemt tid eller til matchende
    `revalidateTag()` eller `revalidatePath()`-metoder kalles.

## Returnerer

`unstable_cache` returnerer en funksjon som, når den kalles, returnerer en
Promise som løser til de cached dataene. Hvis dataene ikke finnes i cachen, vil
den oppgitte funksjonen bli kalt, og resultatet vil bli cached og returnert.

## Eksempel

```tsx filename="app/page.tsx" switcher
import { unstable_cache } from 'next/cache'

export default async function Page({
  params
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const getCachedUser = unstable_cache(
    async () => {
      return { id: userId }
    },
    [userId], // legg til bruker-ID i cache-nøkkelen
    {
      tags: ['users'],
      revalidate: 60
    }
  )

  //...
}
```

```jsx filename="app/page.jsx" switcher
import { unstable_cache } from 'next/cache';

export default async function Page({ params } }) {
    const { userId } = await params
    const getCachedUser = unstable_cache(
        async () => {
            return { id: userId };
        },
        [userId], // legg til bruker-ID i cache-nøkkelen
        {
            tags: ["users"],
            revalidate: 60,
        }
    );

    //...
}
```

## Versjonshistorikk

| Versjon   | Endringer                     |
| --------- | ----------------------------- |
| `v14.0.0` | `unstable_cache` introdusert. |
