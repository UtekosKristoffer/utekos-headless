# Meningsfulle navn

## Ikke vær «søt»

Hvis navn er for smarte, vil de bare bli husket av folk som deler forfatterens sans for humor, og bare så lenge disse personene husker vitsen. Vil de vite hva funksjonen ved navn `HolyHandGrenade` er ment å gjøre? Jada, det er søtt, men i dette tilfellet er kanskje `DeleteItems` et bedre navn.

> **Velg klarhet over underholdningsverdi.**

Det å være «søt» i kode kommer ofte i form av dagligtale eller slang. For eksempel, ikke bruk navnet `whack()` for å bety `kill()`. Ikke kom med små, kulturavhengige vitser som `eatMyShorts()` for å bety `abort()`.

**Si det du mener. Men det du sier.**

---

## Velg ett ord per konsept

Velg ett ord for ett abstrakt konsept og hold deg til det. For eksempel er det forvirrende å ha `fetch`, `retrieve` og `get` som likeverdige metoder i forskjellige klasser. Hvordan husker du hvilket metodenavn som hører til hvilken klasse? Dessverre må du ofte huske hvilket firma, gruppe eller individ som skrev biblioteket eller klassen for å huske hvilken term som ble brukt.

Moderne redigeringsmiljøer som Eclipse og IntelliJ gir kontekstsensitive hint, som listen over metoder du kan kalle på et gitt objekt. Men merk at listen vanligvis ikke gir deg kommentarene du skrev rundt funksjonsnavnene og parameterlistene dine. Funksjonsnavnene må stå på egne ben, og de må være konsistente for at du skal kunne velge riktig metode uten ytterligere utforskning.

På samme måte er det forvirrende å ha en controller, en manager og en driver i samme kodebase. Hva er den essensielle forskjellen mellom en `DeviceManager` og en `ProtocolController`? Hvorfor er ikke begge controllere eller begge managere? Er de egentlig begge drivere? Navnet får deg til å forvente to objekter som har veldig forskjellig type i tillegg til å ha forskjellige klasser.

> Et konsistent vokabular er en stor fordel for programmererne som skal bruke koden din.

---

## Ikke lag ordspill

Unngå å bruke samme ord for to formål. Å bruke samme term for to forskjellige ideer er i bunn og grunn et ordspill.

Hvis du følger regelen om «ett ord per konsept», kan du ende opp med mange klasser som for eksempel har en `add`-metode. Så lenge parameterlistene og returverdiene til de ulike add-metodene er semantisk ekvivalente, er alt vel.

Men man kan bestemme seg for å bruke ordet `add` for «konsistens» når man faktisk ikke legger til (adderer) i samme forstand. La oss si vi har mange klasser der `add` vil skape en ny verdi ved å addere eller slå sammen to eksisterende verdier. La oss nå si at vi skriver en ny klasse som har en metode som plasserer sin ene parameter i en samling. Bør vi kalle denne metoden `add`? Det kan virke konsistent fordi vi har så mange andre add-metoder, men i dette tilfellet er semantikken annerledes, så vi bør bruke et navn som `insert` eller `append` i stedet. Å kalle den nye metoden `add` ville vært et ordspill.

Målet vårt, som forfattere, er å gjøre koden vår så enkel som mulig å forstå. Vi vil at koden vår skal kunne skumleses raskt, ikke kreve en intens studie. Vi ønsker å bruke pocketbok-modellen der forfatteren er ansvarlig for å gjøre seg forstått, ikke den akademiske modellen der det er forskerens jobb å grave meningen ut av teksten.

---

## Bruk navn fra løsningsdomenet

Husk at de som leser koden din vil være programmerere. Så bare fortsett og bruk informatikk-termer (CS-termer), algoritmenavn, mønsternavn, matematiske termer og så videre. Det er ikke lurt å hente alle navn fra problemdomenet, for vi vil ikke at kollegene våre skal måtte løpe frem og tilbake til kunden og spørre hva hvert navn betyr, når de allerede kjenner konseptet under et annet navn.

Navnet `AccountVisitor` betyr mye for en programmerer som er kjent med VISITOR-mønsteret. Hvilken programmerer ville ikke vite hva en `JobQueue` var? Det er mange veldig tekniske ting programmerere må gjøre. Å velge tekniske navn for disse tingene er vanligvis den mest passende fremgangsmåten.

---

## Bruk navn fra problemdomenet

Når det ikke finnes noe «programmerer-språk» for det du gjør, bruk navnet fra problemdomenet. Da kan i det minste programmereren som vedlikeholder koden din spørre en domeneekspert hva det betyr.

Å skille konsepter fra løsnings- og problemdomenet er en del av jobben til en god programmerer og designer. Koden som har mer å gjøre med problemdomene-konsepter, bør ha navn hentet fra problemdomenet.

---

## Legg til meningsfull kontekst

