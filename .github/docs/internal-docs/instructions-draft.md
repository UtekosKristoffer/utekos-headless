---
applyTo: 'src/**/*.{ts,tsx}'
---

# Copilot Instructions: E-commerce Project (World-Class Standards)

## Prosjektregler om datakommunikasjon mellom server og klient:

### Komponenttyper:

    * Server Components (RSC): Standard for alle komponenter. Kan være `async`
      for datahenting, er sikre (API-nøkler forblir på server), og bidrar med null
      til klientens JS-pakke. De kan IKKE bruke hooks (`useState`, `useEffect`) eller
      event-handlers.

    * Client Components: For å legge til interaktivitet, bruk
      `'use client'`-direktivet øverst i filen. Dette definerer en grense; alt som
      importeres inn i denne filen blir en del av klientpakken.

### Overførbare props:

#### Data som sendes som props fra en server-komponent må være seriellbar

- Det vil si at den må være av en av følgende typer:
  - tekst
  - tall
  - rene objekter,
  - Array
  - Map
  - Date
  - FormData
  - Promise og
  - JSX. Funksjoner og klasser kan ikke sendes

### Funksjoner for data-endringer:

    * For å endre data på serveren (f.eks. ved skjema-innsending), bruk   asynkrone funksjoner som er markert for å kjøre kun der.

    * Disse kan trygt kalles fra klient-kode.

    * Data som sendes til og fra disse funksjonene må også være av en overførbar type.

## Prosjektregler om komponentmodellen: Komponentmodellen i Next.js 15 og React 19.

    * Server Components (RSC) er standarden:

    * Alle komponenter er RSCs som standard.

    * De kan være `async` for direkte datahenting, er sikre (API-nøkler forblir på server), og bidrar med null til
    klientens JS-pakke.

    * De kan IKKE bruke hooks (`useState`, `useEffect`) eller event-handlers.

    * Client Components for Interaktivitet:

    * For å legge til interaktivitet, bruk

    `'use client'`-direktivet øverst i filen.

##### Dette definerer en grense;

- Alt som importeres inn i denne filen blir en del av klientpakken.

#### 3. Når 'use client' skal brukes (uttømmende liste):

## Prosjektregler: Client Components KUN for tilstandshåndtering

    * Hooks: (`useState`),
    * Livssykluseffekter (`useEffect`),
    * Hendelseslyttere (`onClick`),
    * Nettleser-APIer,
    * Custom hooks som er avhengige av disse.

## Prosjektregler om datavalidering: Zod er 'Single Source of Truth' for DATAMODELL-VALIDERING

    * Valideringsfunksjoner skal IKKE kaste feil (throw). De skal returnere en `Either<ValidationError, SuccessType>` ved å bruke
      prosjektets `Either.tryCatch`-hjelper.

    * Den globale errorMap-en i `zodConfig.ts` er standarden for feilmeldinger.

    * Unngå inline, hardkodede feilmeldinger i skjemaer.

    * Når jeg analyserer kode, skal jeg aktivt se etter manuell validering av
      datastrukturer og valideringsfunksjoner som kaster feil, påpeke avviket og
      foreslå refaktorering til den korrekte `Either`-baserte strategien.

## Prosjektregel om datahenting og caching i next versjon 15.

    * Bruk `RSC async/await` for all initiell, read-only data som trengs for den
      første renderen av en side.

    * TanStack Query: Brukes for data som krever avansert klient-side-håndtering:
      1. caching
      2. bakgrunns refetching
      3. optimistiske oppdateringer
      4. mutasjoner.

    * Route Handlers: Brukes for å lage tradisjonelle API-endepunkter som kan
      kalles fra klienten med fetch.

### RSC async/await:

#### Brukes for all initiell, read-only data som trengs for den første renderen av en side.

#### TanStack Query: Brukes for data som krever avansert klient-side-håndtering:

      1. caching
      2. bakgrunns refetching
      3. optimistiske oppdateringer
      4. mutasjoner.

    *  Route Handlers: Brukes for å lage tradisjonelle API-endepunkter som kan kalles fra klienten med fetch.

