# Funksjonsargumenter

Det ideelle antallet argumenter for en funksjon er null (niladisk). Deretter kommer ett (monadisk), tett fulgt av to (dyadisk). Tre argumenter (triadisk) bør unngås der det er mulig. Mer enn tre (polyadisk) krever en helt spesiell begrunnelse – og bør uansett ikke brukes.

Argumenter er vanskelige. De krever mye konseptuell kraft. Det er derfor jeg fjernet nesten alle fra eksempelet. Vurder for eksempel `StringBuffer` i eksempelet. Vi kunne ha sendt den rundt som et argument i stedet for å gjøre den til en instansvariabel, men da måtte leserne våre tolket den hver gang de så den. Når du leser historien som fortelles av modulen, er `includeSetupPage()` lettere å forstå enn `includeSetupPageInto(newPageContent)`. Argumentet er på et annet abstraksjonsnivå enn funksjonsnavnet og tvinger deg til å kjenne en detalj (med andre ord, `StringBuffer`) som ikke er spesielt viktig på det tidspunktet.

Argumenter er enda vanskeligere fra et testingsperspektiv. Se for deg vanskeligheten med å skrive alle testtilfellene for å sikre at alle de ulike kombinasjonene av argumenter fungerer som de skal. Hvis det ikke er noen argumenter, er dette trivielt. Hvis det er ett argument, er det ikke så vanskelig. Med to argumenter blir problemet litt mer utfordrende. Med mer enn to argumenter kan det være overveldende å teste alle kombinasjoner av passende verdier.

Output-argumenter er vanskeligere å forstå enn input-argumenter. Når vi leser en funksjon, er vi vant til ideen om at informasjon går inn i funksjonen gjennom argumenter og ut gjennom returverdien. Vi forventer vanligvis ikke at informasjon går ut gjennom argumentene. Derfor får output-argumenter oss ofte til å studse.

Ett input-argument er det nest beste etter ingen argumenter. `SetupTeardownIncluder.render(pageData)` er ganske lett å forstå. Det er tydelig at vi skal rendre dataene i `pageData`-objektet.

## Vanlige Monadiske Former

Det er to veldig vanlige grunner til å sende ett enkelt argument inn i en funksjon. Du stiller kanskje et spørsmål om det argumentet, som i `boolean fileExists("MyFile")`. Eller du opererer på det argumentet, transformerer det til noe annet og returnerer det. For eksempel, `InputStream fileOpen("MyFile")` transformerer et filnavn (String) til en InputStream-returverdi. Dette er de to bruksområdene lesere forventer.

En noe mindre vanlig, men fortsatt veldig nyttig form for en monadisk funksjon, er en hendelse (event). I denne formen er det et input-argument, men ikke noe output. Programmet som helhet er ment å tolke funksjonskallet som en hendelse og bruke argumentet til å endre systemets tilstand, for eksempel `void passwordAttemptFailedNtimes(int attempts)`. Bruk denne formen med omhu.

Prøv å unngå monadiske funksjoner som ikke følger disse formene, for eksempel `void includeSetupPageInto(StringBuffer pageText)`. Å bruke et output-argument i stedet for en returverdi for en transformasjon er forvirrende. Hvis en funksjon skal transformere sitt input-argument, bør transformasjonen vises som returverdien.

## Flagg-argumenter

Flagg-argumenter er stygge. Å sende en boolean inn i en funksjon er en virkelig forferdelig praksis. Det kompliserer umiddelbart signaturen til metoden og proklamerer høyt at denne funksjonen gjør mer enn én ting. Den gjør én ting hvis flagget er `true` og en annen hvis det er `false`!

I kallet `render(true)` er betydningen helt uklar for en stakkars leser. Vi burde ha delt funksjonen i to: `renderForSuite()` og `renderForSingleTest()`.

## Dyadiske Funksjoner

En funksjon med to argumenter er vanskeligere å forstå enn en monadisk funksjon. For eksempel er `writeField(name)` lettere å forstå enn `writeField(outputStream, name)`. Selv om meningen i begge er klar, glir den første forbi øyet og etterlater sin mening uanstrengt. Den andre krever en kort pause til vi lærer å ignorere det første parameteret.

Det finnes selvfølgelig tilfeller der to argumenter er passende. For eksempel er `Point p = new Point(0,0);` helt rimelig. Kartesiske punkter tar naturlig to argumenter. De to argumentene i dette tilfellet er ordnede komponenter av én enkelt verdi! Mens `outputStream` og `name` verken har en naturlig sammenheng eller en naturlig rekkefølge.

Selv åpenbare dyadiske funksjoner som `assertEquals(expected, actual)` er problematiske. Hvor mange ganger har du ikke satt `actual` der `expected` skulle vært? `expected, actual`-rekkefølgen er en konvensjon som krever øvelse å lære.

Dyader er ikke onde, og du vil definitivt måtte skrive dem. Men du bør være klar over at de har en kostnad, og du bør benytte deg av mekanismer som kan konvertere dem til monader. For eksempel kan du gjøre `writeField`-metoden til en medlem av `outputStream` slik at du kan si `outputStream.writeField(name)`.

## Triader

Funksjoner som tar tre argumenter er betydelig vanskeligere å forstå enn dyader. Problemene med rekkefølge, pauser og ignorering blir mer enn doblet. Jeg foreslår at du tenker deg veldig nøye om før du lager en triade.

## Argumentobjekter

Når en funksjon ser ut til å trenge mer enn to eller tre argumenter, er det sannsynlig at noen av disse argumentene bør pakkes inn i sin egen klasse. Vurder for eksempel forskjellen mellom de to følgende erklæringene:

```typescript
// Uheldig
function makeCircle(x: number, y: number, radius: number): Circle { ... }

// Bedre
function makeCircle(center: Point, radius: number): Circle { ... }
```

Å redusere antall argumenter ved å lage objekter av dem kan virke som juks, men det er det ikke. Når grupper av variabler sendes sammen, slik som `x` og `y` i eksempelet ovenfor, er de sannsynligvis en del av et konsept som fortjener sitt eget navn.

## Argumentlister

Noen ganger ønsker vi å sende et variabelt antall argumenter inn i en funksjon. Vurder for eksempel `String.format`-metoden:

```typescript
const formatted = String.format('%s worked %.2f hours.', name, hours)
```

Hvis de variable argumentene alle behandles likt, slik de er i eksempelet ovenfor, tilsvarer de ett enkelt argument av typen `List`. Med den begrunnelsen er `String.format` faktisk dyadisk. Funksjoner som tar variable argumenter kan være monader, dyader eller til og med triader. Men det ville være en feil å gi dem flere argumenter enn det.

## Verb og Nøkkelord

Å velge gode navn for en funksjon kan i stor grad bidra til å forklare funksjonens intensjon og rekkefølgen og intensjonen til argumentene. I tilfellet med en monade, bør funksjonen og argumentet danne et veldig fint verb/substantiv-par. For eksempel er `write(name)` veldig beskrivende.

Dette siste er et eksempel på nøkkelord-formen av et funksjonsnavn. Ved å bruke denne formen koder vi navnene på argumentene inn i funksjonsnavnet. For eksempel kunne `assertEquals` vært bedre skrevet som `assertExpectedEqualsActual(expected, actual)`. Dette reduserer i stor grad problemet med å måtte huske rekkefølgen på argumentene.

---

**Kommentar om konvertering fra Java til TypeScript:**  
Alle kodeeksempler og idiomer fra Java er oversatt til TypeScript-form for å gjøre prinsippene umiddelbart relevante for moderne TypeScript/Next.js-applikasjoner.
