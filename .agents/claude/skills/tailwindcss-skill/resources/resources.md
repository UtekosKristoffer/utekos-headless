# SKILL: Tailwind CSS Dokumentasjon (Referansebibliotek)

Dette er mitt eget referansebibliotek for Tailwind CSS. Hvis jeg er usikker på noe rundt "Core Concepts", "Layout", "Sizing" eller detaljer rundt CSS i prosjektet, sjekker jeg disse kildene _før_ jeg gjetter syntax eller forsøker å løse det med inline styles.

## Hvorfor det er optimalt

- **Aktuell kildekode:** Tailwind v4 introduserte store endringer i arkitektur, CSS `@theme` vars, og compiler. Referansene under peker alltid til oppdatert oppførsel i rammeverket, slik at jeg unngår utdaterte "v3-hacks" med `tailwind.config.js`.

## Referanseliste

### V4 Upgrade og Core

- **Upgrade Guide:** https://tailwindcss.com/docs/upgrade-guide
- **Dark Mode:** https://tailwindcss.com/docs/dark-mode
- **Theme Variables:** https://tailwindcss.com/docs/theme
- **Source Detection:** https://tailwindcss.com/docs/detecting-classes-in-source-files
- **Core Styling Concepts:** https://tailwindcss.com/docs/styling-with-utility-classes
- **Colors:** https://tailwindcss.com/docs/colors
- **Custom Styles:** https://tailwindcss.com/docs/adding-custom-styles
- **Responsive Design:** https://tailwindcss.com/docs/responsive-design
- **Functions & Directives:** https://tailwindcss.com/docs/functions-and-directives

### Praktisk Styling og Verdier

Dersom jeg er usikker på navngivning av utility-klasser for spesifikke CSS-egenskaper:

- **Base Styles:** https://tailwindcss.com/docs/preflight
- **Layout (Grid/Flex/Box):** _Søk på tailwindcss.com/docs/[egenskap] (f.eks `aspect-ratio`, `grid-template-columns`, `display`)_
- **Sizing (W/H/Inline/Block):** _Søk på tailwindcss.com/docs/width, height, etc._
- **Backgrounds & Filters:** _Søk på tailwindcss.com/docs/background-color, filter-blur, backdrop-filter-blur_
- **Typografi:** _Søk på tailwindcss.com/docs/font-family, text-align, line-clamp_
- **Animering:** _Søk på tailwindcss.com/docs/transition-property, animation_
- **Interaktivitet (Hover/Focus etc):** https://tailwindcss.com/docs/hover-focus-and-other-states

_(Hold denne listen kort – jeg kan stort sett søke opp eller dedusere navnet på de fleste utilities automatisk, men jeg bør spesielt støtte meg på "Core"-linkene øverst for arkitektoniske valg i v4)._
