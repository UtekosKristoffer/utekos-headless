# CSS for Web Vitals - Sjekkliste

En kort huskeliste for optimalisering av Core Web Vitals (spesielt CLS og LCP) ved hjelp av CSS og strukturelle grep:

## Layout & Innhold (CLS - Cumulative Layout Shift)

- [ ] **Unngå sent innlastet innhold som skyver siden ned:** Dette gjelder spesielt for elementer som cookie-bannere, annonser og embeds.
- [ ] **Bruk fiksert posisjonering:** Legg slike elementer (som cookie-bannere) i bunnen av skjermen med `position: fixed` eller `position: absolute`, evt. reserver fast plass (`min-height`) i layouten på forhånd.

## Bilder (LCP & CLS)

- [ ] **CSS i stedet for tunge bakgrunnsbilder (LCP):** Hvis du kan lage en effekt med ren CSS (for eksempel `linear-gradient`), bruk det i stedet for å laste ned en bildefil.
- [ ] **Angi alltid bilde-dimensjoner (CLS):** Sett eksplisitte `width` og `height` attributter på alle `<img>`-tagger, slik at nettleseren reserverer akkurat nok plass før filen lastes ferdig.

## Fonter (FCP, LCP & CLS)

- [ ] **Dropp `@import` for fonter:** Bruk av `@import url(...)` sent i stilark forsinker fontinnlastingen og utsetter First Contentful Paint.
- [ ] **Bruk `preconnect` og `<link>` i `<head>`:** Hent fonter (f.eks fra Google Fonts) så tidlig som mulig for å bygge opp siden raskt:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://.../css2?..." rel="stylesheet" />
  ```
- [ ] **Bruk fallback-fonter som ligner (CLS):** Ved font-swapping, velg en system-font som har lignende proporsjoner for å minimere hopp i layouten når tekst oppdateres.

## Animasjoner (CLS)

- [ ] **Ikke animer layout-egenskaper:** Unngå animasjoner som endrer egenskapene `margin`, `padding`, `width`, `top/left/right/bottom` og lignende. Det utløser layout-shifts hele tiden.
- [ ] **Bruk utelukkende "kompositerte" egenskaper:** Benytt alltid `transform` (f.eks. `translateX()`, `scale()`), `opacity` eller `filter` for jevne og trygge overganger.

## Kritisk CSS (LCP - Largest Contentful Paint)

- [ ] **Fjern ubrukt CSS** (Siden stilark blokkerer ("render-blocking") nedlasting/tegning til de er analysert av nettleseren).
- [ ] **Inline kritisk CSS:** Ha stiler som skal styre toppen av skjermen (above-the-fold) direkte i dokumentet.
- [ ] **Utsett ("defer") ikke-kritisk CSS:** Last ned stilark for andre seksjoner asynkront.
