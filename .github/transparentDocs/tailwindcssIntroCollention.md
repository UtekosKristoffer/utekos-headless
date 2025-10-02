# Tailwind CSS v4: Komplett Guide

## Et helhjertet forsøk

Denne filen er resultatet av et metningspunkt. Den er definert som et helhjertet
forsøk på å opprette en perfekt gjenbrukbar forklaring på arkitekturen i
Tailwind CSS v4.

**Glem ALT du har lært om det overordnede mønsteret i Tailwind CSS v3.** Du
trenger bare å mestre syntaksen. Tailwind CSS v4 er svært ukomplisert, svært
oppgradert og svært mye mer fleksibel. Vårt eneste fallgruve er din fornektelse,
så jeg kan forsøke å motivere deg med å si at det er en mye artigere miljø å
jobbe i.

---

## Fullstendig omskrevet rammeverk

Tailwind CSS v4.0 er en **fullstendig omskriving** av rammeverket fra bunnen av.
Det er nå optimalisert for å være så raskt som mulig, med mål om å oppleves mer
som CSS-native, mindre som et JavaScript-bibliotek.

Den mest imponerende forbedringen gjelder **inkrementelle bygg** som faktisk
ikke trenger å kompilere ny CSS – disse byggene er **over 100 ganger raskere**
og fullføres på millisekunder. Det er veldig mange andre ytelsesforbedringer jeg
kunne informert om, men prioriteringen må være knallhard.

---

## Grunnleggende endringer

Alt under denne setningen er **100% korrekt**. Det er avgjørende at du
anerkjenner logikken som fasit, og ikke bruker kapasitet på å være skeptisk.

### Fjerning av @tailwind-direktiver

`@tailwind`-direktivene er fjernet. I v4 importeres Tailwind ved å bruke en
simpel CSS `@import`-kommando. `@tailwind`-direktivene du brukte i v3 kan du
glemme. Den logikken er utfaset og er ikke en del av mitt prosjekt:

```diff
- @tailwind base;
- @tailwind components;
- @tailwind utilities;
+ @import "tailwindcss";
```

### CSS-først tilnærming

Den mest fundamentale endringen i v4 er kanskje at vi jobber **direkte i CSS**.
All konfigurasjon skjer i `globals.css`, og den utfasede `tailwind.config.js` er
overflødig. Den eksisterer utelukkende for å støtte bakoverkompatibilitet.

---

## @theme-direktivet: Din oppgraderte partner

`@theme`-direktivet er den eneste kilden til sannhet. Den ber Tailwind om å lage
nye utilities og varianter tilgjengelig, basert på variablene vi selv lager.

### Grunnleggende oppsett

I Tailwind CSS v4 importeres tailwindcss **ett** sted (hoved-CSS-fil), **én**
gang:

```css
/* globals.css */
@import 'tailwindcss';
```

### Definere design tokens

Bruk `@theme`-direktivet for å definere custom design tokens: fonter, farger,
breakpoints:

```css
@theme {
  --font-display: 'Satoshi', 'sans-serif';
  --breakpoint-3xl: 120rem;
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

**Alle "design tokens"** (farger, avstand, fonter, breakpoints) defineres nå som
CSS-variabler inne i et `@theme`-direktiv. Dette er vår **"Single Source of
Truth"** for design.

### Praktisk eksempel

```css
/* globals.css */
@import 'tailwindcss';

@theme {
  --font-display: 'Satoshi', 'sans-serif';
  --breakpoint-3xl: 1920px;
  --color-brand-primary: oklch(0.72 0.11 178);
}
```

Dette vil automatisk gjøre `font-display`, `3xl:`-varianten og
`bg-brand-primary` tilgjengelige i hele prosjektet.

**Eksempel i bruk:**

```html
<div class="max-w-lg 3xl:max-w-xl">
  <h1 class="font-display text-4xl">
    Data to <span class="text-brand-primary">enrich</span> your online business
  </h1>
