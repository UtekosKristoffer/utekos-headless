# SKILL: Tailwind CSS Utility-first Styling - Retningslinjer og sjekkliste

Dette er en konsekvent instruks og huskeliste for meg selv som AI-assistent for den konseptuelle "utility-first" arbeidsmetodikken i Tailwind CSS v4.

## Hvorfor det er performant og optimalt

- [ ] **Visuell konsistens (Constraints):** I motsetning til inline-styles (`style="padding: 14px"`), tvinger utility-klasser frem bruken av faste matematiske skalaer (`p-4` = 1rem). Dette garanterer at designet er pixel-perfekt og proporsjonalt tvers over hele nettsiden, uten "magic numbers".
- [ ] **Variabler for CSS filters/transforms:** Sammensatte klasser (som `blur-sm grayscale gradient-to-r`) knuser ikke hverandre, fordi Tailwind utnytter et ekstremt smart sett med CSS-variabler for komponerbare "filer"- og "transform"-stiler bak kulissene.
- [ ] **Ekstremt liten CSS fil:** Ved å gjenbruke de samme prmitive klassene (`flex`, `pt-4`, `text-center`) over hele prosjektet, stanser veksten av CSS-størrelsen i prosjektet etter hvert som applikasjonen vokser.

## Hvordan jeg skal skrive og styre utility classes på optimal måte

### 1. Style _virkelig_ alt med unike utility klasser

Alt fra farger, grid til pseudo-states skal bykkes med utilities direkte.

- **Pseudo-States (State Variants):** `hover:bg-sky-700`, `focus:ring`, `active:bg-purple-700`.
- **Media/Dark-mode:** `md:flex`, `dark:bg-gray-800`.
- **Kombinering (Stacking) av modifiers:** `disabled:hover:bg-sky-500`, eller superavanserte som `dark:lg:data-current:hover:bg-indigo-600`.

### 2. Løse duplisering på RIKTIG måte

Mange (og tidvis rotete) klasser er _by design_. Duplisering løses slik, i prioritert rekkefølge:

- [ ] **Looping/Struktur:** Gjentakende innhold skal løses i HTML-templaten/skriptet sitt med en `for`-løkke eller React `.map()`.
- [ ] **Komponenter:** Hvis et UI-element brukes tvers av applikasjonen, ekstraher det til én funksjonell React/Vue-komponent (`<Button>`) Fremfor å lage `.btn` i CSS.
- [ ] **Bruk `@layer components` KUN som siste utvei:** Hvis prosjektet IKKE bruker React/Vue (f.eks ren HTML/Twig), da kan `components`-layeret i standard oppsettet brukes.

### 3. Avansert CSS via Tailwind selektorer

Tailwind har modifiers for alt, slik at jeg aldri trenger å forlate HTML-strengen selv for avanserte CSS-krav.

- **Group modifiers (Påvirke barn ved parent hover):** Sett klassen `group` på forelderen, og `group-hover:xyz` på barna. Kan krydres med modifiers (`group-focus`, etc).
- **Arbitrary Variants (Custom selektorer):** Skriv enhver tillatt vanilla-CSS-selektor rett i firkantparenteser. (f.eks: `[&>[data-active]+span]:text-blue-600` for å style en span ut fra aktivitet pø siblingen).

### 4. Løse styling-konflikter og "important"

Mekanikken "Last defined style wins" er CSS-standard. Hvis en komponent mottar konflikterende klasser (som både `flex` og `grid`), er det den siste som ligger definert i det genererte stilarket som vinner, _ikke_ rekkefølgen i class-strengen.

- **Unngå to av samme:** Det brukes betinget (conditional) logikk (f.eks i React/JS) til å fjerne overflødige klasser i stedet for å tvinge dem inn mot hverandre med et håp om at siste vinner.
- **Tvinge overrides (Important flaguet `!`):** Om et utvidet framework overstyrer klasser og eg trenger !important for å vinne, bruker jeg et utropstegn _bak_ Tailwind klassen (`bg-red-500!`). Dette oversetter internt til `background-color: ... !important`. Legg merke til at utropstegnet plasseres sist i v4, ikke først.
