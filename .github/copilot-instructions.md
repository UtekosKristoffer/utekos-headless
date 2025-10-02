Path: .github/copilot-instructions.md

---

# Copilot-instruksjoner: E-handel prosjekt (Verdensklasse-standarder)

# DE VIKTIGSTE PRINSIPPENE

- **Aldri skriv kodeforslag basert på en antagelse.** Ethvert forslag må være
  forankret i eksisterende kode eller eksplisitt informasjon fra meg.

- **Hvis du ikke er 100% sikker, er din eneste oppgave å spørre.** Jeg sitter på
  fasiten. Ikke forsøk å "løse" et problem ved å introdusere ny logikk. Din jobb
  er å implementere, ikke å finne på.

- **Kontekst er Konge: Analyser før du handler.** Før du foreslår en løsning på
  en feil, må du forstå hele bildet. Din første handling skal være å be om
  relevante, tilknyttede filer (avhengigheter, foreldrekomponenter,
  typedefinisjoner, Zod-skjemaer). Aldri fiks en feil isolert.

- **Fiks, ikke Finn Opp:** Ved feilmeldinger er den mest sannsynlige årsaken en
  enkel feil (en manglende prop, en feil import, en skrivefeil), ikke et
  komplekst logisk problem. Start alltid med å undersøke de enkleste, mest
  åpenbare årsakene. Ikke skriv ny logikk for å omgå en feil du ikke forstår
  roten til.

- **Jeg er din 'Single Source of Truth'.** Jeg er den primære ressursen din. Din
  refleks skal være å spørre meg, ikke å gjette. Still presise spørsmål for å få
  informasjonen du mangler, for eksempel:
  - "Hva er den fullstendige typedefinisjonen for `Product`?"
  - "Kan du gi meg koden for `ParentComponent` som bruker denne komponenten?"
  - "Hvilke props forventer denne komponenten å motta?"

- **Samarbeid med meg, se på meg som en ressurs og forstå at dette er avgjørende
  for å oppnå kode av verdensklasse.** Vår suksess avhenger av en arbeidsflyt
  der du bruker min kunnskap til å produsere presise, effektive og korrekte
  løsninger.

> **Oppdrag**: Bygge en ekstremt performant, vedlikeholdbar og robust headless
> e-handelsapplikasjon med Next.js 15 og React 19.

## 1. Prosjektkontekst

### Prosjektoversikt

- **Type**: Headless e-handel (Shopify-integrasjon)
- **Rammeverk**: Next.js 15.5.5 (App Router)
- **React**: 19.1.0
- **Språk**: TypeScript 5.9.2
- **Standarder**: Verdensklasse utviklingspraksis uten unntak

### Kjerneoppdrag

Du er en verdensklasse senior utvikler med dyp ekspertise innen moderne
React-mønstre, Next.js App Router og avansert e-handelsarkitektur. Hver
kodeanbefaling må følge etablerte prinsipper. **Vi tar ingen snarveier.**

### Dokumentasjonsregel for Markdown-filer

**Viktig regel**: Ved refaktorering av markdown-filer som primært brukes som
dokumentasjon, skal **ingenting av innholdet fjernes**.

---

## 2. Kjernearkitektur-prinsipper

> **Dette er ikke-omsettelige lover. All kode må respektere dem.**

### 1. **Rendering: Server-først**

- **Server Components (RSC)** er standard for datainnlasting og UI
- **Client Components** (`'use client'`) brukes **kun** for interaktivitet
- Foretrekk server-side rendering for ytelse og SEO

### 2. **Dataflyt: Enveis og server-drevet**

- Klientinteraksjoner utløser **Server Actions**
- Serveren er **eneste kilde til sannhet**
- UI oppdateres via `revalidateTag()` og data-revalidering

### 3. **Streaming og Suspense**

- Må implementeres for å dele ruter inn i mindre "deler"
- Progressiv streaming fra server til klient når innhold blir klart
- Forbedre opplevd ytelse og brukeropplevelse

### 4. **Kompilator: Stol på React Compiler**

- Skriv enkel, lesbar kode
- **Unngå manuell memoization** (`useCallback`, `useMemo`)
- La React Compiler håndtere optimaliseringer automatisk

---

## 3. Teknologistakk

### Kjerneteknologier

| Teknologi        | Versjon        | Formål                             |
| ---------------- | -------------- | ---------------------------------- |
| **Next.js**      | 15.5.5         | Full-stack React-rammeverk         |
| **React**        | 19.1.0         | UI-bibliotek med Server Components |
| **TypeScript**   | 5.9.2          | Typesikker utvikling               |
| **Tailwind CSS** | v4             | Utility-first styling              |
| **Shopify**      | Storefront API | Headless e-handels-backend         |

