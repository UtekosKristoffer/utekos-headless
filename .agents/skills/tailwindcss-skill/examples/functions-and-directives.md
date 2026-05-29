# SKILL: Tailwind CSS v4 Funksjoner og Direktiver - Retningslinjer og sjekkliste

Dette er en konsekvent instruks for meg selv som AI-assistent over hvordan de nye og essensielle CSS-funksjonene og direktivene i Tailwind CSS v4.0 skal benyttes.

## Hvorfor moderne direktiver og funksjoner er optimalisert

- [ ] **CSS Driven Configuration:** Konfigurasjonen for Tailwind har i v4.0 flyttet fra `tailwind.config.js` til native CSS ved hjelp av `@theme`-direktivet. Dette reduserer kompleksiteten, forbedrer developer experience og oppleves ekstremt performant i byggeprosessen.
- [ ] **Unngår duplisering (Reference Mode):** Bruk av `@reference` gir full tilgang til utility-klasser uten å bygge alle Tailwind-stilene inn i utdatafilen din. Dette er helt optimalt i komponentbaserte rammeverk (som Vue / Svelte CSS-moduler).
- [ ] **Native oversettelser:** Funksjoner som `--alpha()` og `--spacing()` lar oss koble oss direkte på Tailwinds design tokens, men blir oversatt ned til ultra-optimaliserte, native kalkuleringer som `color-mix()` og `calc()` i den produserte CSSen.

## Direktivene jeg skal forholde meg til

- **`@import "tailwindcss";`**: Hovedimporten for rammeverket (og min egen CSS-inngang).
- **`@theme {}`**: Huben for alt av Design Tokens (farger, fonter, breakpoints). Variabler defineres som `--font-display`, `--color-avocado-500` osv. CSS-konfigurasjon vinner alltid over eventuelle eldre verktøy/konfigureringsfiler.
- **`@utility <navn> {}`**: For å opprette helt custom utility-klasser (som støtter varianter som `hover:` og `md:` ut-av-boksen).
  ```css
  @utility tab-4 {
    tab-size: 4;
  }
  ```
- **`@variant` og `@custom-variant`**: Brukes for å anvende pseudo-stater eller theme-stater. `@variant dark { ... }` lar meg tvinge dark-mode selektorer i CSS, og `@custom-variant` lar meg definere egne modifikatorer (f.eks `theme-midnight:bg-black`).
- **`@source`**: Hvis en spesiell fil/mappe ikke scannes automatisk for utility-klasser, inkluderer jeg den eksplisitt slik: `@source "../ekstern-mappe";`
- **`@apply`**: Kombinerer mange existerende Tailwind-klasser i rene CSS-regler. (Men bruk det med omhu for å unngå "bloat", typisk best på eksternt påtvunget HTML hvor en ikke kan bruke utility classes).
- **`@reference`**: Avgjørende i frontend-rammeverk. Importerer hele `@theme` i `style`-blokker _uten_ å outpute styling-arkitekturen direkte og ødelegge filstørrelse. Typisk brukt slik: `@reference "../../app.css";`.

## Innebygde Tailwind-funksjoner (Funksjoner)

- **`--alpha()`**: Justering av Alpha (opacity). Oversettes automatisk til `color-mix()` under the hood. Eks: `color: --alpha(var(--color-lime-300) / 50%);`
- **`--spacing()`**: Genererer matematisk riktig avstand basert på skalaen vi jobber med (f.eks `--spacing(4)` i en `calc()`), som bygger til `calc(var(--spacing) * 4)`.

## Strenge regler for konfigurasjon (v4.0)

- [ ] **Minimaliser JavaScript-konfigurasjon:** Både plugins og konfigrasjonsfiler er støttet som legacy-kompatibilitet (`@config "../../tailwind.config.js";` og `@plugin "@tailwindcss/typography";`), men jeg _skal_ aktivt implementere konfigurasjon native i CSS med `@theme` i nye implementasjoner.
- [ ] **Safelist til v4:** I stedet for å bruke `.js`-safelist funksjonen for klasser som bygges i run-time, skal jeg heretter bruke `@source inline()` funksjonaliteten.
