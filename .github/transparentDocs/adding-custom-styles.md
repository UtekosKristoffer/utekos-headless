# Å legge til egendefinerte stiler

## En del av kjernekonseptene

Beste praksis for å legge til egne tilpassede stiler i Tailwind-prosjekter.

Ofte er den største utfordringen når man jobber med et rammeverk å finne ut hva
man skal gjøre når det er noe man trenger som rammeverket ikke håndterer for
deg.

Tailwind er designet helt fra bunnen av for å være utvidbart og tilpassbart,
slik at uansett hva du bygger, skal du aldri føle at du jobber mot rammeverket.

Denne guiden dekker emner som å tilpasse dine design-tokens, hvordan du kan
bryte ut av disse rammene når det er nødvendig, legge til din egen tilpassede
CSS, og utvide rammeverket med plugins.

---

## Å tilpass temaet ditt

Hvis du vil endre ting som fargepaletten, avstandsskalaen, typografiskalaen
eller breakpoints, legg til tilpasningene dine ved å bruke `@theme`-direktivet i
CSS-en din:

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
  /* ... */
}
```

---

## Å bruke vilkårlige verdier

Selv om du vanligvis kan bygge det meste av et gjennomarbeidet design ved hjelp
av et begrenset sett med design-tokens, trenger du av og til å bryte ut av disse
rammene for å få ting pixel-perfekt.

Når du virkelig trenger noe som `top: 117px` for å plassere et bakgrunnsbilde
helt riktig, bruk Tailwinds notasjon med firkantede parenteser (square bracket
notation) for å generere en klasse på farten med hvilken som helst vilkårlig
verdi:

```html
<div class="top-[117px]">
  <!-- ... -->
</div>
```

Dette er i bunn og grunn likt inline-stiler, med den store fordelen at du kan
kombinere det med interaktive modifikatorer som `hover` og responsive
modifikatorer som `lg`:

```html
<div class="top-[117px] lg:top-[344px]">
  <!-- ... -->
</div>
```

Dette fungerer for alt i rammeverket, inkludert ting som bakgrunnsfarger,
skriftstørrelser, pseudo-elementers innhold og mer:

```html
<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
  <!-- ... -->
</div>
```

Hvis du refererer en CSS-variabel som en vilkårlig verdi (arbitrary value), kan
du bruke syntaksen for egendefinert property:

```html
<div class="fill-[--my-brand-color] ...">
  <!-- ... -->
</div>
```

Dette er bare en stenografi for `fill-[var(--my-brand-color)]` som legger til
`var()`-funksjonen for deg automatisk.

---

## Vilkårlige egenskaper

Hvis du noen gang trenger å bruke en CSS-egenskap som Tailwind ikke har en
utility for «out of the box», kan du også bruke notasjon med firkantede
parenteser for å skrive helt vilkårlig CSS:

```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```

Dette er virkelig som inline-stiler, men igjen med fordelen at du kan bruke
modifikatorer:

```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```

Dette kan være nyttig for ting som CSS-variabler også, spesielt når de må endre
seg under forskjellige forhold:

```html
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
  <!-- ... -->