Det finnes noen få navn som er meningsfulle i seg selv – de fleste er det ikke. I stedet må du plassere navn i en kontekst for leseren din ved å omslutte dem i velnavngitte klasser, funksjoner eller navnerom (namespaces). Når alt annet feiler, kan det å bruke et prefiks på navnet være nødvendig som en siste utvei.

Se for deg at du har variabler ved navn `firstName`, `lastName`, `street`, `houseNumber`, `city`, `state` og `zipcode`. Samlet sett er det ganske tydelig at de danner en adresse. Men hva om du bare så `state`-variabelen brukt alene i en metode? Ville du automatisk antatt at den var en del av en adresse?

Du kan legge til kontekst ved å bruke prefikser: `addrFirstName`, `addrLastName`, `addrState` og så videre. Da vil i det minste leserne forstå at disse variablene er en del av en større struktur. En bedre løsning er selvfølgelig å lage en klasse ved navn `Address`. Da vet til og med kompilatoren at variablene tilhører et større konsept.

Vurder metoden i Listing 2-1. Trenger variablene en mer meningsfull kontekst? Funksjonsnavnet gir bare en del av konteksten; algoritmen gir resten. Når du først leser funksjonen, er betydningen av variablene `number`, `verb` og `pluralModifier` uklar.

**Listing 2-1: Variabler med uklar kontekst.**

```typescript
private function printGuessStatistics(candidate: string, count: number) {
    let number: string;
    let verb: string;
    let pluralModifier: string;
    if (count === 0) {
        number = "no";
        verb = "are";
        pluralModifier = "s";
    } else if (count === 1) {
        number = "1";
        verb = "is";
        pluralModifier = "";
    } else {
        number = count.toString();
        verb = "are";
        pluralModifier = "s";
    }
    const guessMessage = `There ${verb} ${number} ${candidate}${pluralModifier}`;
    print(guessMessage);
}
```

Funksjonen er litt for lang, og variablene brukes overalt. For å dele funksjonen i mindre biter må vi lage en `GuessStatisticsMessage`-klasse og gjøre de tre variablene til felter i denne klassen. Dette gir en klar kontekst for de tre variablene. Forbedringen av konteksten gjør det også mulig å gjøre algoritmen mye renere ved å bryte den ned i mange mindre funksjoner (se Listing 2-2).

**Listing 2-2: Variabler har en kontekst.**

```typescript
class GuessStatisticsMessage {
  private number!: string
  private verb!: string
  private pluralModifier!: string

  public make(candidate: string, count: number): string {
    this.createPluralDependentMessageParts(count)
    return `There ${this.verb} ${this.number} ${candidate}${this.pluralModifier}`
  }

  private createPluralDependentMessageParts(count: number) {
    if (count === 0) {
      this.thereAreNoLetters()
    } else if (count === 1) {
      this.thereIsOneLetter()
    } else {
      this.thereAreManyLetters(count)
    }
  }

  // ... private hjelpemetoder for å sette number, verb, og pluralModifier ...
}
```

---

## Ikke legg til unødvendig kontekst

I en tenkt applikasjon kalt «Gas Station Deluxe», er det en dårlig idé å prefikse hver klasse med `GSD`. Ærlig talt, du jobber mot verktøyene dine. Du skriver `G`, trykker på auto-fullfør-tasten og blir belønnet med en kilometerlang liste over hver klasse i systemet. Er det lurt?

Kortere navn er generelt bedre enn lengre, så lenge de er klare. Ikke legg til mer kontekst til et navn enn det som er nødvendig.

Navnene `accountAddress` og `customerAddress` er fine navn for instanser av klassen `Address`, men kan være dårlige navn for klasser. `Address` er et fint navn for en klasse. Hvis jeg trenger å skille mellom MAC-adresser, port-adresser og web-adresser, kan jeg vurdere `PostalAddress`, `MAC`, og `URI`. De resulterende navnene er mer presise, noe som er poenget med all navngivning.

---

## Avsluttende ord

Det vanskeligste med å velge gode navn er at det krever gode beskrivende ferdigheter og en felles kulturell bakgrunn. Dette er en opplæringssak snarere enn et teknisk, forretningsmessig eller ledelsesmessig problem.

Folk er også redde for å gi ting nye navn i frykt for at andre utviklere vil protestere. Vi deler ikke den frykten og opplever at vi faktisk er takknemlige når navn endres (til det bedre). Mesteparten av tiden husker vi ikke egentlig navnene på klasser og metoder. Vi bruker moderne verktøy for å håndtere detaljer som det.

Følg noen av disse reglene og se om du ikke forbedrer lesbarheten i koden din. Hvis du vedlikeholder andres kode, bruk refaktoreringsverktøy for å hjelpe til med å løse disse problemene. Det vil lønne seg på kort sikt og fortsette å lønne seg på lang sikt.

---

