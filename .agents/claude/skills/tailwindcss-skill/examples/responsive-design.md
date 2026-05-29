# SKILL: Tailwind CSS Responsivt Design & Container Queries

Dette er en konsekvent instruks og huskeliste for meg selv som AI-assistent for håndtering av mobil-, skjerm- og container-basert responsivitet i Tailwind CSS v4.

## Hvorfor det er performant og optimalt

- [ ] **Mobile-First og Minimal Media-Query-Bloat:** Siden all styling per definisjon starter fra `mobil-først`, tvinges koden til kun å legge til komplekse layout-regler når skjermen blir større (via `sm:`, `md:` osv). Nettleseren slipper å overstyre komplekse desktop-regler på små, mindre kraftige mobilenheter.
- [ ] **Container Queries on-the-fly:** Muligheten for `@container` eliminerer gigantiske og skjøre CSS media-queries som prøver å gjette layouten ut fra skjermbredde, når det man egentlig bryr seg om er bredden til foreldre-elementet (`parent`). Modulære UI-komponenter blir genuint uavhengige av hvor de plasseres på siden.

## Hvordan jeg skal bygge Responsiv Layout

### 1. Mobile-First Tenkemåte (Viktig!)

Jeg skal _alltid_ style mobile-viewet først. `sm:` betyr IKKE "small screens/mobile". Det betyr "På skjermer _større_ enn small (640px) og oppover".

- **Feil:** `<div class="sm:text-center">` (Dette sentrerer _ikke_ tekst på mobil, bare tablet og opp).
- **Riktig:** `<div class="text-center sm:text-left">` (Sentrerer som default på mobil, venstrestiller på tablet/desktop).

### 2. Skjerm-breakpoints (`md:`, `lg:` osv)

Standard breakpoints er `sm`, `md`, `lg`, `xl` og `2xl`.
Bruk prefiksen kombinert med klassen: `md:w-32`, `lg:flex`.

- **Spesifikke "Spenn" (Ranges):** Ønsker du å begrense en regel til et spesifikt hull mellom to skjermstørrelser, stack modifikatorer med resulterende `max-*` for å hindre cascading oppover:
  ```html
  <div class="md:max-xl:flex">
    <!-- Flex kun mellom md (768px) og xl (1280px) -->
  </div>
  ```

### 3. Container Queries (`@container` og `@md:`)

Dette MÅ brukes aktivt for modulære kort og UI elementer som kan havne både i vide kolonner og smale sidebars.

- **Definere containeren:** Foreldre-elementet _må_ flagges med `@container`.
- **Styre innholdet:** Barnestiler bruker `@`-prefikset (f.eks `@sm:`, `@max-md:`).
  ```html
  <div class="@container">
    <div class="flex flex-col @md:flex-row">
      <!-- Stabler vertikalt når containeren er smal, side-ved-side når containeren blir over medium størrelse. Skjermbredden er uvesentlig. -->
    </div>
  </div>
  ```
- **Fjerne tvetydighet med Navngitte Containere:** Hvis du har nøstede containere, gi dem navn: `@container/main`. Barna refererer til den: `@sm/main:flex-col`.

### 4. Custom Breakpoints og verdier

Hvis standardavstander ikke strekker til, implementer overrides elegant uten å ødelegge rammeverket.

- **Arbitrary breakpoints on-the-fly:** `max-[600px]:bg-sky-300` (Ikke anbefalt som standard, men genuint hjelpsomt ved unntak).
- **Legge til / endre faste breakpoints (CSS):**
  ```css
  @theme {
    /* MÅ settes i rem (Tailwind default) for ikke å avstedkomme CSS-sorteringsfeil! */
    --breakpoint-xs: 30rem;
  }
  ```

## Strenge regler jeg skal forholde meg til

- [ ] **Bruk Alltid Mobile-First:** Unprefixed klasser = Mobil. Prefixed klasser = Tablet/Desktop. Ingen unntak.
- [ ] **Hold the Rem-line:** Egendefinerte breakpoints eller containersizes spesifisert i `@theme` _skal_ alltid benytte `rem` og ikke `px`, for å holde rammeverket i vater med alt annet som bygges på standard property verdier.