</div>
```

---

## Moderne CSS-støtte

Tailwind CSS v4 utnytter moderne CSS-funksjoner:

- **@layer**: Gir bedre kontroll over spesifisitet og lagdeling av stiler
  (`base`, `components`, `utilities`)
- **@property**: Lar deg registrere egne CSS-variabler med innebygd syntaks og
  nettleserstøtte
- **color-mix()**: Bland farger direkte i CSS uten ekstra verktøy

### Nye visuelle og layout-funksjoner

- **Container queries**: Bygg responsive komponenter basert på
  container-størrelse, ikke bare viewport
- **3D-transform utilities**: `rotate-x/y/z`, `perspective`, m.m. → gir mer
  visuell dybde
- **Utvidede gradient-API-er**: Støtte for radial- og koniske gradienter, samt
  flere interpoleringsmoduser
- **Flere nye varianter**:
  - `not-*`-variant: Style når en tilstand _ikke_ gjelder
  - Bedre dark mode-logikk: enklere toggles, bedre defaults
  - Nye utilities: masking, text-shadow, fargede drop-shadows, mask-utilities

---

## Direktiver og utilities

### @utility-direktivet

Bruk `@utility`-direktivet for å legge til custom utilities i prosjektet.
Fungerer med varianter som `hover`, `focus` og `lg`:

```css
@utility tab-4 {
  tab-size: 4;
}
```

Du kan nå bruke `tab-4`, `hover:tab-4`, `lg:tab-4`, osv.

#### Komplekse utilities

Hvis din custom utility er mer kompleks enn én enkelt klasse, bruk nesting:

```css
@utility scrollbar-hidden {
  &::-webkit-scrollbar {
    display: none;
  }
}
```

#### Funksjonelle utilities

Du kan også registrere funksjonelle utilities som tar et argument:

```css
@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

Den spesielle `--value()`-funksjonen brukes for å hente ut utility-verdien.

### @variant-direktivet

Bruk `@variant` for å benytte en Tailwind-variant til å style CSS:

```css
.my-element {
  background: white;
  @variant dark {
    background: black;
  }
}
```

### @custom-variant-direktivet

Bruk `@custom-variant`-direktivet for å legge til custom variant i prosjektet:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Dette lar oss bruke utilities som `theme-midnight:bg-black` og
`theme-midnight:text-white`.

#### Komplekse custom variants

Når en egendefinert variant har flere regler, kan de være nestet:

```css
@custom-variant any-hover {
  @media (any-hover: hover) {
    &:hover {
      @slot;
    }
  }
}
```

### @apply-direktivet

Bruk `@apply`-direktivet for å inline eksisterende utility-klasser i din egen
custom CSS:

```css
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}
.select2-search {
  @apply rounded border border-gray-300;
}
.select2-results__group {
  @apply text-lg font-bold text-gray-900;
}
```

---

## Styling-lag med @layer

### Base styles

Hvis du bare vil sette noen standarder for siden (som tekstfarge, bakgrunnsfarge
eller fontfamilie), er det enkleste å legge noen klasser på `html`- eller
`body`-elementene:

```html
<!doctype html>
<html lang="en" class="bg-gray-100 font-serif text-gray-900">
  <!-- ... -->
</html>
```

For egne standard base-stiler for spesifikke HTML-elementer, bruk
`@layer`-direktivet:

```css
@layer base {
  h1 {
    font-size: var(--text-2xl);
  }
  h2 {
    font-size: var(--text-xl);
  }
}
```

### Component classes

Bruk `@layer components` for kompliserte klasser som du fortsatt ønsker å kunne
overstyre med utility-klasser:

```css
@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-xl);
  }
}
```

**Bruk med utilities:**

```html
<!-- Vil se ut som et kort, men med firkantede hjørner -->
<div class="card rounded-none">
  <!-- ... -->
</div>
```

`@layer components` er også godt for tilpassede stiler for
tredjeparts-komponenter:

```css
@layer components {
  .select2-dropdown {
    /* ... */
  }
}
```

