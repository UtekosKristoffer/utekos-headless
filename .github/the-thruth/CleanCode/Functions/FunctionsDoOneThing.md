# Gjør Én Ting

Det bør være veldig tydelig at Listing 3-1 gjør mye mer enn én ting. Den oppretter buffere, henter sider, søker etter arvede sider, rendrer stier, legger til kryptiske strenger og genererer HTML, blant annet. Listing 3-1 er veldig travel med å gjøre mange forskjellige ting. På den annen side gjør Listing 3-3 én enkel ting. Den inkluderer oppsett og nedrigginger i testsider.

Følgende råd har dukket opp i en eller annen form i 30 år eller mer.

#### FUNKSJONER SKAL GJØRE ÉN TING. DE SKAL GJØRE DEN BRA. DE SKAL KUN GJØRE DEN.

Problemet med denne påstanden er at det er vanskelig å vite hva «én ting» er. Gjør Listing 3-3 én ting? Det er lett å argumentere for at den gjør tre ting:

Avgjøre om siden er en testside.

Hvis ja, inkludere oppsett og nedrigginger.

## Rendre siden i HTML.

Så hva er det? Gjør funksjonen én ting eller tre ting? Legg merke til at de tre trinnene i funksjonen er ett abstraksjonsnivå under det oppgitte navnet på funksjonen. Vi kan beskrive funksjonen ved å beskrive den som en kort TO-paragraf:

FOR Å RenderPageWithSetupsAndTeardowns, sjekker vi om siden er en testside, og i så fall inkluderer vi oppsett og nedrigginger. I begge tilfeller rendrer vi siden i HTML.

Hvis en funksjon bare utfører de trinnene som er ett nivå under det oppgitte navnet på funksjonen, da gjør funksjonen én ting. Tross alt er grunnen til at vi skriver funksjoner å bryte ned et større konsept (med andre ord, navnet på funksjonen) til et sett med trinn på neste abstraksjonsnivå.

Det bør være veldig tydelig at Listing 3-1 inneholder trinn på mange forskjellige abstraksjonsnivåer. Så den gjør helt klart mer enn én ting.

Så, en annen måte å vite at en funksjon gjør mer enn «én ting» på, er hvis du kan trekke ut en annen funksjon fra den med et navn som ikke bare er en gjentakelse av implementasjonen.

## Seksjoner i Funksjoner

Funksjoner som gjør én ting kan ikke fornuftig deles inn i seksjoner. Hvis du ser at en funksjon er delt inn i seksjoner som deklarasjoner, initialiseringer og deretter logikk, er det et åpenbart symptom på at den gjør mer enn én ting.

#### Ett Abstraksjonsnivå per Funksjon

For å sikre at funksjonene våre gjør «én ting», må vi sørge for at setningene i funksjonen vår alle er på samme abstraksjonsnivå. Det er lett å se hvordan Listing 3-1 bryter denne regelen. Det er konsepter der som er på et veldig høyt abstraksjonsnivå, som getHtml(); andre som er på et middels abstraksjonsnivå, som String pagePathName = PathParser.render(pagePath);, og atter andre som er bemerkelsesverdig lavt nivå, som .append("\n").

Å blande abstraksjonsnivåer i en funksjon er alltid forvirrende. Lesere kan kanskje ikke skille om et bestemt uttrykk er et essensielt konsept eller en detalj.

Lese kode fra topp til bunn: Nedstegsregelen
Vi vil at koden skal leses som en topp-til-bunn-fortelling. Vi vil at hver funksjon skal følges av de på neste abstraksjonsnivå, slik at vi kan lese programmet ved å gå ned ett abstraksjonsnivå om gangen mens vi leser nedover listen med funksjoner. Jeg kaller dette Nedstegsregelen (The Stepdown Rule).

For å si dette annerledes, ønsker vi å kunne lese programmet som om det var et sett med TO-paragrafer, der hver beskriver det nåværende abstraksjonsnivået og refererer til påfølgende TO-paragrafer på neste nivå ned.

FOR Å inkludere oppsett og nedrigginger, inkluderer vi oppsett, deretter inkluderer vi testsideinnholdet, og så inkluderer vi nedriggingene.

FOR Å inkludere oppsettene, inkluderer vi suite-oppsettet hvis dette er en suite, deretter inkluderer vi det vanlige oppsettet.

FOR Å inkludere suite-oppsettet, søker vi i foreldrehierarkiet etter «SuiteSetUp»-siden og legger til en include-setning med stien til den siden.

FOR Å søke i foreldre...

