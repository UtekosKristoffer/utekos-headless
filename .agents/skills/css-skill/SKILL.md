---
name: gemini-css-skill
description: Architecht for CSS relateted styling and structure. Establish constient worldclass performance with tailwindcss v4 and modern and up-to-date CSS.
---

# Gemini CSS Skill

Denne mappen inneholder destillert og systematisert kunnskap om hvordan jeg, som AI, utelukkende skal skrive og forholde meg til CSS i dette prosjektet.

## Hvordan jeg skal utvide og skreddersy Tailwind

Alltid forhold deg til beste praksis og dokumentasjonen i Tailwind CSS. Dersom jeg trenger å utvide eller skreddersy Tailwind, skal jeg alltid sjekke `tailwindcss-skill` før jeg gjetter syntax eller forsøker å løse det med inline styles.

## Rules

1. **Native CSS vinner:** Konfigurasjon skjer i `@theme`-blokken via vanlige `.css` filer, ikke lengre i tunge JavaScript-konfigurasjoner.
2. **Kutt ut ubrukte klasser:** Læren om JIT krever at strenge klassenavn er skrevet ut i full tekst form (`bg-red-500` fremfor `bg-${color}-500`).
3. **Container over Skjerm:** Så fort UI elementet er en modulær komponent (f.eks et produktkort), _bør_ responsiviteten gjerne styres fra en parent `@container` fremfor skjermen `md:`, for maksimal gjenbrukbarhet.

## Optimalisering

Alltid vurder ulike verktøy CSS-økosystemet har å by på for å løse problemer. F.eks `if()`, `animation-timeline`, `color-mix()`, `@property`, `@starting-style`, `@container`, etc. Ikke bare bruk Tailwind, men bruk det som er best for oppgaven.

## Fargehåndtering

- **Bruk alltid Tailwind-farger:** Unngå å definere egne farger med `rgb()` eller `hex` med mindre det er absolutt nødvendig. Bruk heller `oklch()` for å justere eksisterende farger.
- **Bruk `oklch()` for justeringer:** Dersom du trenger en variant av en Tailwind-farge (f.eks en mørkere eller lysere versjon), bruk `oklch()` for å justere den eksisterende fargen. Se `tailwindcss-skill/oklch.md` for mer informasjon.
- **Bruk `color-mix()` for blandinger:** Dersom du trenger å blande to Tailwind-farger, bruk `color-mix()` for å blande dem. Se `tailwindcss-skill/color-mix.md` for mer informasjon.
- **Bruk `if()` for betinget styling:** Dersom du trenger å style et element basert på en betingelse, bruk `if()` for å definere betingelsen. Se `tailwindcss-skill/if.md` for mer informasjon.

## Redirect

Checkout {PROJECT_ROOT}/.agents/skills/css-skill/examples/css-skill-color-mix.md {PROJECT_ROOT}/.agents/skills/css-skill/examples/css-skill-if.md {PROJECT_ROOT}/.agents/skills/css-skill/examples/css-skill-scroll-driven-animations.md {PROJECT_ROOT}/.agents/starting-style/examples/properties.md {PROJECT_ROOT}/.agents/starting-style/examples/web-vitals.md for en god implementasjon av fargehåndtering.