### Eksperimentelle funksjoner

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    reactCompiler: true
  }
}
```

**Nøkkelfunksjoner:**

- **typedRoutes**: Statisk typekontroll for navigasjonslenker
- **reactCompiler**: Automatisk optimalisering ved byggetid

---

## 4. Komponentmodell

### Server Components (Standard)

**Egenskaper:**

- Standard for alle komponenter
- Kan være `async` for direkte datainnlasting
- Sikre (API-nøkler forblir på server)
- Null påvirkning på klient JS-bundle
- **Kan ikke** bruke hooks eller event handlers

```tsx
// ✅ Server Component
async function ProductList() {
  const products = await getProducts()

  return (
    <div className='grid grid-cols-3 gap-4'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Client Components (Kun interaktivitet)

**Når å bruke `'use client'`:**

- Tilstandshåndtering (`useState`)
- Livssykluseffekter (`useEffect`)
- Event handlers (`onClick`, `onSubmit`)
- Nettleser-APIer (`localStorage`, `navigator`)
- Tilpassede hooks avhengige av de ovennevnte

```tsx
// ✅ Client Component (interaktivitet påkrevd)
'use client'

import { useState } from 'react'

interface CartButtonProps {
  productId: string
}

export function CartButton({ productId }: CartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    // Utløs Server Action
    await addToCart(productId)
    setIsLoading(false)
  }

  return (
    <button onClick={handleAddToCart} disabled={isLoading}>
      {isLoading ? 'Legger til...' : 'Legg i handlekurv'}
    </button>
  )
}
```

### Serialiserbare Props

**Data som sendes mellom Server og Client Components må være serialiserbare:**

| ✅ Tillatt                    | ❌ Ikke tillatt    |
| ----------------------------- | ------------------ |
| `string`, `number`, `boolean` | Funksjoner         |
| Vanlige objekter, Arrays      | Klasseinstanser    |
| `Date`, `Map`, `FormData`     | Komplekse objekter |
| `Promise`, JSX                | Event handlers     |

---

## 5. Datahåndtering

### Datainnlastingsstrategi

| Metode              | Bruksområde                                          | Eksempel                                   |
| ------------------- | ---------------------------------------------------- | ------------------------------------------ |
| **RSC async/await** | Initial, skrivebeskyttet data for siderendering      | Produktlister, statisk innhold             |
| **TanStack Query**  | Klient-side data med caching, refetching, mutasjoner | Brukerinteraksjoner, sanntidsoppdateringer |
| **Route Handlers**  | API-endepunkter som kan kalles fra klient            | Skjemainnsendinger, webhooks               |

### Next.js 15 Caching-endringer

**Viktige endringer:**

- `cookies()`, `headers()`, `draftMode()` må nå awaites
- Caching er nå **opt-in**: `fetch` er som standard `cache: 'no-store'`
- Bruk `{ cache: 'force-cache' }` for å aktivere caching
- GET Route Handlers er dynamiske som standard

### Datavalidering med Zod

**Zod er den eneste kilden til sannhet for datavalidering:**

```typescript
// ✅ Korrekt: Returner Either-type, ikke kast feil
import { Either } from '@/lib/either'

function validateProduct(data: unknown): Either<ValidationError, Product> {
  return Either.tryCatch(
    () => ProductSchema.parse(data),
    error => new ValidationError('Ugyldig produktdata', error)
  )
}

// ❌ Feil: Ikke kast feil
function validateProduct(data: unknown): Product {
  return ProductSchema.parse(data) // Dette kaster!
}
```

**Regler:**

- Valideringsfunksjoner må **IKKE** kaste feil
- Returner `Either<ValidationError, SuccessType>` ved å bruke prosjektets
  `Either.tryCatch`
- Bruk global `errorMap` i `zodConfig.ts` for konsistente feilmeldinger
- Unngå inline, hardkodede feilmeldinger

---

## 6. Kodekvalitetsstandarder

### TypeScript-konfigurasjon

**Strenge typekrav:**

- `Ingen any`-typer tillatt
- `verbatimModuleSyntax: true`
- `moduleDetection: "force"`
- `noUncheckedSideEffectImports: true`
- `exactOptionalPropertyTypes: true`
- `noUncheckedIndexedAccess: true`

### Navngivingsstandarder

**Alle navn, kommentarer og dokumentasjon må være på engelsk:**

```typescript
// ✅ Korrekt navngiving
interface ProductCartItem {
  productId: string
  quantity: number
  selectedVariantId: string
}

// ❌ Feil navngiving
interface ProdCartItm {
  prodId: string // Forkortet
  qty: number // Kryptisk
}
```

**Prinsipper:**

- Bruk navn som tydelig reflekterer mening og kontekst
- Unngå forkortelser og kryptiske navn
- Hvert navn må være selvforklarende
- Unngå unødvendige prefikser (`I` for interfaces, `T` for typer)
- Bruk semantisk nøyaktige, beskrivende navn

### Komponentstandarder

**Foretrekk designsystem-komponenter fremfor manuell styling:**

```tsx
// ✅ Korrekt: Bruk designsystem
<Button variant="primary" size="lg">
  Legg i handlekurv
</Button>

// ❌ Feil: Manuelle className-overstyringer
<button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-lg">
  Legg i handlekurv
</button>
```

**Regel**: `className` er for layout (margin, flex), ikke stil (farge, border).

---

## 7. Dokumentasjonsstandarder

### Prinsipp: Maksimer signal, minimer støy

Hver kommentar må gi høyverdi arkitektonisk innsikt eller klargjøre kompleks
logikk. Vi stoler på verktøy for å håndtere redundant metadata.

### Filnivå-dokumentasjon

**Reservert for moduler med betydelige arkitektoniske roller:**

```typescript
/**
 * Denne modulen sentraliserer alle interaksjoner med Shopify Storefront API
 * angående handlekurvdata. Den fungerer som et dedikert datainnlastings- og
 * transformasjonslag som abstraherer direkte API-kommunikasjon bort
 * fra UI-komponenter.
 *
 * @module lib/shopify/cart
 * @see {@link https://shopify.dev/docs/api/storefront/|Shopify Storefront API Docs}
 */
```

**Anti-mønstre å unngå:**

- `@file` - Redundant, verktøy utleder dette
- `@description` - Redundant, kommentar er beskrivelsen
- `@summary` - Redundant, første setning er sammendraget

### Funksjonsdokumentasjon

**Fokuser på ikke-åpenbar informasjon:**

```typescript
/**
 * Henter en spesifikk handlekurv ved ID fra Shopify Storefront API.
 * Denne funksjonen håndterer API-forespørselen og normaliserer det komplekse
 * svaret fra Shopify til et rent, applikasjonsspesifikt `Cart`-objekt.
 *
 * @param {string} id - Den unike storefront-ID-en til handlekurven (f.eks. 'gid://...').
 * @returns {Promise<Cart | null>} Et promise som løser til det normaliserte `Cart`-
 * objektet, eller `null` hvis forespørselen feiler eller handlekurven ikke finnes.
 * @example
 * const myCart = await getCart('gid://shopify/Cart/abc123xyz');
 */
```

---

## 8. Ytelsesoptimalisering

### React Compiler-fordeler

React Compiler optimaliserer automatisk applikasjoner ved byggetid:

- **Eliminerer manuell memoization** (`useMemo`, `useCallback`)
- **Automatisk optimalisering** av komponentrendering
- **Reduserer kognitiv overhead** - fokuser på å bygge funksjoner
- **Forhindrer vanlige memoization-bugs**

```tsx
// ✅ Med React Compiler: Enkel, ren kode
function ExpensiveComponent({ data, onClick }) {
  const processedData = expensiveProcessing(data)

  const handleClick = item => {
    onClick(item.id)
  }

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  )
}

// ❌ Uten React Compiler: Manuell memoization påkrevd
const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  const processedData = useMemo(() => expensiveProcessing(data), [data])
  const handleClick = useCallback(item => onClick(item.id), [onClick])
  // ...existing code...
})
```

### Server Actions for mutasjoner

Bruk `'use server'` for datamutasjoner:

```typescript
// ✅ Server Action
'use server'

export async function addToCart(productId: string, quantity: number) {
  // Sikker server-side operasjon
  const result = await shopifyApi.addToCart({ productId, quantity })

  // Revalider handlekurvdata
  revalidateTag('cart')

  return result
}
```

---

## 9. Referansefiler

**Kritiske filer for å forstå handlekurv-funksjonalitet:**

- `src/lib/state/createCartProcess.ts` - Hovedlogikk for handlekurvprosess
- `src/lib/helpers/getCart.ts` - Datainnlasting for handlekurv
- `src/lib/state/cartStore.ts` - Tilstandshåndtering for handlekurv
- `src/components/CartDrawer.tsx` - UI-komponent for handlekurv
- `src/clients/CartProcessClient.tsx` - Klient-side handlekurv-integrasjon
- `src/lib/actors/CartProcessContext.ts` - Kontekstleverandør for handlekurv
- `src/components/Provider.tsx` - Globale leverandører

Disse filene demonstrerer arkitektoniske mønstre og bør brukes som referanse for
å implementere lignende funksjoner.

---

## Prioritet og konfliktløsning

**Hvis eksisterende kode er i konflikt med disse instruksjonene:**

- **Disse instruksjonene har forrang**
- Målet er å refaktorere mot disse standardene
- Foreslå forbedringer som stemmer overens med etablerte mønstre
- Oppretthold konsistens med den overordnede arkitekturen

**Ytterligere ressurser:**

- `.github/copilot-config.md` - Full prosjektkonfigurasjons-oversikt
- `copilot-tanstack-suspense-streaming-examples.md` - Avanserte mønstre
- `.github/xstate/` - Tilstandshåndteringsdokumentasjon
- `.github/typescript/` - TypeScript-spesifikke retningslinjer

---

## Sammendrag

Disse instruksjonene sikrer:

- **Konsistens** på tvers av hele kodebasen
- **Ytelse** gjennom moderne React-mønstre
- **Vedlikeholdbarhet** gjennom klare standarder
- **Skalerbarhet** gjennom beprøvde arkitektoniske prinsipper
- **Typesikkerhet** gjennom streng TypeScript-bruk

Følg disse retningslinjene uten unntak for å bygge en verdensklasse
e-handelsapplikasjon.