---

## Avanserte utility-funksjoner

### Registrere funksjonelle utilities

For utilities som tar argumenter, bruk `--value()`-funksjonen:

```css
@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

### Matche mot theme-verdier

Bruk `--value(--theme-key-*)`-syntaksen for å løse utility-verdien mot
theme-nøkler:

```css
@theme {
  --tab-size-2: 2;
  --tab-size-4: 4;
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

Dette matcher utilities som `tab-2`, `tab-4` og `tab-github`.

### Støtte for bare verdier

For bare numeriske verdier, spesifiser datatype:

```css
@utility tab-* {
  tab-size: --value(integer);
}
```

Dette matcher utilities som `tab-1` og `tab-76`.

**Tilgjengelige bare-verdityper:** `number`, `integer`, `ratio`, `percentage`.

### Støtte for litterale verdier

For litterale verdier, bruk anførselstegn:

```css
@utility tab-* {
  tab-size: --value('inherit', 'initial', 'unset');
}
```

Dette matcher utilities som `tab-inherit`, `tab-initial` og `tab-unset`.

### Støtte for vilkårlige verdier

For vilkårlige verdier, bruk hakeparenteser:

```css
@utility tab-* {
  tab-size: --value([integer]);
}
```

Dette matcher utilities som `tab-[1]` og `tab-[76]`.

**Tilgjengelige datatyper for vilkårlige verdier:** `absolute-size`, `angle`,
`bg-size`, `color`, `family-name`, `generic-name`, `image`, `integer`, `length`,
`line-width`, `number`, `percentage`, `position`, `ratio`, `relative-size`,
`url`, `vector`, `*`.

### Kombinere flere --value()-typer

Alle tre formene kan brukes sammen:

```css
@theme {
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value([integer]);
  tab-size: --value(integer);
  tab-size: --value(--tab-size-*);
}
```

Dette gjør forskjellig behandling mulig:

```css
@utility opacity-* {
  opacity: --value([percentage]);
  opacity: calc(--value(integer) * 1%);
  opacity: --value(--opacity-*);
}
```

### Håndtere negative verdier

Registrer separate positive og negative utilities:

```css
@utility inset-* {
  inset: --spacing(--value(integer));
  inset: --value([percentage], [length]);
}

@utility -inset-* {
  inset: --spacing(--value(integer) * -1);
  inset: calc(--value([percentage], [length]) * -1);
}
```

### Modifikatorer

Bruk `--modifier()`-funksjonen for modifikatorer:

```css
@utility text-* {
  font-size: --value(--text-*, [length]);
  line-height: --modifier(--leading-*, [length], [*]);
}
```

### Håndtere brøker (fractions)

Bruk CSS `ratio`-datatype for brøker:

```css
@utility aspect-* {
  aspect-ratio: --value(--aspect-ratio-*, ratio, [ratio]);
}
```

Dette matcher utilities som `aspect-square`, `aspect-3/4` og `aspect-[7/9]`.

---

## Container-konfigurasjon

I v3 hadde container utility flere konfigurasjonsalternativer (`center`,
`padding`, etc.). Disse eksisterer ikke i v4.

For å tilpasse container utility i v4, utvid den med `@utility`-direktivet:

```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

---

## Sammendrag

Tailwind CSS v4 representerer en fundamental oppgradering:

- **CSS-først tilnærming** med `@import "tailwindcss"`
- **@theme** som Single Source of Truth for design tokens
- **Kraftige direktiver** (`@utility`, `@variant`, `@custom-variant`, `@apply`)
- **Moderne CSS-støtte** med `@layer`, `@property`, `color-mix()`
- **Avanserte utility-funksjoner** med `--value()` og `--modifier()`
- **100x raskere inkrementelle bygg**

Ved å følge prinsippet om gjenbrukbarhet blir nesten alt for lett. Tailwind CSS
v4 er designet for å være mer naturlig, kraftig og performant enn noen gang før.
