---
id: useMutation
title: useMutation
---

```tsx
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables
} = useMutation(
  {
    mutationFn,
    gcTime,
    meta,
    mutationKey,
    networkMode,
    onError,
    onMutate,
    onSettled,
    onSuccess,
    retry,
    retryDelay,
    scope,
    throwOnError
  },
  queryClient
)

mutate(variables, {
  onError,
  onSettled,
  onSuccess
})
```

**Parameter1 (Options)**

- `mutationFn: (variables: TVariables, context: MutationFunctionContext) => Promise<TData>`
  - **Påkrevd, men kun hvis ingen standard mutasjonsfunksjon er definert**
  - En funksjon som utfører en asynkron oppgave og returnerer en promise.
  - `variables` er et objekt som `mutate` sender til din `mutationFn`
  - `context` er et objekt som `mutate` sender til din `mutationFn`.
    Inneholder referanse til `QueryClient`, `mutationKey` og valgfri `meta`
    objekt.
- `gcTime: number | Infinity`
  - Tiden i millisekunder ubrukt/inaktiv cache-data forblir i minnet.
    Når en mutasjons cache blir ubrukt eller inaktiv, vil cache-dataen
    bli fjernet etter denne varigheten. Når ulike cache-tider er spesifisert,
    brukes den lengste.
  - Hvis satt til `Infinity`, deaktiveres garbage collection.
  - Merk: Maks tillatt tid er omtrent
    [24 dager](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value),
    men det er mulig å omgå denne grensen med
    [timeoutManager.setTimeoutProvider](../../../../reference/timeoutManager.md#timeoutmanagersettimeoutprovider).
- `mutationKey: unknown[]`
  - Valgfritt
  - En mutasjonsnøkkel kan settes for å arve standarder satt med
    `queryClient.setMutationDefaults`.
- `networkMode: 'online' | 'always' | 'offlineFirst'`
  - Valgfritt
  - Standard er `'online'`
  - Se [Network Mode](../../guides/network-mode.md) for mer informasjon.
- `onMutate: (variables: TVariables) => Promise<TOnMutateResult | void> | TOnMutateResult | void`
  - Valgfritt
  - Denne funksjonen kjøres før mutasjonsfunksjonen og får de samme variablene
    som mutasjonsfunksjonen ville fått.
  - Nyttig for å utføre optimistiske oppdateringer av en ressurs i håp om at
    mutasjonen lykkes.
  - Verdien som returneres fra denne funksjonen sendes til både `onError`
    og `onSettled` ved feil, og kan brukes til å rulle tilbake optimistiske
    oppdateringer.
- `onSuccess: (data: TData, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => Promise<unknown> | unknown`
  - Valgfritt
  - Denne funksjonen kjøres når mutasjonen er vellykket og får mutasjonens
    resultat.
  - Hvis en promise returneres, vil den bli awaited og løst før man går videre.
- `onError: (err: TError, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => Promise<unknown> | unknown`
  - Valgfritt
  - Denne funksjonen kjøres hvis mutasjonen får en feil og får feilen som
    parameter.
  - Hvis en promise returneres, vil den bli awaited og løst før man går videre.
- `onSettled: (data: TData, error: TError, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => Promise<unknown> | unknown`
  - Valgfritt
  - Denne funksjonen kjøres når mutasjonen enten er vellykket eller får en feil,
    og får enten data eller feil som parameter.
  - Hvis en promise returneres, vil den bli awaited og løst før man går videre.
- `retry: boolean | number | (failureCount: number, error: TError) => boolean`
  - Standard er `0`.
  - Hvis `false`, vil mislykkede mutasjoner ikke forsøkes på nytt.
  - Hvis `true`, vil mislykkede mutasjoner forsøkes på nytt uendelig.
  - Hvis satt til et tall, f.eks. `3`, vil mislykkede mutasjoner forsøkes på
    nytt til antall mislykkede forsøk når det tallet.
- `retryDelay: number | (retryAttempt: number, error: TError) => number`
  - Denne funksjonen mottar et `retryAttempt`-heltall og den faktiske feilen,
    og returnerer forsinkelsen før neste forsøk i millisekunder.
  - En funksjon som
    `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)`
    gir eksponentiell backoff.
  - En funksjon som `attempt => attempt * 1000` gir lineær backoff.
- `scope: { id: string }`
  - Valgfritt
  - Standard er en unik id (slik at alle mutasjoner kjører parallelt)
  - Mutasjoner med samme scope id vil kjøre sekvensielt
- `throwOnError: undefined | boolean | (error: TError) => boolean`
  - Sett denne til `true` hvis du vil at mutasjonsfeil skal kastes i
    render-fasen og sendes til nærmeste error boundary.
  - Sett denne til `false` for å deaktivere oppførselen med å kaste feil til
    error boundary.
  - Hvis satt til en funksjon, vil den få feilen og skal returnere en boolean
    som indikerer om feilen skal vises i en error boundary (`true`) eller
    returneres som state (`false`)
- `meta: Record<string, unknown>`
  - Valgfritt
  - Hvis satt, lagres tilleggsinformasjon på mutasjons-cache-oppføringen som
    kan brukes ved behov. Den vil være tilgjengelig der `mutation` er
    tilgjengelig (f.eks. `onError`, `onSuccess` funksjoner på `MutationCache`).

**Parameter2 (QueryClient)**

- `queryClient?: QueryClient`
  - Bruk denne for å bruke en egendefinert QueryClient. Ellers vil den fra
    nærmeste kontekst bli brukt.

**Returnerer**

- `mutate: (variables: TVariables, { onSuccess, onSettled, onError }) => void`
  - Mutasjonsfunksjonen du kan kalle med variabler for å trigge mutasjonen,
    og eventuelt hooks på ekstra callback-alternativer.
  - `variables: TVariables`
    - Valgfritt
    - Variabelobjektet som sendes til `mutationFn`.
  - `onSuccess: (data: TData, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => void`
    - Valgfritt
    - Denne funksjonen kjøres når mutasjonen er vellykket og får mutasjonens
      resultat.
    - Void-funksjon, returnert verdi ignoreres
  - `onError: (err: TError, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => void`
    - Valgfritt
    - Denne funksjonen kjøres hvis mutasjonen får en feil og får feilen som
      parameter.
    - Void-funksjon, returnert verdi ignoreres
  - `onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => void`
    - Valgfritt
    - Denne funksjonen kjøres når mutasjonen enten er vellykket eller får en
      feil, og får enten data eller feil som parameter.
    - Void-funksjon, returnert verdi ignoreres
  - Hvis du gjør flere forespørsler, vil `onSuccess` kun kjøres etter siste
    kall du har gjort.
- `mutateAsync: (variables: TVariables, { onSuccess, onSettled, onError }) => Promise<TData>`
  - Lik `mutate`, men returnerer en promise som kan awaites.
- `status: MutationStatus`
  - Vil være:
    - `idle` initial status før mutasjonsfunksjonen kjører.
    - `pending` hvis mutasjonen kjører nå.
    - `error` hvis siste mutasjonsforsøk ga en feil.
    - `success` hvis siste mutasjonsforsøk var vellykket.
- `isIdle`, `isPending`, `isSuccess`, `isError`: boolean-variabler utledet fra
  `status`
- `isPaused: boolean`
  - Vil være `true` hvis mutasjonen har blitt `paused`
  - Se [Network Mode](../../guides/network-mode.md) for mer informasjon.
- `data: undefined | unknown`
  - Standard er `undefined`
  - Siste vellykkede data for mutasjonen.
- `error: null | TError`
  - Feilobjektet for spørringen, hvis en feil oppstod.
- `reset: () => void`
  - En funksjon for å nullstille mutasjonens interne tilstand (dvs. den
    nullstiller mutasjonen til starttilstand).
- `failureCount: number`
  - Antall feil for mutasjonen.
  - Økes hver gang mutasjonen feiler.
  - Nullstilles til `0` når mutasjonen lykkes.
- `failureReason: null | TError`
  - Feilårsak for mutasjons-retry.
  - Nullstilles til `null` når mutasjonen lykkes.
- `submittedAt: number`
  - Tidsstempel for når mutasjonen ble sendt inn.
  - Standard er `0`.
- `variables: undefined | TVariables`
  - Variabelobjektet sendt til `mutationFn`.
  - Standard er `undefined`.

