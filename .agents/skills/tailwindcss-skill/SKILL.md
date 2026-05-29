---
name: tailwindcss-skill
description:
  Orkestrator for Tailwind CSS relatert styling, struktur og oppsett i
  prosjektet. Sikrer konsistent, topp-ytelse kode i v4.0+.
---

# TailwindCSS Skill

Denne mappen inneholder destillert og systematisert kunnskap om hvordan jeg, som
AI, utelukkende skal skrive og forholde meg til Tailwind CSS (spesifikt moderne
v4-konsepter) i dette prosjektet.

Slik tailwind-rammeverket er bygget opp (spesielt i den nyeste versjonen), er
det fullt av kraftige ytelsesfordeler, men _kun_ hvis reglene i disse
instruksene følges slavisk. Hvis de brytes (ved å f.eks. benytte feil
string-interpolering eller skrive dupliserende CSS), de-optimeres prosjektets
bundle-størrelse betydelig.

## Hvordan jeg orkestrerer kunnskapen her inne

Når jeg møter ulike problemstillinger eller får i oppgave å style applikasjoner
her, skal jeg støtte meg på og lese følgende instruks-filer for å "huske"
nøyaktig syntaks og konvensjon før jeg utfører koden:

- **Styling Methodikk:** Referer til `example-styling-with-utility-classes.md`
  for regler om dupliseringshåndtering, utility-first tilnærming, og
  konfliktløsing (inkludert `!important` på slutten av klassen i v4).
- **Justering av Farger:** Sjekk `colors.md` for å se hvordan man bruker
  fargevariabler med gjennomsiktighet (via `--alpha()`) direkte i native CSS
  uten hardkoding.
- **Utvidelser og Egendefinert CSS:** Slå opp i `custom-styles.md` for regler
  rundt `Arbitrary Values` (`w-[14px]`) i HTML og det å skrive custom klasser
  via `@utility`.
- **Oppsett av Theme / Design Tokens:** Se i `theme-variables-start.md` før jeg
  endrer breakpoints, farger eller spacing. Her lærer jeg at `@theme` i CSS nå
  brukes i v4 fremfor eldre `tailwind.config.js`.
- **Integrere Vue/Svelte eller importere Tailwind:** Lær direktivene
  (`@reference`, `@config`, `@source`) samt funksjoner i
  `functions-and-directives.md`. Null behov for å bygge tung CSS-overhode lokalt
  i komponentfiler.
- **Dynamiske Klasser og Bygging (JIT):** Av kritisk betydning; _ALLTID_ les
  `detecting-classes-in-source-file.md` før jeg forøker meg på
  string-interpolation. Fullstendige strenger er påkrevd. Regler for `Safelist`
  inline finnes her!
- **Mobiltilpasning:** Sjekk `responsive-design.md` for regler om
  _Mobile-First_, custom ranges (eks `md:max-lg:flex`), samt ekstremt kraftige
  _Container Queries_ (`@container`).
- **Nye prosjekter:** For ferske Next.js oppsett, se
  `tailwind-install-next-js.md` for bruk av `@tailwindcss/postcss`.
- **Dypere kunnskap:** Se `resources.md` for direkte-lenker til v4
  dokumentasjonen dersom problemstillingen krever offisiell lesning.

## Mine Generelle Regler (Gjelder overalt)

1. **Native CSS vinner:** Konfigurasjon skjer i `@theme`-blokken via vanlige
   `.css` filer, ikke lengre i tunge JavaScript-konfigurasjoner.
2. **Kutt ut ubrukte klasser:** Læren om JIT krever at strenge klassenavn er
   skrevet ut i full tekst form (`bg-red-500` fremfor `bg-${color}-500`).
3. **Container over Skjerm:** Så fort UI elementet er en modulær komponent
   (f.eks et produktkort), _bør_ responsiviteten gjerne styres fra en parent
   `@container` fremfor skjermen `md:`, for maksimal gjenbrukbarhet.
