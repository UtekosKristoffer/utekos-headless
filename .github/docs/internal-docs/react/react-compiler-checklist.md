# Rask beslutningsoppsummering

#### Anbefaleringer

- Ikke optimaliser før du må — jobb først med lesbar, korrekt kode.

- Bruk React Compiler som standard (i staging/test) for å slippe mye små-memo
  arbeid.

- Profilér appen (React DevTools Profiler + Lighthouse/Chrome) for å finne
  reelle flaskehalser.
- Memoiser manuelt bare når målingen viser gevinst — eller når du vet at et
  komponent-render er dyrt eller forårsaker unødvendige barnere-renders.

## Konkret sjekkliste (praktisk arbeidsflyt)

### Baseline

- Kjør appen i en production-like build og ta en profil i React DevTools (record
  interactions du bryr deg om).

- Noter komponenter med høyt render-tid eller mange gjentatte renders («wasted
  renders»).

- Slå på React Compiler (staging)

- Aktiver reactCompiler i next.config eller Babel-plugin som dere planlegger.

- Gjenta profileringen — se hva som forbedres automatisk.

### Tolk resultatene

Hvis komponenten fortsatt tar mye tid eller render veldig ofte, merk den for
manuell optimalisering.

Finner du at referanse-identitet (nye funksjoner/objekter hver render)
forårsaker unødvendige re-renders i memoiserte barn — så ta grep.

### Mål-endring-verifisering

- Legg inn React.memo, useMemo, eller useCallback der det lønner seg.

- Profilér på nytt for å bekrefte forbedring (ikke anta).

- Heuristikker — når memoisere / bruke useMemo / useCallback

- Memoisere komponent (React.memo) når:

- Komponentens render er dyr (signifikant CPU tid, tung DOM) og

Den ofte re-render uten at props endrer seg mye.

**useMemo** når:

Du har en kostbar beregning som kjøres i render (f.eks. stor transformering,
sorter/filter av store arrays).

**useCallback** når:

Du sender funksjoner ned til memoiserte barn eller til依赖 arrays i effekter som
skal være stabile for å unngå unødvendige effekter/re-renders.

**IKKE memoiser bare for «følelsen»** — unødvendig memoisering gir ekstra
kompleksitet og kan øke minnebruk/overhead.

## Praktiske advarsler / fallgruver

- Over-memoisering kan forverre ytelse (cost of memo + GC) og gjøre debugging
  verre.

- useMemo gir ikke garanti — det er en hint; stale closure-feil er vanlig hvis
  du ikke har kontroll på deps.

* React Compiler kan gi stabilitet i mange tilfeller, men er (fortsatt)
  eksperimentell i enkelte settinger — verifiser i ditt repo.

## Konkrete måle-metrikker å se etter i profiler

- Render-tid for komponent (ms). Hvis > ~5–10 ms og ofte → vurder optimering.

- Antall renders per interaksjon / per sekund. Høyt antall + lav render-kost =
  ubehagelig, men må vurderes mot faktisk gevinst.

- «Wasted renders» i React DevTools: komponenter som render uten prop-endringer.

- Kjapp handlingsplan du kan gjøre nå

* Aktiver React Compiler i staging (eller kjør Babel-plugin lokalt).

* Kjør React DevTools Profiler under realistic flows.

* Lag en kort liste (top 10) med «hot» komponenter.

## For hver:

    - Prøv React.memo eller useMemo/useCallback lokalt — re-mål.

Hvis det gir målbar forbedring → beholder. Hvis ikke → revert.

## DOKUMENT SLUTT
