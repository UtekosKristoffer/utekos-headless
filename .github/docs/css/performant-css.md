---
title: CSS ytelsesoptimalisering
short-title: Ytelsesfremmende CSS
slug: Learn_web_development/Extensions/Performance/CSS
page-type: learn-module-chapter
sidebar: learnsidebar
---

{{PreviousMenuNext("Learn_web_development/Extensions/Performance/html", "Learn_web_development/Extensions/Performance/business_case_for_performance", "Learn_web_development/Extensions/Performance")}}

Når du utvikler et nettsted, må du vurdere hvordan nettleseren håndterer CSS-en
på nettstedet ditt. For å redusere eventuelle ytelsesproblemer som CSS kan
forårsake, bør du optimalisere den. For eksempel bør du optimalisere CSS-en for
å redusere [render-blocking](/en-US/docs/Glossary/Render_blocking) og minimere
antall nødvendige reflows. Denne artikkelen veileder deg gjennom sentrale
teknikker for CSS-ytelsesoptimalisering.

<table>
  <tbody>
    <tr>
      <th scope="row">Forutsetninger:</th>
      <td>
        <a
          href="/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software"
          >Grunnleggende programvare installert</a
        >, og grunnleggende kunnskap om
        <a href="/en-US/docs/Learn_web_development/Getting_started/Your_first_website"
          >klient-side webteknologier</a
        >.
      </td>
    </tr>
    <tr>
      <th scope="row">Mål:</th>
      <td>
        Å lære om virkningen av CSS på nettstedets ytelse
        og hvordan du kan optimalisere CSS-en din for å forbedre ytelsen.
      </td>
    </tr>
  </tbody>
</table>

## Å optimalisere eller ikke optimalisere

Det første spørsmålet du bør svare på før du begynner å optimalisere CSS-en din
er "hva trenger jeg å optimalisere?". Noen av tipsene og teknikkene som
diskuteres nedenfor er god praksis som vil være til nytte for nesten ethvert
webprosjekt, mens andre bare er nødvendige i visse situasjoner. Å prøve å
anvende alle disse teknikkene overalt er sannsynligvis unødvendig, og kan være
bortkastet tid. Du bør finne ut hvilke ytelsesoptimaliseringer som faktisk er
nødvendige i hvert prosjekt.

