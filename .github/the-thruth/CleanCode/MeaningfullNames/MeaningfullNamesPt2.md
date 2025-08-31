# Meningsfulle Navn – Del 2

## Ikke vær «søt»

Navn som er for smarte eller morsomme, vil bare bli husket av folk som deler forfatterens humor – og bare så lenge de husker vitsen. For eksempel, vil man forstå hva funksjonen `HolyHandGrenade` gjør? Kanskje, men `DeleteItems` er et mye bedre, tydeligere navn.

> **Velg alltid klarhet over underholdningsverdi.**

Å være «søt» i kode viser seg ofte i form av dagligtale eller slang. Ikke bruk navn som `whack()` for å bety `kill()`, eller kulturavhengige vitser som `eatMyShorts()` for å bety `abort()`.  
**Si det du mener. Mening foran morsomhet.**

---

## Velg ett ord per konsept

Bruk ett ord for hvert abstrakt konsept, og hold deg til det gjennom hele kodebasen.

- Unngå at likeverdige konsepter får ulike navn som `fetch`, `retrieve`, og `get` i forskjellige klasser.
- Unngå også å blande begreper som `controller`, `manager`, og `driver` for beslektede roller.

**Eksempel:**

```typescript
// Dårlig: inkonsekvent bruk av begreper
class DeviceManager {
  /* ... */
}
class ProtocolController {
  /* ... */
}

// Bedre: konsekvent vokabular
class DeviceController {
  /* ... */
}
class ProtocolController {
  /* ... */
}
```

Et konsistent vokabular er en stor fordel for alle som skal bruke eller lese koden.

---

## Ikke lag ordspill

Unngå å bruke samme ord for to ulike ting. Det skaper forvirring og krever unødvendig mental innsats fra leseren.

- Det er greit med mange `add`-metoder hvis de faktisk gjør det samme (f.eks. adderer eller kombinerer).
- Men ikke bruk `add` for å sette inn i en samling – da bør du bruke `insert` eller `append`.

> **Målet:** Gjør koden enkel å forstå ved skumlesing, ikke krev intens studie.

---

## Bruk navn fra løsningsdomenet

Bruk informatikk-termer, algoritmenavn, mønsternavn og matematiske begreper når det er hensiktsmessig.  
Programmerere forstår termer som `Visitor`, `JobQueue`, osv.

```typescript
class AccountVisitor {
  /* ... */
}
class JobQueue {
  /* ... */
}
```

---

## Bruk navn fra problemdomenet

Når det ikke finnes et godt «programmerer-ord», bruk domeneordet. Da kan utviklere spørre en domeneekspert hvis de er usikre.

---

## Legg til meningsfull kontekst

De fleste navn er ikke meningsfulle alene – sett dem i kontekst.

- Bruk velnavngitte klasser, funksjoner eller namespaces.
- Som siste utvei: bruk et prefiks.
- Enda bedre: samle relaterte felt i en egen klasse.

**Eksempel:**

```typescript
// Dårlig: uklar kontekst
let state: string

// Bedre: bruk en klasse
class Address {
  constructor(
    public firstName: string,
    public lastName: string,
    public street: string,
    public houseNumber: string,
    public city: string,
    public state: string,
    public zipcode: string
  ) {}
}
```

---

## Eksempel på forbedring av variabelkontekst

**Før:**

```typescript
function printGuessStatistics(candidate: string, count: number) {
  let number: string
  let verb: string
  let pluralModifier: string
  if (count === 0) {
    number = 'no'
    verb = 'are'
    pluralModifier = 's'
  } else if (count === 1) {
    number = '1'
    verb = 'is'
    pluralModifier = ''
  } else {
    number = count.toString()
    verb = 'are'
    pluralModifier = 's'
  }
  const guessMessage = `There ${verb} ${number} ${candidate}${pluralModifier}`
  print(guessMessage)
}
```

**Etter:**

```typescript
class GuessStatisticsMessage {
  private number!: string
  private verb!: string
  private pluralModifier!: string

  make(candidate: string, count: number): string {
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
  // ...private hjelpe-metoder som setter number, verb og pluralModifier...
}
```

Nå har variablene klar kontekst.

---

## Ikke legg til unødvendig kontekst

- Ikke bruk prefikser som app-navn på alle klasser (f.eks. `GSD`). Det gir bare støy.
- Kortere navn er bedre enn lengre, så lenge de er tydelige og presise.
- `Address` er et godt klassenavn. Hvis du trenger å skille, bruk f.eks. `PostalAddress`, `MAC`, `URI`.

---

## Avsluttende ord

Det vanskeligste med å velge gode navn er at det krever gode beskrivende ferdigheter og en felles kulturell bakgrunn.  
Ikke vær redd for å endre navn til noe bedre. Bruk refaktoreringsverktøy – det lønner seg både på kort og lang sikt.

> **Følg disse reglene og du vil forbedre lesbarheten i koden din betraktelig.**

---

**Kommentar om konvertering fra Java til TypeScript:**  
Alle eksempler er omskrevet til TypeScript, uten tap av mening eller struktur.  
Konseptene er universelle og gjelder uansett programmeringsspråk.
