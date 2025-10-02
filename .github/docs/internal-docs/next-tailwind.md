# Tailwind CSS og Next.js-stylingoversikt

> Kilde: Next.js dokumentasjon

## Tailwind CSS

Tailwind CSS er et utility-first CSS-rammeverk som gir lave-nivå-klasser for å
bygge skreddersydde grensesnitt.

### Installasjon

1. Installer Tailwind CSS og PostCSS-pluginen:

   ```bash
   pnpm add -D tailwindcss @tailwindcss/postcss
   ```

2. Legg til PostCSS-pluginen i `postcss.config.mjs`:

   ```mjs
   // postcss.config.mjs
   export default {
     plugins: {
       '@tailwindcss/postcss': {}
     }
   }
   ```

3. Importer Tailwind i `app/globals.css`:

   ```css
   /* app/globals.css */
   @import 'tailwindcss';
   ```

4. Importer stilfilen i rotlayouten:

   ```tsx
   // app/layout.tsx
   import './globals.css'

   export default function RootLayout({
     children
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang='en'>
         <body>{children}</body>
       </html>
     )
   }
   ```

5. Bruk Tailwind-klasser i komponentene:

   ```tsx
   // app/page.tsx
   export default function Page() {
     return (
       <main className='flex min-h-screen flex-col items-center justify-between p-24'>
         <h1 className='text-4xl font-bold'>Welcome to Next.js!</h1>
       </main>
     )
   }
   ```

> **Nyttig å vite:** For støtte til svært gamle nettlesere, se oppsettet for
> Tailwind CSS v3.

## CSS Modules

CSS Modules gir lokal scoping ved å generere unike klassenavn, slik at samme
klasse kan brukes i flere filer uten navnekollisjoner.

### Oppsett

1. Opprett en fil med endelsen `.module.css`.
2. Importer filen i ønsket komponent under `app`-katalogen.

### Eksempel

```css
/* app/blog/blog.module.css */
.blog {
  padding: 24px;
}
```

```tsx
// app/blog/page.tsx
import styles from './blog.module.css'

export default function Page() {
  return <main className={styles.blog}></main>
}
```

## Global CSS

Global CSS kan brukes for å anvende stilregler på tvers av hele applikasjonen.

### Oppsett

1. Opprett `app/globals.css`.
2. Importer filen i rotlayouten for å gjøre stilene globale:

   ```css
   /* app/globals.css */
   body {
     padding: 20px 20px 60px;
     max-width: 680px;
     margin: 0 auto;
   }
   ```

   ```tsx
   // app/layout.tsx
   // These styles apply to every route in the application
   import './globals.css'

   export default function RootLayout({
     children
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang='en'>
         <body>{children}</body>
       </html>
     )
   }
   ```

> **Nyttig å vite:** Globale stiler kan importeres i hvilken som helst layout,
> side eller komponent i `app`-katalogen. Siden Next.js bruker React sin
> innebygde stylesheet-støtte sammen med Suspense, fjernes ikke stilark under
> navigasjon. Bruk globale stiler for faktisk globale regler, Tailwind CSS for
> komponentstil og CSS Modules for skreddersydd lokal styling.

## Eksterne stilark

Stilark (**stylesheets**) fra eksterne pakker kan importeres hvor som helst i
`app`-katalogen, inkludert kolokaliserte komponenter.

```tsx
// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='container'>{children}</body>
    </html>
  )
}
```

> **Nyttig å vite:** I React 19 kan du også bruke
> `<link rel="stylesheet" href="..." />`. Se React-dokumentasjonen for `link`
> for mer informasjon.

## Rekkefølge og sammenslåing

Next.js optimaliserer CSS i produksjonsbygget ved å automatisk splitte og slå
sammen stilark. Rekkefølgen styres av importrekkefølgen i koden.

### Eksempel

```tsx
// page.tsx
import { BaseButton } from './base-button'
import styles from './page.module.css'

export default function Page() {
  return <BaseButton className={styles.primary} />
}
```