For å gjøre dette, må du
[måle ytelsen](/en-US/docs/Learn_web_development/Extensions/Performance/Measuring_performance)
til nettstedet ditt. Som den forrige lenken viser, er det flere forskjellige
måter å måle ytelse på, noen involverer sofistikerte
[ytelses-APIer](/en-US/docs/Web/API/Performance_API). Den beste måten å komme i
gang på er imidlertid å lære å bruke verktøy som innebygde nettleser
[nettverks-](/en-US/docs/Learn_web_development/Extensions/Performance/Measuring_performance#network_monitor_tools)
og
[ytelsesverktøy](/en-US/docs/Learn_web_development/Extensions/Performance/Measuring_performance#performance_monitor_tools),
for å se hvilke deler av sidelastingen som tar lang tid og trenger
optimalisering.

## Optimalisere rendering

Nettlesere følger en spesifikk renderingssti — maling skjer først etter layout,
som skjer etter at rendertreet er opprettet, som igjen krever både DOM- og
CSSOM-trærne.

Å vise brukere en u-stilet side og deretter male den på nytt etter at
CSS-stilene har blitt parset, ville vært en dårlig brukeropplevelse. Av denne
grunn er CSS render-blokkerende til nettleseren bestemmer at CSS-en er
nødvendig. Nettleseren kan male siden etter at den har lastet ned CSS-en og
bygget [CSS object model (CSSOM)](/en-US/docs/Glossary/CSSOM).

For å optimalisere CSSOM-konstruksjonen og forbedre sideytelsen, kan du gjøre
ett eller flere av følgende basert på den nåværende tilstanden til CSS-en din:

- **Fjern unødvendige stiler**: Dette kan høres åpenbart ut, men det er
  overraskende hvor mange utviklere som glemmer å rydde opp i ubrukte CSS-regler
  som ble lagt til i stilarkene deres under utvikling og som til slutt ikke ble
  brukt. Alle stiler blir parset, enten de brukes under layout og maling eller
  ikke, så det kan fremskynde siderenderingen å kvitte seg med ubrukte. Som
  [How Do You Remove Unused CSS From a Site?](https://css-tricks.com/how-do-you-remove-unused-css-from-a-site/)
  (csstricks.com, 2019) oppsummerer, er dette et vanskelig problem å løse for en
  stor kodebase, og det finnes ingen magisk løsning for å pålitelig finne og
  fjerne ubrukt CSS. Du må gjøre det harde arbeidet med å holde CSS-en din
  modulær og være forsiktig og bevisst på hva som legges til og fjernes.

- **Del CSS inn i separate moduler**: Å holde CSS modulær betyr at CSS som ikke
  er nødvendig ved sidelasting kan lastes senere, noe som reduserer den
  innledende CSS render-blokkeringen og lastetidene. Den enkleste måten å gjøre
  dette på er å dele opp CSS-en din i separate filer og bare laste det som
  trengs:

  ```html
  <!-- Lasting og parsing av styles.css er render-blokkerende -->
  <link rel="stylesheet" href="styles.css" />

  <!-- Lasting og parsing av print.css er ikke render-blokkerende -->
  <link rel="stylesheet" href="print.css" media="print" />

  <!-- Lasting og parsing av mobile.css er ikke render-blokkerende på store skjermer -->
  <link
    rel="stylesheet"
    href="mobile.css"
    media="screen and (width <= 480px)"
  />
  ```

  Eksemplet ovenfor gir tre sett med stiler — standardstiler som alltid vil
  lastes, stiler som bare vil bli lastet når dokumentet skrives ut, og stiler
  som bare vil bli lastet av enheter med smale skjermer. Som standard antar
  nettleseren at hvert spesifiserte stilark er render-blokkerende. Du kan
  fortelle nettleseren når et stilark skal brukes ved å legge til et
  `media`-attributt som inneholder en
  [media query](/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). Når
  nettleseren ser et stilark som den bare trenger å bruke i et spesifikt
  scenario, laster den fortsatt ned stilarket, men det er ikke
  render-blokkerende. Ved å separere CSS-en i flere filer, blir den viktigste
  render-blokkerende filen, i dette tilfellet `styles.css`, mye mindre, noe som
  reduserer tiden renderingen er blokkert.

- **Minifiser og komprimer CSS-en din**: Minifisering innebærer å fjerne all
  mellomrom i filen som bare er der for menneskelig lesbarhet, når koden er satt
  i produksjon. Du kan redusere lastetidene betydelig ved å minifisere CSS-en
  din. Minifisering gjøres generelt som en del av en byggeprosess (for eksempel
  vil de fleste JavaScript-rammeverk minifisere kode når du bygger et prosjekt
  klart for distribusjon). I tillegg til minifisering, sørg for at serveren
  nettstedet ditt er vert for bruker komprimering som gzip på filer før de
  serveres.

- **Forenkle selektorer**: Folk skriver ofte selektorer som er mer komplekse enn
  nødvendig for å anvende de nødvendige stilene. Dette øker ikke bare
  filstørrelsene, men også parsetiden for disse selektorene. For eksempel:

  ```css
  /* Veldig spesifikk selektor */
  body div#main-content article.post h2.headline {
    font-size: 24px;
  }

  /* Du trenger sannsynligvis bare denne */
  .headline {
    font-size: 24px;
  }
  ```

  Å gjøre selektorene dine mindre komplekse og spesifikke er også bra for
  vedlikehold. Det er lett å forstå hva enkle selektorer gjør, og det er lett å
  overstyre stiler når det trengs senere hvis selektorene er mindre
  [spesifikke](/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts#specificity_2).

- **Ikke bruk stiler på flere elementer enn nødvendig**: En vanlig feil er å
  bruke stiler på alle elementer ved hjelp av
  [universell selektor](/en-US/docs/Web/CSS/Universal_selectors), eller i det
  minste, på flere elementer enn nødvendig. Denne typen styling kan påvirke
  ytelsen negativt, spesielt på større nettsteder.

  ```css
  /* Velger hvert element inne i <body> */
  body * {
    font-size: 14px;
    display: flex;
  }
  ```

  Husk at mange egenskaper (som {{cssxref("font-size")}}) arver verdiene sine
  fra foreldrene, så du trenger ikke å bruke dem overalt. Og kraftige verktøy
  som [Flexbox](/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox) må
  brukes med måte. Å bruke dem overalt kan forårsake all slags uventet
  oppførsel.

- **Reduser HTTP-forespørsler for bilder med CSS-sprites**:
  [CSS-sprites](https://css-tricks.com/css-sprites/) er en teknikk som plasserer
  flere små bilder (som ikoner) du vil bruke på nettstedet ditt i en enkelt
  bildefil, og deretter bruker forskjellige {{cssxref("background-position")}}-
  verdier for å vise den delen av bildet du vil vise på hvert enkelt sted. Dette
  kan dramatisk redusere antall HTTP-forespørsler som trengs for å hente
  bildene.

- **Forhåndslast viktige ressurser**: Du kan bruke
  [`rel="preload"`](/en-US/docs/Web/HTML/Reference/Attributes/rel/preload) for å
  gjøre {{htmlelement("link")}}-elementer om til forhåndslastere for kritiske
  ressurser. Dette inkluderer CSS-filer, fonter og bilder:

  ```html
  <link rel="preload" href="style.css" as="style" />

  <link
    rel="preload"
    href="ComicSans.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />

  <link
    rel="preload"
    href="bg-image-wide.png"
    as="image"
    media="(width > 600px)"
  />
  ```

  Med `preload` vil nettleseren hente de refererte ressursene så snart som mulig
  og gjøre dem tilgjengelige i nettleserens cache, slik at de vil være klare til
  bruk tidligere når de refereres i påfølgende kode. Det er nyttig å
  forhåndslaste høyt prioriterte ressurser som brukeren vil møte tidlig på en
  side, slik at opplevelsen blir så smidig som mulig. Legg merke til hvordan du
  også kan bruke `media`-attributter for å lage responsive forhåndslastere.

  Se også
  [Preload critical assets to improve loading speed](https://web.dev/articles/preload-critical-assets)
  på web.dev (2020)

## Håndtering av animasjoner

Animasjoner kan forbedre oppfattet ytelse, få grensesnitt til å føles raskere og
gi brukere en følelse av fremgang når de venter på at en side skal lastes (for
eksempel lastesnurrer). Imidlertid vil større animasjoner og et høyere antall
animasjoner naturligvis kreve mer prosessorkraft å håndtere, noe som kan
forringe ytelsen.

Det enkleste rådet er å kutte ned på alle unødvendige animasjoner. Du kan også
gi brukere en kontroll/nettstedspreferanse for å slå av animasjoner hvis de
bruker en enhet med lav ytelse eller en mobil enhet med begrenset batteristrøm.
Du kan også bruke JavaScript for å kontrollere om animasjon skal brukes på siden
i utgangspunktet. Det finnes også en media query kalt
[`prefers-reduced-motion`](/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
som kan brukes til å selektivt servere animasjonsstiler eller ikke, basert på en
brukers OS-nivå preferanser for animasjon.

For essensielle DOM-animasjoner anbefales det å bruke
[CSS-animasjoner](/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) der
det er mulig, i stedet for JavaScript-animasjoner
([Web Animations API](/en-US/docs/Web/API/Web_Animations_API) gir en måte å
koble seg direkte til CSS-animasjoner ved hjelp av JavaScript).

### Velge egenskaper å animere

Videre avhenger animasjonsytelsen sterkt av hvilke egenskaper du animerer. Visse
egenskaper, når de animeres, utløser en [reflow](/en-US/docs/Glossary/Reflow)
(og dermed også en [repaint](/en-US/docs/Glossary/Repaint)) og bør unngås. Disse
inkluderer egenskaper som:

- Endrer et elements dimensjoner, som [`width`](/en-US/docs/Web/CSS/width),
  [`height`](/en-US/docs/Web/CSS/height),
  [`border`](/en-US/docs/Web/CSS/border), og
  [`padding`](/en-US/docs/Web/CSS/padding).
- Flytter et element, som [`margin`](/en-US/docs/Web/CSS/margin),
  [`top`](/en-US/docs/Web/CSS/top), [`bottom`](/en-US/docs/Web/CSS/bottom),
  [`left`](/en-US/docs/Web/CSS/left), og [`right`](/en-US/docs/Web/CSS/right).
- Endrer et elements layout, som
  [`align-content`](/en-US/docs/Web/CSS/align-content),
  [`align-items`](/en-US/docs/Web/CSS/align-items), og
  [`flex`](/en-US/docs/Web/CSS/flex).
- Legger til visuelle effekter som endrer elementets geometri, som
  [`box-shadow`](/en-US/docs/Web/CSS/box-shadow).

Moderne nettlesere er smarte nok til å male bare det endrede området av
dokumentet, i stedet for hele siden. Som et resultat er større animasjoner mer
kostbare.

Hvis det er mulig, er det bedre å animere egenskaper som ikke forårsaker
reflow/repaint. Dette inkluderer:

- [Transforms](/en-US/docs/Web/CSS/CSS_transforms)
- [`opacity`](/en-US/docs/Web/CSS/opacity)
- [`filter`](/en-US/docs/Web/CSS/filter)

### Animering på GPU-en

For å forbedre ytelsen ytterligere, bør du vurdere å flytte animasjonsarbeid fra
hovedtråden og over til enhetens GPU (også referert til som compositing). Dette
gjøres ved å velge spesifikke typer animasjoner som nettleseren automatisk vil
sende til GPU-en for håndtering; disse inkluderer:

- 3D-transformasjonsanimasjoner som
  [`transform: translateZ()`](/en-US/docs/Web/CSS/transform) og
  [`rotate3d()`](/en-US/docs/Web/CSS/transform-function/rotate3d).
- Elementer med visse andre animerte egenskaper som
  [`position: fixed`](/en-US/docs/Web/CSS/position).
- Elementer med [`will-change`](/en-US/docs/Web/CSS/will-change) anvendt (se
  avsnittet nedenfor).
- Visse elementer som rendres i sitt eget lag, inkludert
  [`<video>`](/en-US/docs/Web/HTML/Reference/Elements/video),
  [`<canvas>`](/en-US/docs/Web/HTML/Reference/Elements/canvas), og
  [`<iframe>`](/en-US/docs/Web/HTML/Reference/Elements/iframe).

Animasjon på GPU-en kan resultere i forbedret ytelse, spesielt på mobil. Det er
imidlertid ikke alltid så enkelt å flytte animasjoner til GPU-en. Les
[CSS GPU Animation: Doing It Right](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
(smashingmagazine.com, 2016) for en veldig nyttig og detaljert analyse.

## Optimalisere elementendringer med `will-change`

Nettlesere kan sette opp optimaliseringer før et element faktisk endres. Disse
slags optimaliseringer kan øke responsiviteten til en side ved å gjøre
potensielt kostbart arbeid før det er nødvendig. CSS- egenskapen
[`will-change`](/en-US/docs/Web/CSS/will-change) gir nettlesere hint om hvordan
et element forventes å endre seg.

> [!NOTE] `will-change` er ment å brukes som en siste utvei for å prøve å
> håndtere eksisterende ytelsesproblemer. Den bør ikke brukes for å forutse
> ytelsesproblemer.

```css
.element {
  will-change: opacity, transform;
}
```

## Optimalisering for render-blokkering

CSS kan avgrense stiler til bestemte forhold med media queries. Media queries er
viktige for responsivt webdesign og hjelper oss med å optimalisere en kritisk
renderingssti. Nettleseren blokkerer rendering til den har parset alle disse
stilene, men vil ikke blokkere rendering på stiler den vet den ikke vil bruke,
som for eksempel stilark for utskrift. Ved å dele CSS-en i flere filer basert på
media queries, kan du forhindre render-blokkering under nedlasting av ubrukt
CSS. For å lage en ikke-blokkerende CSS-lenke, flytt de stilene som ikke brukes
umiddelbart, som utskriftsstiler, til en separat fil, legg til en
[`<link>`](/en-US/docs/Web/HTML/Reference/Elements/link) i HTML-koden, og legg
til en media query, i dette tilfellet som angir at det er et stilark for
utskrift.

```html
<!-- Lasting og parsing av styles.css er render-blokkerende -->
<link rel="stylesheet" href="styles.css" />

<!-- Lasting og parsing av print.css er ikke render-blokkerende -->
<link rel="stylesheet" href="print.css" media="print" />

<!-- Lasting og parsing av mobile.css er ikke render-blokkerende på store skjermer -->
<link rel="stylesheet" href="mobile.css" media="screen and (width <= 480px)" />
```

Som standard antar nettleseren at hvert spesifiserte stilark er render-
blokkerende. Fortell nettleseren når stilarket skal brukes ved å legge til et
`media`-attributt med en
[media query](/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). Når
nettleseren ser et stilark den vet at den bare trenger å bruke det for et
spesifikt scenario, laster den fortsatt ned stilarket, men det er ikke
render-blokkerende. Ved å separere CSS-en i flere filer, blir den viktigste
render-blokkerende filen, i dette tilfellet `styles.css`, mye mindre, noe som
reduserer tiden renderingen er blokkert.

## Forbedre font-ytelse

Dette avsnittet inneholder noen nyttige tips for å forbedre ytelsen til
webfonter.

Generelt sett, tenk nøye gjennom hvilke fonter du bruker på nettstedet ditt.
Noen font- filer kan være veldig store (flere megabytes). Selv om det kan være
fristende å bruke mange fonter for visuell spenning, kan dette redusere
sidelastingen betydelig, og få nettstedet ditt til å se rotete ut. Du trenger
sannsynligvis bare to eller tre fonter, og du kan klare deg med færre hvis du
velger å bruke
[web safe fonts](/en-US/docs/Learn_web_development/Core/Text_styling/Fundamentals#web_safe_fonts).

### Font-lasting

Husk at en font bare lastes når den faktisk brukes på et element ved hjelp av
[`font-family`](/en-US/docs/Web/CSS/font-family)-egenskapen, ikke når den først
refereres til ved hjelp av [`@font-face`](/en-US/docs/Web/CSS/@font-face)
at-regelen:

```css
/* Fonten lastes ikke her */
@font-face {
  font-family: 'Open Sans';
  src: url('OpenSans-Regular-webfont.woff2') format('woff2');
}

h1,
h2,
h3 {
  /* Den lastes faktisk her */
  font-family: 'Open Sans', sans-serif;
}
```

Det kan derfor være fordelaktig å bruke `rel="preload"` for å laste viktige
fonter tidlig, slik at de blir tilgjengelige raskere når de faktisk trengs:

```html
<link
  rel="preload"
  href="OpenSans-Regular-webfont.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

Dette er mer sannsynlig å være fordelaktig hvis `font-family`-deklarasjonen din
er skjult inne i et stort eksternt stilark, og ikke vil bli nådd før betydelig
senere i parseprosessen. Det er imidlertid en avveining — fontfiler er ganske
store, og hvis du forhåndslaster for mange av dem, kan du forsinke andre
ressurser.

Du kan også vurdere:

- Å bruke
  [`rel="preconnect"`](/en-US/docs/Web/HTML/Reference/Attributes/rel/preconnect)
  for å opprette en tidlig forbindelse med font-leverandøren. Se
  [Preconnect to critical third-party origins](https://web.dev/articles/font-best-practices#preconnect_to_critical_third-party_origins)
  for detaljer.
- Å bruke [CSS Font Loading API](/en-US/docs/Web/API/CSS_Font_Loading_API) for å
  tilpasse font-lastingsatferden via JavaScript.

### Laste bare de glyfene du trenger

Når du velger en font for brødtekst, er det vanskeligere å være sikker på hvilke
glyfer som vil bli brukt i den, spesielt hvis du har å gjøre med brukergenerert
innhold og/eller innhold på tvers av flere språk.

Men hvis du vet at du kommer til å bruke et spesifikt sett med glyfer (for
eksempel, glyfer kun for overskrifter eller spesifikke tegnsettingstegn), kan du
begrense antall glyfer nettleseren må laste ned. Dette kan gjøres ved å lage en
fontfil som bare inneholder det nødvendige delsettet. En prosess kalt
[subsetting](https://fonts.google.com/knowledge/glossary/subsetting).
[`unicode-range`](/en-US/docs/Web/CSS/@font-face/unicode-range) `@font-face`-
beskrivelsen kan deretter brukes til å spesifisere når delsett-fonten din skal
brukes. Hvis siden ikke bruker noen tegn i dette området, lastes ikke fonten
ned.

```css
@font-face {
  font-family: 'Open Sans';
  src: url('OpenSans-Regular-webfont.woff2') format('woff2');
  unicode-range: U+0025-00FF;
}
```

### Definere font-visningsatferd med `font-display`-beskrivelsen

Anvendt på `@font-face`-at-regelen, definerer
[`font-display`](/en-US/docs/Web/CSS/@font-face/font-display)-beskrivelsen
hvordan fontfiler lastes og vises av nettleseren, slik at tekst kan vises med en
reservefont mens en font lastes, eller ikke klarer å laste. Dette forbedrer
ytelsen ved å gjøre teksten synlig i stedet for å ha en blank skjerm, med en
avveining som er et glimt av u-stilet tekst.

```css
@font-face {
  font-family: someFont;
  src: url('/path/to/fonts/someFont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: fallback;
}
```

## Optimalisere stil-rekalkulering med CSS containment

Ved å bruke egenskapene definert i
[CSS containment](/en-US/docs/Web/CSS/CSS_containment)-modulen, kan du instruere
nettleseren til å isolere forskjellige deler av en side og optimalisere
renderingen deres uavhengig av hverandre. Dette gir forbedret ytelse i
renderingen av individuelle seksjoner. Som et eksempel kan du spesifisere til
nettleseren at den ikke skal rendre visse containere før de er synlige i
visningsporten.

{{cssxref("contain")}}-egenskapen lar en forfatter spesifisere nøyaktig hvilke
[containment-typer](/en-US/docs/Web/CSS/CSS_containment/Using_CSS_containment)
de vil ha anvendt på individuelle containere på siden. Dette lar nettleseren
rekalkulere layout, stil, maling, størrelse, eller en hvilken som helst
kombinasjon av dem for en begrenset del av DOM.

```css
article {
  contain: content;
}
```

{{cssxref("content-visibility")}}-egenskapen er en nyttig snarvei, som lar
forfattere anvende et sterkt sett med containments på et sett med containere og
spesifisere at nettleseren ikke skal layoute og rendre disse containerne før det
er nødvendig.

En andre egenskap, {{cssxref("contain-intrinsic-size")}}, er også tilgjengelig,
som lar deg gi en plassholderstørrelse for containere mens de er under effekten
av containment. Dette betyr at containerne vil ta opp plass selv om innholdet
deres ennå ikke er rendret, noe som lar containment utføre sin ytelsesmagi uten
risiko for forskyvning av rullefelt og rykk når elementer rendres og kommer til
syne. Dette forbedrer kvaliteten på brukeropplevelsen mens innholdet lastes.

```css
article {
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
}
```

## Optimalisere `:has()`-selektorer

{{cssxref(":has", ":has()")}} pseudo-klassen muliggjør kraftige seleksjons-
muligheter, men krever forsiktig bruk for å unngå ytelsesflaskehalser. For
detaljert veiledning om å skrive effektive `:has()`-selektorer, se
[Ytelseshensyn i `:has()`-referansedokumentasjonen](/en-US/docs/Web/CSS/:has#performance_considerations).

## Se også

- [CSS-animasjonsytelse](/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance)
- [Beste praksis for fonter](https://web.dev/articles/font-best-practices) på
  web.dev (2022)
- [content-visibility: den nye CSS-egenskapen som øker renderingsytelsen din](https://web.dev/articles/content-visibility)
  på web.dev (2022)

{{PreviousMenuNext("Learn_web_development/Extensions/Performance/html", "Learn_web_development/Extensions/Performance/business_case_for_performance", "Learn_web_development/Extensions/Performance")}}
