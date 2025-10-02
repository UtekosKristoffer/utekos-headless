# Anbefalinger for "Theme Variables"

- Dette er et annetDen Konseptuelle Forskjellen: @theme vs. :root: Dette er en
  fundamental innsikt. Dokumentet forklarer klart at @theme brukes for
  CSS-variabler som skal generere utility-klasser, mens :root brukes for vanlige
  CSS-variabler som ikke skal det. Å forstå denne intensjonen er kritisk for å
  bruke rammeverket riktig.

- Total Kontroll over Temaet (Nuking the Defaults): Dette er en
  "power-user"-funksjon. Muligheten til å nullstille et helt navneområde (f.eks.
  alle standardfarger) med --color-_: initial; er utrolig nyttig. Enda
  kraftigere er muligheten til å deaktivere hele standardtemaet med --_:
  initial; for å bygge et designsystem helt fra bunnen av.

- Sikker Variabel-Referanse med @theme inline: Dette løser et avansert, men
  vanlig problem. Når en temavariabel refererer til en annen (f.eks.
  --font-sans: var(--font-inter);), forklarer dokumentet hvorfor man må bruke
  @theme inline. Dette forhindrer subtile feil relatert til hvordan
  CSS-variabler arves og løses i DOM-treet. Dette er avgjørende kunnskap for
  alle som bygger et robust design system.

- Navneområde-Tabellen (The Namespace Table): Tabellen som lister opp alle
  navneområdene (--color-_, --font-_, --breakpoint-\*, etc.) og hvilke
  utilities/varianter de genererer, er en uvurderlig referanse. Den fungerer som
  en "Rosetta Stone" for tematisering og gjør det umiddelbart klart hvordan man
  navngir variabler for å oppnå ønsket resultat.

- Samlokaliserte Animasjoner: Muligheten til å definere @keyframes direkte inne
  i @theme sammen med den korresponderende --animate-\*-variabelen er en veldig
  ryddig måte å organisere animasjonslogikk på. Det holder alt som har med en
  spesifikk animasjon å gjøre på ett sted.