# Instruction for Copilot

## 1. Kodekvalitet og semantikk:

- Du skal du opptre som en seniorutvikler med ekspertise i Next.js 15 App Router
  og avansert TanStack Query v5-integrasjon.
- Du skal være dedikert å utvikle kodeforslag av en kvalitet som er på
  verdensklasse-nivå og sørge for at i henhold til prosjektets retningslinjer.

## 2. Naming Quality and Semantics

- Use names that clearly reflect their meaning and context, as a world-class
  developer would.

- Avoid abbreviations and cryptic names. Every name must be self-explanatory.

- **Use English for all names, comments, and documentation.** This is the
  project standard.

- Avoid unnecessary prefixes like `I` for interfaces or `T` for types.

- Use semantically accurate, descriptive names that are idiomatic within modern
  frontend development.

* **Project:** Headless e-commerce (Shopify).
* **Framework:** Next.js version `15.5.5` (App Router).
* **React:** version `19.1.0`.
* **Language:** TypeScript version `5.9.2`
* See file copilot-config.md for a full overview over the projects configuration
  and used packages.

---

## 2. Architectural Principles (Unyielding Rules)

These are the three laws of our architecture. All code must respect them.

1.  **Rendering: Server-First.** Server Components (RSC) are the default for
    data loading and UI. Client Components (`'use client'`) are used **only**
    for interactivity.
2.  **Data Flow: Unidirectional & Server-Driven.** Client interactions trigger
    Server Actions. The server is the Single Source of Truth and updates the UI
    by revalidating data (`revalidateTag`).
3.  **Streaming** and **Suspense** must be implemented to to break down a route
    into smaller "chunks" and progressively stream them from the server to the
    client as they become ready.
4.  **Compiler: Trust the React Compiler.** Write simple, readable code. **Avoid
    manual memoization** like `useCallback` and `useMemo`.

---

## 3. Style Guide and Patterns

### Code Quality

1. **TypeScript:**

- No `any`,
- `use strict types`,
- `verbatimModuleSyntax`: true,
- `moduleDetection`: "force",
- `noUncheckedSideEffectImports`: true,
- `exactOptionalPropertyTypes`: true, `noUncheckedIndexedAccess`: true

2. **Components:**

Prefer using the design system's components (e.g., `<Button variant="default">`)
over overriding with long, manual `className` strings. `className` is for layout
(margin, flex), not style (color, border).

3. **Priority:**

- If you see existing code that conflicts with these instructions, these
  instructions take precedences

- Your goal is to help refactor towards these standards.

---

3. Stilguide og Mønstre Kodekvalitet TypeScript: Ingen any, bruk strenge typer,
   verbatimModuleSyntax: true, moduleDetection: "force",
   noUncheckedSideEffectImports: true, exactOptionalPropertyTypes: true,
   noUncheckedIndexedAccess: true.

Komponenter: Foretrekk å bruke designsystemets komponenter (f.eks.
<Button variant="default">) fremfor å overstyre med lange, manuelle
className-strenger. className er for layout (margin, flex), ikke stil (farge,
border).

Prioritet: Hvis du ser eksisterende kode som er i konflikt med disse
instruksjonene, har disse instruksjonene forrang. Målet ditt er å hjelpe til med
å refaktorere mot disse standardene.

---

### REACT COMPILOR

`reactCompiler`: React Compiler automatically optimizes the application at build
time. React is often fast enough without optimization, but sometimes you need to
manually memoize components and values to keep your app responsive.

This manual memoization is tedious, easy to get wrong, and adds extra code to
maintain.

React Compiler does this optimization automatically for you, freeing you from
this mental burden so you can focus on building features.

So reactCompiler improves performance by automatically optimizing component
rendering. Eliminates our need for manual memoization with `useMemo` and
`useCallback`.

---

## COPILOT INSTRUCTIONS END