Det viser seg å være veldig vanskelig for programmerere å lære å følge denne regelen og skrive funksjoner som holder seg på ett enkelt abstraksjonsnivå. Men å lære dette trikset er også veldig viktig. Det er nøkkelen til å holde funksjoner korte og sørge for at de gjør «én ting».

# Switch-setninger

Det er vanskelig å lage en liten switch-setning. Det er også vanskelig å lage en switch-setning som gjør én ting. Av natur gjør switch-setninger alltid N ting. Dessverre kan vi ikke alltid unngå dem, men vi kan sørge for at hver switch-setning er begravd i en lavnivåklasse og aldri gjentas. Vi gjør dette, selvfølgelig, med polymorfisme.

Vurder Listing 3-4. Den viser bare én av operasjonene som kan avhenge av typen ansatt.

Listing 3-4: Payroll.java

```typescript
// TypeScript-versjon av Payroll-oppslaget:
export class InvalidEmployeeType extends Error {
  constructor(type: string) {
    super(`Invalid employee type: ${type}`)
  }
}

export type EmployeeType = 'COMMISSIONED' | 'HOURLY' | 'SALARIED'

export interface EmployeeRecord {
  type: EmployeeType
  // andre relevante felter
}

export abstract class Employee {
  abstract isPayday(): boolean
  abstract calculatePay(): Money
  abstract deliverPay(pay: Money): void
}

export interface EmployeeFactory {
  makeEmployee(record: EmployeeRecord): Employee
}

export class EmployeeFactoryImpl implements EmployeeFactory {
  makeEmployee(record: EmployeeRecord): Employee {
    switch (record.type) {
      case 'COMMISSIONED':
        return new CommissionedEmployee(record)
      case 'HOURLY':
        return new HourlyEmployee(record)
      case 'SALARIED':
        return new SalariedEmployee(record)
      default:
        throw new InvalidEmployeeType(record.type)
    }
  }
}
```

Det er flere problemer med denne funksjonen. For det første er den stor, og når nye ansattyper legges til, vil den vokse. For det andre gjør den helt klart mer enn én ting. For det tredje bryter den Single Responsibility-prinsippet (SRP) fordi det er mer enn én grunn til at den må endres. For det fjerde bryter den Open/Closed-prinsippet (OCP) fordi den må endres hver gang nye typer legges til. Men det kanskje verste problemet er at det finnes et ubegrenset antall andre funksjoner som vil ha den samme strukturen.

Løsningen på dette problemet (se Listing 3-5) er å begrave switch-setningen i kjelleren av en ABSTRAKT FABRIKK, og aldri la noen se den. Fabrikken vil bruke switch-setningen til å lage passende instanser av subklassene til Employee, og de ulike funksjonene, som calculatePay, vil bli kalt polymorfisk gjennom Employee-grensesnittet.

Min generelle regel for switch-setninger er at de kan tolereres hvis de bare forekommer én gang, brukes til å lage polymorfe objekter, og er skjult bak et arveforhold slik at resten av systemet ikke kan se dem.

## Bruk beskrivende navn

Det er vanskelig å overvurdere verdien av gode navn. Husk Wards prinsipp: «Du vet at du jobber med ren kode når hver rutine viser seg å være stort sett det du forventet.» Halve kampen for å oppnå det prinsippet er å velge gode navn for små funksjoner som gjør én ting. Jo mindre og mer fokusert en funksjon er, jo lettere er det å velge et beskrivende navn.

Ikke vær redd for å lage et langt navn. Et langt, beskrivende navn er bedre enn et kort, gåtefullt navn. Et langt, beskrivende navn er bedre enn en lang, beskrivende kommentar.

Ikke vær redd for å bruke tid på å velge et navn. Faktisk bør du prøve flere forskjellige navn og lese koden med hvert av dem på plass. Moderne IDE-er gjør det trivielt å endre navn. Bruk et slikt IDE og eksperimenter med forskjellige navn til du finner et som er så beskrivende som du kan få det.

Vær konsistent i navnene dine. Bruk de samme frasene, substantivene og verbene i funksjonsnavnene du velger for modulene dine. Vurder for eksempel navnene includeSetupAndTeardownPages, includeSetupPages, includeSuiteSetupPage og includeSetupPage. Den lignende ordlyden i disse navnene lar sekvensen fortelle en historie.

---

**Kommentar om konvertering:**  
Alle kodeeksempler som opprinnelig var i Java er her oversatt til TypeScript. Eksempelklasser som `Money`, `CommissionedEmployee`, `HourlyEmployee` og `SalariedEmployee` må implementeres etter behov – prinsippet og strukturen er uendret.
