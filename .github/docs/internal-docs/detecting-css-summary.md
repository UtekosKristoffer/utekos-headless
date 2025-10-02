Her er funksjonaliteten jeg har identifisert som kritisk viktig å inkludere i
ditt endelige opplæringsdokument:

# Anbefalinger for "Detecting Classes"

- Det Fundamentale Prinsippet: "Komplette klassenavn": Dokumentet hamrer inn det
  viktigste konseptet i Tailwind: Unngå dynamisk klassekonstruksjon med
  string-interpolasjon. Eksempelet som viser className={'bg-${color}-600'} som
  et anti-mønster, og className={colorVariants[color]} som den korrekte
  løsningen, er den mest essensielle lærdommen for enhver som bruker Tailwind.
  Dette forhindrer "mystiske" feil der stiler ikke dukker opp, fordi Tailwind
  aldri så det komplette klassenavnet i kildefilen.

- Den nye Konfigurasjonen med @source: Dette er den direkte erstatteren for
  content-arrayet i den gamle tailwind.config.js. Kunnskap om @source er ikke
  valgfritt, det er obligatorisk for å kunne konfigurere v4 korrekt. Spesielt
  viktig er: @source "../node_modules/...": For å inkludere klasser fra
  redjepartsbiblioteker.

  @source not "...": For å ekskludere spesifikke mapper.

  @import 'tailwindcss' source(none);: For å ta fullstendig manuell kontroll
  over hvilke filer som skannes.

- "Safelisting" med @source inline(): Dette er en utrolig kraftig og helt ny
  funksjon for meg. Muligheten til å tvinge frem generering av klasser som ikke
  finnes fysisk i koden er en perfekt "escape hatch" for innhold som kommer fra
  en database eller API.

- Avansert "Safelisting"-syntaks: Den spesifikke syntaksen for @source inline()
  er en "power-user"-funksjon som løser komplekse problemer på en elegant måte:
  - Varianter: inline("{hover:,focus:,}underline") for å generere en klasse for
    flere tilstander samtidig.

  - Områder (Ranges): inline("bg-red-{100..900..100}") for å generere en hel
    fargeskala.

  - Kombinasjonen av disse to er ekstremt effektiv for å holde CSS-filen liten,
    samtidig som man har tilgang til dynamisk nødvendige klasser.