```tsx
// base-button.tsx
import styles from './base-button.module.css'

export function BaseButton() {
  return <button className={styles.primary} />
}
```

I eksemplet over vil `base-button.module.css` lastes før `page.module.css` fordi
`BaseButton` importeres først.

## Anbefalinger

- Begrens CSS-importer til ett JavaScript- eller TypeScript-inngangspunkt.
- Importer globale stiler og Tailwind-stilark i rotlayouten.
- Bruk Tailwind CSS for de fleste stylingbehov.
- Bruk CSS Modules for komponent-spesifikke stiler der Tailwind ikke strekker
  til.
- Følg et konsekvent navnesystem, for eksempel `<navn>.module.css`.
- Ekstraher delte stiler til delte komponenter for å unngå duplikater.
- Deaktiver linters eller formaterere som auto-sorterer imports (for eksempel
  ESLint `sort-imports`).
- Konfigurer `cssChunking` i `next.config.js` ved behov for kontrollert
  CSS-splitting.

## Utvikling vs. produksjon

- Under utvikling (`next dev`) oppdateres CSS umiddelbart takket være Fast
  Refresh.
- I produksjon (`next build`) minifiseres og kodesplittes CSS automatisk for
  hver rute.
- CSS lastes uten JavaScript i produksjon, mens JavaScript trengs i utvikling
  for Fast Refresh.
- CSS-rekkefølgen kan variere mellom utvikling og produksjon; verifiser derfor
  alltid med `next build`.

---

# Tilleggsveiledning fra Tailwind CSS v4

> Kilde: Tailwind CSS v4 dokumentasjon

## Samspill mellom CSS Modules og Tailwind

Tailwind kan eksistere sammen med CSS Modules i prosjekter som allerede bruker
dem, men det anbefales å unngå kombinasjonen hvis det er mulig. CSS Modules
adresserer scoping-problemer som ikke oppstår når utility-klasser komponeres
direkte i markup.

## Scope-håndtering

Utility-klasser i Tailwind gir naturlig scoping fordi hver klasse alltid gjør
det samme, uavhengig av hvor den brukes. Dermed oppstår ingen uventede
sideeffekter når du legger til en klasse i én del av grensesnittet.

## Ytelsesbetraktninger

Byggeverktøy som Vite, Parcel og Turbopack prosesserer hver CSS Module separat.
Med mange moduler må Tailwind kjøres flere ganger, noe som kan gi tregere bygg
og en dårligere utvikleropplevelse.

## Eksplisitt deling av kontekst

Siden CSS Modules prosesseres isolert, mangler de `@theme` med mindre du
importerer en global referanse. For å bruke funksjoner som `@apply`, må du
referanseimportere globale stilark:

```css
/* Button.module.css */
@reference '../app.css';
button {
  @apply bg-blue-500;
}
```

Alternativt kan du bruke CSS-variabler for å unngå ekstra Tailwind-prosessering:

```css
/* Button.module.css */
button {
  background: var(--color-blue-500);
}
```

## Vue, Svelte og Astro

Vue, Svelte og Astro støtter `<style>`-blokker i komponenter som oppfører seg
som CSS Modules. De har dermed de samme begrensningene. Unngå `<style>`-blokker
når du bruker Tailwind, og benytt heller utility-klasser i markup.

Hvis du likevel bruker `<style>`-blokker og trenger `@apply`, må du
referanseimportere globale stiler:

```vue
<!-- Button.vue -->
<template>
  <button><slot /></button>
</template>
<style scoped>
@reference '../app.css';
button {
  @apply bg-blue-500;
}
</style>
```

Et alternativ er å bruke globalt definerte CSS-variabler for å slippe
Tailwind-prosessering:

```vue
<!-- Button.vue -->
<template>
  <button><slot /></button>
</template>
<style scoped>
button {
  background-color: var(--color-blue-500);
}
</style>
```