</div>
```

---

## Vilkårlige varianter

Vilkårlige varianter ligner vilkårlige verdier, men brukes for å gjøre
selektorendringer på farten — tilsvarende det du kan gjøre med innebygde
pseudo-klassevarianter som `hover:{utility}` eller responsive varianter som
`md:{utility}`, men ved å bruke notasjon med firkantede parenteser direkte i
HTML-en.

```html
<ul role="list">
  {#each items as item}
  <li class="lg:[&:nth-child(-n+3)]:hover:underline">{item}</li>
  {/each}
</ul>
```

---

## Håndtere mellomrom

Når en vilkårlig verdi må inneholde et mellomrom, bruk en understrek (`_`) i
stedet — Tailwind konverterer automatisk understreken til et mellomrom ved
byggetid:

```html
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>
```

I situasjoner hvor understreker er vanlige, men mellomrom er ugyldige (for
eksempel i URL-er), vil Tailwind bevare understreken i stedet for å konvertere
den:

```html
<div class="bg-[url('/what_a_rush.png')]">
  <!-- ... -->
</div>
```

Hvis du bruker noe som JSX hvor bakstreken blir fjernet fra den rendrede
HTML-en, bruk `String.raw()` slik at bakstreken ikke behandles som et
JavaScript-escape-tegn:

```jsx
<div className={String.raw`before:content-['hello\_world']`}>
  <!-- ... -->
</div>
```

---

## Løse tvetydigheter

Mange utilities i Tailwind deler et felles navnerom, men mapper til forskjellige
CSS-egenskaper. For eksempel deler `text-lg` og `text-black` begge
`text-`-navnerommet, men det ene er for `font-size` og det andre er for `color`.

Når du bruker vilkårlige verdier, kan Tailwind generelt håndtere denne
tvetydigheten automatisk basert på verdien du sender inn:

```html
<!-- Vil generere en font-size utility -->
<div class="text-[22px]">...</div>

<!-- Vil generere en color utility -->
<div class="text-[#bada55]">...</div>
```

Noen ganger er det virkelig tvetydig, for eksempel når du bruker CSS-variabler:

```html
<div class="text-[--my-var]">...</div>
```

I disse situasjonene kan du "hinteom den underliggende typen til Tailwind ved å
legge til en CSS-datatype før verdien:

```html
<!-- Vil generere en font-size utility -->
<div class="text-[length:--my-var]">...</div>

<!-- Vil generere en color utility -->
<div class="text-[color:--my-var]">...</div>
```

---

## Bruke tilpasset CSS

Selv om Tailwind er designet for å håndtere hoveddelen av dine styling-behov, er
det ingenting som stopper deg fra å bare skrive vanlig CSS når du trenger det:

```css
@import 'tailwindcss';

.my-custom-style {
  /* ... */
}
```

---

## Legge til grunnleggende stiler

Hvis du bare vil sette noen standardinnstillinger for siden (som tekstfarge,
bakgrunnsfarge eller skriftfamilie), er det enkleste alternativet å bare legge
til noen klasser til `html`- eller `body`-elementene:

```html
<!doctype html>
<html lang="en" class="bg-gray-100 font-serif text-gray-900">
  <!-- ... -->
</html>
```

Dette holder dine grunnleggende styling-beslutninger i markeringen din sammen
med alle dine andre stiler, i stedet for å skjule dem i en separat fil.

Hvis du vil legge til dine egne standard grunnstiler for spesifikke
HTML-elementer, bruk `@layer`-direktivet for å legge disse stilene til Tailwinds
base-lag:

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

---

## Legge til komponentklasser

Bruk components-laget for mer kompliserte klasser du vil legge til prosjektet
ditt som du fortsatt vil kunne overstyre med utility-klasser.

Tradisjonelt ville disse være klasser som `card`, `btn`, `badge` — den typen
ting.

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

Ved å definere komponentklasser i components-laget kan du fortsatt bruke
utility-klasser for å overstyre dem når det er nødvendig:

```html
<!-- Vil se ut som et kort, men med rette hjørner -->
<div class="card rounded-none">
  <!-- ... -->
</div>
```

Ved å bruke Tailwind trenger du sannsynligvis ikke disse typene klasser så ofte
som du tror. Les vår guide om håndtering av duplisering for våre anbefalinger.

Components-laget er også et godt sted å putte tilpassede stiler for eventuelle
tredjepartskomponenter du bruker:

```css
@layer components {
  .select2-dropdown {
    /* ... */
  }
}
```

---

## Bruke varianter

Bruk `@variant`-direktivet for å anvende en Tailwind-variant innenfor tilpasset
CSS:

```css
/* app.css */
.my-element {
  background: white;
  @variant dark {
    background: black;
  }
}

/* Kompilert CSS */
.my-element {
  background: white;
}

@media (prefers-color-scheme: dark) {
  .my-element {
    background: black;
  }
}
```

Hvis du trenger å anvende flere varianter samtidig, bruk nesting:

```css
.my-element {
  background: white;
  @variant dark {
    @variant hover {
      background: gray;
    }
  }
}
```

---

## Legge til tilpassede utilities

### Enkle utilities

I tillegg til å bruke utilities som kommer med Tailwind, kan du også legge til
dine egne tilpassede utilities. Dette kan være nyttig når det er en CSS-funksjon
du vil bruke i prosjektet ditt som Tailwind ikke inkluderer utilities for "out
of the box".

Bruk `@utility`-direktivet for å legge til en tilpasset utility til prosjektet
ditt:

```css
@utility content-auto {
  content-visibility: auto;
}
```

Du kan nå bruke denne utility-en i HTML-en din:

```html
<div class="content-auto">
  <!-- ... -->
</div>
```

Den vil også fungere med varianter som `hover`, `focus` og `lg`:

```html
<div class="hover:content-auto">
  <!-- ... -->
</div>
```

Tilpassede utilities blir automatisk satt inn i utilities-laget sammen med alle
de innebygde utilities i rammeverket.

### Komplekse utilities

Hvis din tilpassede utility er mer kompleks enn et enkelt klassenavn, bruk
nesting for å definere utility-en:

```css
@utility scrollbar-hidden {
  &::-webkit-scrollbar {
    display: none;
  }
}
```

### Funksjonelle utilities

I tillegg til å registrere enkle utilities med `@utility`-direktivet, kan du
også registrere funksjonelle utilities som aksepterer et argument:

```css
@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

Den spesielle `--value()`-funksjonen brukes for å løse utility-verdien.

#### Matche temaverdier

Bruk `--value(--theme-key-*)`-syntaksen for å løse utility-verdien mot et sett
med temanøkler:

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

Dette vil matche utilities som `tab-2`, `tab-4` og `tab-github`.

#### Bare verdier

For å løse verdien som en bar verdi, bruk `--value({type})`-syntaksen, hvor
`{type}` er datatypen du vil validere den bare verdien som:

```css
@utility tab-* {
  tab-size: --value(integer);
}
```

Dette vil matche utilities som `tab-1` og `tab-76`.

Tilgjengelige bare verdi-datatyper er: `number`, `integer`, `ratio` og
`percentage`.

#### Litterale verdier

For å støtte litterale verdier, bruk `--value('literal')`-syntaksen (legg merke
til anførselstegnene):

```css
@utility tab-* {
  tab-size: --value('inherit', 'initial', 'unset');
}
```

Dette vil matche utilities som `tab-inherit`, `tab-initial` og `tab-unset`.

#### Vilkårlige verdier

For å støtte vilkårlige verdier, bruk `--value([{type}])`-syntaksen (legg merke
til de firkantede parentesene) for å fortelle Tailwind hvilke typer som støttes
som en vilkårlig verdi:

```css
@utility tab-* {
  tab-size: --value([integer]);
}
```

Dette vil matche utilities som `tab-[1]` og `tab-[76]`.

Tilgjengelige vilkårlige verdi-datatyper er: `absolute-size`, `angle`,
`bg-size`, `color`, `family-name`, `generic-name`, `image`, `integer`, `length`,
`line-width`, `number`, `percentage`, `position`, `ratio`, `relative-size`,
`url`, `vector` og `*`.

Du kan kombinere flere `--value()`-typer for å støtte forskjellige input-typer:

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

Dette gjør det mulig å behandle verdien forskjellig i hvert tilfelle om
nødvendig, for eksempel oversette et bare heltall til en prosentandel:

```css
@utility opacity-* {
  opacity: --value([percentage]);
  opacity: calc(--value(integer) * 1%);
  opacity: --value(--opacity-*);
}
```

`--value()`-funksjonen kan også ta flere argumenter og løse dem fra venstre til
høyre hvis du ikke trenger å behandle returverdien forskjellig i forskjellige
tilfeller:

```css
@theme {
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value(--tab-size-*, integer, [integer]);
}

@utility opacity-* {
  opacity: calc(--value(integer) * 1%);
  opacity: --value(--opacity-*, [percentage]);
}
```

#### Negative verdier

For å støtte negative verdier, registrer separate positive og negative utilities
i separate deklarasjoner:

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

#### Modifikatorer

Modifikatorer håndteres ved hjelp av `--modifier()`-funksjonen som fungerer
akkurat som `--value()`-funksjonen, men opererer på en modifikator hvis den er
tilstede:

```css
@utility text-* {
  font-size: --value(--text-*, [length]);
  line-height: --modifier(--leading-*, [length], [*]);
}
```

Hvis en modifikator ikke er tilstede, blir ikke eventuelle deklarasjoner som
avhenger av en modifikator inkludert i utdataene.

#### Brøker

For å håndtere brøker, stoler vi på CSS ratio-datatypen. Hvis denne brukes med
`--value()`, er det et signal til Tailwind om å behandle verdien og
modifikatoren som en enkelt verdi:

```css
@utility aspect-* {
  aspect-ratio: --value(--aspect-ratio-*, ratio, [ratio]);
}
```

Dette vil matche utilities som `aspect-square`, `aspect-3/4` og `aspect-[7/9]`.

---

## Legge til tilpassede varianter

I tillegg til å bruke variantene som kommer med Tailwind, kan du også legge til
dine egne tilpassede varianter ved hjelp av `@custom-variant`-direktivet:

```css
@custom-variant theme-midnight {
  &:where([data-theme='midnight'] *) {
    @slot;
  }
}
```

Nå kan du bruke `theme-midnight:<utility>`-varianten i HTML-en din:

```html
<html data-theme="midnight">
  <button class="theme-midnight:bg-black ..."></button>
</html>
```

Du kan lage varianter ved hjelp av stenografi-syntaksen når nesting ikke er
nødvendig:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Når en tilpasset variant har flere regler, kan de nestes innenfor hverandre:

```css
@custom-variant any-hover {
  @media (any-hover: hover) {
    &:hover {
      @slot;
    }
  }
}
```
