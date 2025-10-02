# Utvidet sammendrag: Hover, Focus og State i Tailwind CSS v4

> **Oversikt**: Dybdeanalyse av variant-systemet og dets transformative kraft
> for moderne web-utvikling.

## Table of Contents

1. [Introduksjon til variant-systemet](#introduksjon-til-variant-systemet)
2. [Kjerneprinsipper og deres betydning](#kjerneprinsipper-og-deres-betydning)
3. [Praktisk anvendelse](#praktisk-anvendelse)
4. [Sammendrag](#sammendrag)

---

## Introduksjon til variant-systemet

Dokumentet introduserer **varianter som betingede prefikser** du kan legge foran
enhver utility-klasse i Tailwind. Dette lar deg diktere nøyaktig **når en stil
skal gjelde**.

### Grunnleggende konsept

For eksempel, ved å bruke `hover:bg-sky-700`, aktiveres bakgrunnsfargen kun når
brukeren holder musepekeren over elementet.

```html
<button class="bg-sky-500 hover:bg-sky-700">Lagre endringer</button>
```

### Bredden av tilgjengelige varianter

Kraften ligger i bredden av tilgjengelige varianter, som dekker alt fra:

| Kategori                 | Eksempler                   | Formål                               |
| ------------------------ | --------------------------- | ------------------------------------ |
| **Pseudo-klasser**       | `:hover`, `:focus`          | Brukerinteraksjon                    |
| **Pseudo-elementer**     | `::before`, `::placeholder` | Style spesifikke deler av et element |
| **Mediaspørringer**      | `md:`, `lg:`, `dark:`       | Responsivitet og enhetsfunksjoner    |
| **Attributt-selektorer** | `[open]`, `[data-state]`    | Style basert på HTML-attributter     |

### Den mest avanserte funksjonen: Stabling

Muligheten til å **stable varianter** lar deg kombinere flere betingelser for å
lage ekstremt presise stilregler:

```html
<button class="dark:md:hover:bg-fuchsia-600">Avansert knapp</button>
```

**Oversettelse**: "Kun i dark mode, **OG** kun på skjermer som er medium eller
større, **OG** kun når elementet blir hovert".

---

## Kjerneprinsipper og deres betydning

Her er de viktigste prinsippene fra denne filen og hvorfor de er så fundamentale
å mestre:

### 1. Samlokalisering av all stil-logikk (Co-location)

#### Hva det er

Prinsippet om at all styling for et element – inkludert dets ulike tilstander
(hover, focus, active), responsive varianter og andre betingelser – bor på selve
HTML-elementet.

#### Hvorfor det er viktig

Dette er en **dramatisk forbedring av vedlikeholdbarhet**:

- **Eliminerer søking**: Du trenger aldri å jakte i separate CSS-filer for å
  finne ut hvorfor en knapp endrer farge på mobil i dark mode
- **All logikk samlet**: Hele styling-logikken er synlig på ett sted
- **Redusert kognitiv belastning**: Mindre mental overhead når du arbeider med
  komponenter
- **Raskere feilsøking**: Umiddelbar innsikt i alle styling-regler
- **Trygg fjerning**: Sletter du HTML-en, forsvinner garantert all tilhørende
  stil

#### Praktisk eksempel

```html
<!-- All styling-logikk for denne knappen er synlig her -->
<button
  class="
  px-4 py-2 rounded-md font-medium
  bg-blue-600 hover:bg-blue-700 active:bg-blue-800
  text-white
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  md:px-6 lg:text-lg
  dark:bg-blue-500 dark:hover:bg-blue-600
  motion-reduce:transition-none
  transition-all duration-200
"
>
  Komplett styling på ett sted
</button>
```

### 2. Komposisjon gjennom stabling (Composition via Stacking)

#### Hva det er

Evnen til å kjede sammen flere varianter for å bygge en kompleks og spesifikk
stilregel, som i `dark:md:hover:bg-fuchsia-600`.

#### Hvorfor det er viktig

Dette er hva som **transformerer Tailwind** fra en samling CSS-klasser til et
kraftfullt, deklarativt "språk" for styling:

- **Flat, lesbar syntaks**: I tradisjonell CSS ville denne ene regelen krevd en
  nøstet media-spørring med en pseudo-klasse inni
- **Forutsigbar komposisjon**: Du kan komponere disse komplekse betingelsene på
  en flat, lesbar og forutsigbar måte
- **Sofistikerte grensesnitt**: Kjernen i å bygge "sofistikerte" grensesnitt -
  du kan med letthet beskrive hvordan UI-et skal reagere på en kombinasjon av
  bruker- og enhetskontekst

#### Praktisk eksempel

```html
<!-- Tradisjonell CSS ville krevd -->
<style>
  @media (prefers-color-scheme: dark) {
    @media (min-width: 768px) {
      .my-button:hover {
        background-color: #a855f7;
      }
    }
  }
</style>

<!-- Tailwind: alt i én klasse -->
<button class="dark:md:hover:bg-purple-500">Enkel, men kraftfull</button>
```

### 3. Full CSS-uttrykkskraft i HTML

#### Hva det er

Tailwind gir deg tilgang til nesten hele spekteret av moderne CSS-selektorer
(pseudo-klasser, pseudo-elementer, attributt-selektorer) gjennom et konsistent
variant-system.

#### Hvorfor det er viktig

Dette **motbeviser en vanlig bekymring** om at "utility-first" betyr å ofre
kraften i CSS:

- **Tvert imot**: Tailwind gir deg verktøyene til å bruke denne kraften på en
  mer strukturert måte
- **Omfattende dekning**: Ved å tilby varianter for alt fra `::selection` til
  `[dir="rtl"]`
- **Konsistent system**: Sikrer at du nesten aldri trenger å forlate HTML-en for
  å skrive egendefinert CSS
- **Maksimert nytte**: Maksimerer fordelene med "utility-first"-metodikken på
  tvers av hele prosjektet

#### Praktisk eksempel

```html
<!-- Kompleks styling som før krevde custom CSS -->
<div
  class="
  /* Pseudo-elementer */
  before:content-['→'] before:mr-2 before:text-blue-500
  
  /* Strukturelle selektorer */
  first:pt-0 last:pb-0 odd:bg-gray-50
  
  /* Media queries */
  md:flex lg:items-center
  
  /* Feature queries */
  supports-[display:grid]:grid supports-[display:grid]:grid-cols-3
  
  /* Attributt-selektorer */
  data-[state=open]:shadow-lg
  
  /* Avanserte kombinasjoner */
  dark:lg:hover:not-focus:scale-105
"
>
  Alt håndtert med varianter
</div>
```

---

## Praktisk anvendelse

### Mønster 1: Intelligent interaksjon

```html
<!-- Knapp som respekterer tilgjengelighet og brukerpreferanser -->
<button
  class="
  /* Base styling */
  px-4 py-2 rounded-md font-medium
  bg-blue-600 text-white
  
  /* Smart hover: kun når ikke fokusert (bedre UX) */
  hover:not-focus:bg-blue-700
  hover:not-focus:scale-105
  
  /* Focus states */
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  focus:outline-none
  
  /* Active states */
  active:scale-95 active:bg-blue-800
  
  /* Disabled states */
  disabled:opacity-50 disabled:cursor-not-allowed
  disabled:hover:bg-blue-600 disabled:hover:scale-100
  
  /* Motion preferences */
  motion-reduce:transition-none motion-reduce:hover:scale-100
  motion-safe:transition-all motion-safe:duration-200
  
  /* Responsive adjustments */
  md:px-6 lg:text-lg
"
>
  Intelligent knapp
</button>
```

### Mønster 2: Adaptiv layout

```html
<!-- Layout som tilpasser seg enhets-kapabiliteter -->
<div
  class="
  /* Base layout */
  grid grid-cols-1 gap-4
  
  /* Progressive enhancement */
  supports-[display:grid]:grid-cols-3
  not-supports-[display:grid]:flex not-supports-[display:grid]:flex-wrap
  
  /* Responsive breakpoints */
  md:grid-cols-2 lg:grid-cols-4
  
  /* Container queries */
  @container @md:grid-cols-2 @lg:grid-cols-3
  
  /* Pointer capabilities */
  pointer-coarse:gap-6 pointer-fine:gap-4
  
  /* Color scheme adaptation */
  dark:bg-gray-900 dark:border-gray-700
"
>
  Adaptiv container
</div>
```

### Mønster 3: Tilgjengelig skjema

```html
<!-- Skjemafelt med intelligent validering og tilbakemelding -->
<div class="space-y-2">
  <label
    class="
    block text-sm font-medium
    text-gray-700 dark:text-gray-300
    /* Required indicator */
    after:content-['*'] after:text-red-500 after:ml-1
    after:hidden after:required:inline
  "
  >
    E-postadresse
  </label>

  <input
    type="email"
    required
    class="
    /* Base styling */
    w-full px-3 py-2 rounded-md border
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-gray-100
    
    /* State-aware borders */
    border-gray-300 dark:border-gray-600
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500
    invalid:border-red-500 invalid:ring-red-500
    
    /* Placeholder styling */
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    
    /* Disabled states */
    disabled:bg-gray-50 disabled:text-gray-500
    disabled:cursor-not-allowed
    
    /* Validation states */
    valid:border-green-500 invalid:border-red-500
    peer
  "
  />

  <!-- Smart error message -->
  <p
    class="
    text-sm text-red-600 dark:text-red-400
    invisible peer-invalid:visible
    /* Smooth appearance */
    opacity-0 peer-invalid:opacity-100
    transition-all duration-200
  "
  >
    Vennligst oppgi en gyldig e-postadresse
  </p>
</div>
```

---

## Sammendrag

### Transformativ kraft

Tailwind CSS v4s variant-system representerer en **fundamental endring** i
hvordan vi tenker på styling:

1. **Fra separasjon til samlokalisering**: All styling-logikk bor hvor den
   brukes
2. **Fra kompleksitet til komposisjon**: Komplekse regler bygges ved å stable
   enkle varianter
3. **Fra begrensninger til uttrykkskraft**: Full CSS-kraft gjennom et konsistent
   system

### Strategisk betydning

Dette er ikke bare en "bedre måte å skrive CSS på" - det er en **arkitektonisk
fordel** som påvirker:

- **Utviklingshastighet**: Raskere utvikling og feilsøking
- **Teamsamarbeid**: Enklere for nye utviklere å forstå og bidra
- **Vedlikeholdbarhet**: Drastisk reduserte vedlikeholdskostnader over tid
- **Skalerbarhet**: Designsystemer som vokser elegant med prosjektet

### Mestringsnivå

Å mestre variant-systemet betyr å:

1. **Tenke deklarativt**: Beskrive **hva** som skal skje, ikke **hvordan**
2. **Komponere intelligent**: Bygge komplekse interaksjoner fra enkle deler
3. **Respektere kontekst**: Alltid vurdere brukerpreferanser og
   enhets-kapabiliteter

Dette er fundamentet for å bygge **world-class** brukergrensesnitt med moderne
webbteknologi.

// GEMENI OPPSUMMERING

# Utvidet Sammendrag 📝

## Dokumentet introduserer varianter som betingede prefikser du kan legge foran enhver utility-klasse i Tailwind. Dette lar deg diktere nøyaktig når en stil skal gjelde. For eksempel, ved å bruke hover:bg-sky-700, aktiveres bakgrunnsfargen kun når brukeren holder musepekeren over elementet. Kraften ligger i bredden av tilgjengelige varianter, som dekker alt fra: Pseudo-klasser som :hover og :focus for brukerinteraksjon. Pseudo-elementer som ::before og ::placeholder for å style spesifikke deler av et element.

Mediaspørringer for responsivitet (md:, lg:) og enhetsfunksjoner som dark: (dark
mode).

Attributt-selektorer for å style basert på HTML-attributter, som [open] for en
"accordion".

Den mest avanserte funksjonen er muligheten til å stable varianter. Dette lar
deg kombinere flere betingelser for å lage ekstremt presise stilregler, som
dark:md:hover:bg-fuchsia-600. Denne ene klassen oversettes til: "Kun i dark
mode, OG kun på skjermer som er

medium eller større, OG kun når elementet blir hovert".

---

## Kjerneprinsipper og Deres Betydning 💡

Her er de viktigste prinsippene fra denne filen og hvorfor de er så fundamentale
å mestre:

1. Samlokalisering av all stil-logikk (Co-location)

- Hva det er: Prinsippet om at all styling for et element – inkludert dets ulike
  tilstander (hover, focus, active), responsive varianter og andre betingelser –
  bor på selve HTML-elementet.

- Hvorfor det er viktig: Dette er en dramatisk forbedring av vedlikeholdbarhet.
  Du trenger aldri å jakte i separate CSS-filer for å finne ut hvorfor en knapp
  endrer farge på mobil i dark mode. All logikk er samlet på ett sted. Dette
  reduserer kognitiv belastning, gjør feilsøking raskere, og gjør det trygt å
  fjerne komponenter – sletter du HTML-en, forsvinner garantert all tilhørende
  stil.

2. Komposisjon gjennom Stabling (Composition via Stacking)

- Hva det er: Evnen til å kjede sammen flere varianter for å bygge en kompleks
  og spesifikk stilregel, som i dark:md:hover:bg-fuchsia-600.

- Hvorfor det er viktig: Dette er hva som transformerer Tailwind fra en samling
  CSS-klasser til et kraftfullt, deklarativt "språk" for styling. I tradisjonell
  CSS ville denne ene regelen krevd en nøstet media-spørring med en
  pseudo-klasse inni. Med stabling kan du komponere disse komplekse betingelsene
  på en flat, lesbar og forutsigbar måte. Dette er kjernen i å bygge
  "sofistikerte" grensesnitt; du kan med letthet beskrive hvordan UI-et skal
  reagere på en kombinasjon av bruker- og enhetskontekst.

3. Full CSS-uttrykkskraft i HTML

- Hva det er: Tailwind gir deg tilgang til nesten hele spekteret av moderne
  CSS-selektorer (pseudo-klasser, pseudo-elementer, attributt-selektorer)
  gjennom et konsistent variant-system.

- Hvorfor det er viktig: Dette motbeviser en vanlig bekymring om at
  "utility-first" betyr å ofre kraften i CSS. Tvert imot, Tailwind gir deg
  verktøyene til å bruke denne kraften på en mer strukturert måte. Ved å tilby
  varianter for alt fra ::selection til [dir="rtl"], sikrer rammeverket at du
  nesten aldri trenger å forlate HTML-en for å skrive egendefinert CSS. Dette
  maksimerer fordelene med "utility-first"-metodikken på tvers av hele
  prosjektet.

---

## applyTo: 'src/\*_/_.{ts,tsx}'

# Copilot Instructions: E-commerce Project (World-Class Standards)

> **Mission**: Build an extremely performant, maintainable, and robust headless
> e-commerce application using Next.js 15 and React 19.

## Table of Contents

1. [Project Context](#1-project-context)
2. [Core Architecture Principles](#2-core-architecture-principles)
3. [Technology Stack](#3-technology-stack)
4. [Component Model](#4-component-model)
5. [Data Management](#5-data-management)
6. [Code Quality Standards](#6-code-quality-standards)
7. [Documentation Standards](#7-documentation-standards)
8. [Performance Optimization](#8-performance-optimization)
9. [Reference Files](#9-reference-files)

---

## 1. Project Context

### Project Overview

- **Type**: Headless e-commerce (Shopify integration)
- **Framework**: Next.js 15.5.5 (App Router)
- **React**: 19.1.0
- **Language**: TypeScript 5.9.2
- **Standards**: World-class development practices without exception

### Core Mission

You are a world-class senior developer with deep expertise in modern React
patterns, Next.js App Router, and advanced e-commerce architecture. Every code
suggestion must comply with established principles. **We do not take
shortcuts.**

---

## 2. Core Architecture Principles

> **These are non-negotiable laws. All code must respect them.**

### 1. **Rendering: Server-First**

- **Server Components (RSC)** are the default for data loading and UI
- **Client Components** (`'use client'`) are used **only** for interactivity
- Prefer server-side rendering for performance and SEO

### 2. **Data Flow: Unidirectional & Server-Driven**

- Client interactions trigger **Server Actions**
- Server is the **Single Source of Truth**
- UI updates via `revalidateTag()` and data revalidation

### 3. **Streaming & Suspense**

- Must be implemented to break routes into smaller "chunks"
- Progressive streaming from server to client as content becomes ready
- Improve perceived performance and user experience

### 4. **Compiler: Trust the React Compiler**

- Write simple, readable code
- **Avoid manual memoization** (`useCallback`, `useMemo`)
- Let React Compiler handle optimizations automatically

---

## 3. Technology Stack

### Core Technologies

| Technology       | Version        | Purpose                           |
| ---------------- | -------------- | --------------------------------- |
| **Next.js**      | 15.5.5         | Full-stack React framework        |
| **React**        | 19.1.0         | UI library with Server Components |
| **TypeScript**   | 5.9.2          | Type-safe development             |
| **Tailwind CSS** | v4             | Utility-first styling             |
| **Shopify**      | Storefront API | Headless e-commerce backend       |

### Experimental Features

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    reactCompiler: true
  }
}
```

**Key Features:**

- **typedRoutes**: Static type checking for navigation links
- **reactCompiler**: Automatic optimization at build time

---

## 4. Component Model

### Server Components (Default)

**Characteristics:**

- Default for all components
- Can be `async` for direct data fetching
- Secure (API keys remain on server)
- Zero impact on client JS bundle
- **Cannot** use hooks or event handlers

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

### Client Components (Interactivity Only)

**When to use `'use client'`:**

- State management (`useState`)
- Lifecycle effects (`useEffect`)
- Event handlers (`onClick`, `onSubmit`)
- Browser APIs (`localStorage`, `navigator`)
- Custom hooks dependent on the above

```tsx
// ✅ Client Component (interactivity required)
'use client'

import { useState } from 'react'

interface CartButtonProps {
  productId: string
}

export function CartButton({ productId }: CartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    // Trigger Server Action
    await addToCart(productId)
    setIsLoading(false)
  }

  return (
    <button onClick={handleAddToCart} disabled={isLoading}>
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
```

### Serializable Props

**Data passed between Server and Client Components must be serializable:**

| ✅ Allowed                    | ❌ Not Allowed  |
| ----------------------------- | --------------- |
| `string`, `number`, `boolean` | Functions       |
| Plain objects, Arrays         | Class instances |
| `Date`, `Map`, `FormData`     | Complex objects |
| `Promise`, JSX                | Event handlers  |

---

## 5. Data Management

### Data Fetching Strategy

| Method              | Use Case                                             | Example                              |
| ------------------- | ---------------------------------------------------- | ------------------------------------ |
| **RSC async/await** | Initial, read-only data for page render              | Product lists, static content        |
| **TanStack Query**  | Client-side data with caching, refetching, mutations | User interactions, real-time updates |
| **Route Handlers**  | API endpoints callable from client                   | Form submissions, webhooks           |

### Next.js 15 Caching Changes

**Important Changes:**

- `cookies()`, `headers()`, `draftMode()` must now be awaited
- Caching is now **opt-in**: `fetch` defaults to `cache: 'no-store'`
- Use `{ cache: 'force-cache' }` to enable caching
- GET Route Handlers are dynamic by default

### Data Validation with Zod

**Zod is the Single Source of Truth for data validation:**

```typescript
// ✅ Correct: Return Either type, don't throw
import { Either } from '@/lib/either'

function validateProduct(data: unknown): Either<ValidationError, Product> {
  return Either.tryCatch(
    () => ProductSchema.parse(data),
    error => new ValidationError('Invalid product data', error)
  )
}

// ❌ Incorrect: Don't throw errors
function validateProduct(data: unknown): Product {
  return ProductSchema.parse(data) // This throws!
}
```

**Rules:**

- Validation functions must **NOT** throw errors
- Return `Either<ValidationError, SuccessType>` using project's
  `Either.tryCatch`
- Use global `errorMap` in `zodConfig.ts` for consistent error messages
- Avoid inline, hardcoded error messages

---

## 6. Code Quality Standards

### TypeScript Configuration

**Strict typing requirements:**

- `No any` types allowed
- `verbatimModuleSyntax: true`
- `moduleDetection: "force"`
- `noUncheckedSideEffectImports: true`
- `exactOptionalPropertyTypes: true`
- `noUncheckedIndexedAccess: true`

### Naming Standards

**All names, comments, and documentation must be in English:**

```typescript
// ✅ Correct naming
interface ProductCartItem {
  productId: string
  quantity: number
  selectedVariantId: string
}

// ❌ Incorrect naming
interface ProdCartItm {
  prodId: string // Abbreviated
  qty: number // Cryptic
}
```

**Principles:**

- Use names that clearly reflect meaning and context
- Avoid abbreviations and cryptic names
- Every name must be self-explanatory
- Avoid unnecessary prefixes (`I` for interfaces, `T` for types)
- Use semantically accurate, descriptive names

### Component Standards

**Prefer design system components over manual styling:**

```tsx
// ✅ Correct: Use design system
<Button variant="primary" size="lg">
  Add to Cart
</Button>

// ❌ Incorrect: Manual className overrides
<button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-lg">
  Add to Cart
</button>
```

**Rule**: `className` is for layout (margin, flex), not style (color, border).

---

## 7. Documentation Standards

### Principle: Maximize Signal, Minimize Noise

Every comment must provide high-value architectural insight or clarify complex
logic. We trust tools to handle redundant metadata.

### File-Level Documentation

**Reserved for modules with significant architectural roles:**

```typescript
/**
 * This module centralizes all interactions with the Shopify Storefront API
 * regarding shopping cart data. It acts as a dedicated data-fetching and
 * transformation layer, abstracting the direct API communication away
 * from UI components.
 *
 * @module lib/shopify/cart
 * @see {@link https://shopify.dev/docs/api/storefront/|Shopify Storefront API Docs}
 */
```

**Anti-patterns to avoid:**

- `@file` - Redundant, tools derive this
- `@description` - Redundant, comment is the description
- `@summary` - Redundant, first sentence is the summary

### Function Documentation

**Focus on non-obvious information:**

```typescript
/**
 * Retrieves a specific cart by its ID from the Shopify Storefront API.
 * This function handles the API request and normalizes the complex response from Shopify
 * into a clean, application-specific `Cart` object.
 *
 * @param {string} id - The unique storefront ID of the cart (e.g., 'gid://...').
 * @returns {Promise<Cart | null>} A promise that resolves with the normalized `Cart`
 * object, or `null` if the request fails or the cart is not found.
 * @example
 * const myCart = await getCart('gid://shopify/Cart/abc123xyz');
 */
```

---

## 8. Performance Optimization

### React Compiler Benefits

React Compiler automatically optimizes applications at build time:

- **Eliminates manual memoization** (`useMemo`, `useCallback`)
- **Automatic optimization** of component rendering
- **Reduces cognitive overhead** - focus on building features
- **Prevents common memoization bugs**

```tsx
// ✅ With React Compiler: Simple, clean code
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

// ❌ Without React Compiler: Manual memoization required
const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  const processedData = useMemo(() => expensiveProcessing(data), [data])
  const handleClick = useCallback(item => onClick(item.id), [onClick])
  // ...existing code...
})
```

### Server Actions for Mutations

Use `'use server'` for data mutations:

```typescript
// ✅ Server Action
'use server'

export async function addToCart(productId: string, quantity: number) {
  // Secure server-side operation
  const result = await shopifyApi.addToCart({ productId, quantity })

  // Revalidate cart data
  revalidateTag('cart')

  return result
}
```

---

## 9. Reference Files

**Critical files for understanding cart functionality:**

- `src/lib/state/createCartProcess.ts` - Main cart process logic
- `src/lib/helpers/getCart.ts` - Cart data fetching
- `src/lib/state/cartStore.ts` - Cart state management
- `src/components/CartDrawer.tsx` - Cart UI component
- `src/clients/CartProcessClient.tsx` - Client-side cart integration
- `src/lib/actors/CartProcessContext.ts` - Cart context provider
- `src/components/Provider.tsx` - Global providers

These files demonstrate the architectural patterns and should be used as
reference for implementing similar features.

---

## Priority and Conflict Resolution

**If existing code conflicts with these instructions:**

- **These instructions take precedence**
- Goal is to refactor towards these standards
- Suggest improvements that align with established patterns
- Maintain consistency with the overall architecture

**Additional Resources:**

- `.github/copilot-config.md` - Full project configuration overview
- `copilot-tanstack-suspense-streaming-examples.md` - Advanced patterns
- `.github/xstate/` - State management documentation
- `.github/typescript/` - TypeScript-specific guidelines

---

## Summary

These instructions ensure:

- **Consistency** across the entire codebase
- **Performance** through modern React patterns
- **Maintainability** through clear standards
- **Scalability** through proven architectural principles
- **Type Safety** through strict TypeScript usage

Follow these guidelines without exception to build a world-class e-commerce
application.
