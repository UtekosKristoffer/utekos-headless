# Gjør Én Ting

Det bør være veldig tydelig at Listing 3-1 gjør mye mer enn én ting. Den oppretter buffere, henter sider, søker etter arvede sider, rendrer stier, legger til kryptiske strenger og genererer HTML, blant annet. Listing 3-1 er veldig travel med å gjøre mange forskjellige ting. På den annen side gjør Listing 3-3 én enkel ting: Den inkluderer oppsett og nedrigginger i testsider.

---

## Funksjoner skal gjøre én ting

> **FUNKSJONER SKAL GJØRE ÉN TING. DE SKAL GJØRE DEN BRA. DE SKAL KUN GJØRE DEN.**

Dette rådet har eksistert i over 30 år, men hva betyr egentlig "én ting"?

### Hva er "én ting"?

Det kan være utfordrende å definere. Ta Listing 3-3 som eksempel:

- Avgjør om siden er en testside.
- Hvis ja, inkluder oppsett og nedrigginger.
- Rendre siden i HTML.

Gjør den én ting eller tre ting?  
Poenget er: Hvis funksjonen kun utfører trinn som er **ett nivå under** funksjonsnavnet, gjør den én ting. Hver funksjon bryter ned et større konsept (navnet på funksjonen) til neste nivå av abstraksjon.

---

## Ett abstraksjonsnivå per funksjon

Funksjoner som gjør én ting kan ikke deles inn i seksjoner (f.eks. deklarasjoner, initialisering, logikk). Hvis du ser slike seksjoner, gjør funksjonen mer enn én ting.

- **Alle setninger i funksjonen bør være på samme abstraksjonsnivå.**
- Hvis du blander høy- og lavnivå-operasjoner i én funksjon, blir det forvirrende.

---

## Lese kode fra topp til bunn: Nedstegsregelen

Vi ønsker at koden skal kunne leses som en historie, fra topp til bunn, der hver funksjon etterfølges av funksjoner på neste nivå. Hver funksjon kan beskrives med en TO-paragraf, som refererer til TO-paragrafer på neste nivå.

**Eksempel:**

- FOR Å inkludere oppsett og nedrigginger:
  - inkluder oppsett
  - inkluder testsideinnhold
  - inkluder nedrigginger
- FOR Å inkludere oppsettene:
  - inkluder suite-oppsett hvis aktuelt
  - inkluder vanlig oppsett
- FOR Å inkludere suite-oppsett:
  - søk i foreldrehierarkiet etter "SuiteSetUp"-siden
  - legg til en include-setning med stien til siden

Dette gir en struktur hvor hver funksjon er på sitt eget nivå, og koden kan “steges ned” for å gå dypere.

---

## Switch-setninger

Switch-setninger gjør alltid mer enn én ting. De kan tolereres hvis:

- De bare opptrer én gang (f.eks. i en abstrakt fabrikk)
- Brukes til å lage polymorfe objekter
- Er skjult bak et arveforhold slik at resten av systemet ikke ser dem

**Dårlig:**

```typescript
function calculatePay(employee: Employee): Money {
  switch (employee.type) {
    case 'COMMISSIONED':
      return calculateCommissionedPay(employee)
    case 'HOURLY':
      return calculateHourlyPay(employee)
    case 'SALARIED':
      return calculateSalariedPay(employee)
    default:
      throw new InvalidEmployeeType(employee.type)
  }
}
```

- Stor, vokser med nye typer.
- Gjør mer enn én ting.
- Bryter både SRP (Single Responsibility Principle) og OCP (Open/Closed Principle).
- Fører til duplisering i flere funksjoner.

**Bedre:**

```typescript
abstract class Employee {
  abstract isPayday(): boolean
  abstract calculatePay(): Money
  abstract deliverPay(pay: Money): void
}

interface EmployeeFactory {
  makeEmployee(record: EmployeeRecord): Employee
}

class EmployeeFactoryImpl implements EmployeeFactory {
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

Switch-setningen gjemmes i en fabrikk. Kalkulering av lønn skjer polymorfisk via Employee-grensesnittet.

---

## Bruk beskrivende navn

- Gode navn er kritisk for lesbarhet og forventningsstyring.
- Små, fokuserte funksjoner gjør det lettere å gi gode navn.
- Ikke vær redd for å bruke lange, beskrivende navn om det gir mer mening enn korte, kryptiske navn.
- Eksperimentér med navn til de er så beskrivende som mulig.
- Vær konsistent: bruk samme fraser, substantiv og verb for samme type funksjonalitet.

**Eksempel på konsistent navngivning:**

- `includeSetupAndTeardownPages`
- `includeSetupPages`
- `includeSuiteSetupPage`
- `includeSetupPage`

---

## Oppsummering

- En funksjon skal gjøre én ting, og kun det.
- Hold funksjoner på ett abstraksjonsnivå.
- Del opp funksjoner til de ikke gir mening å dele mer.
- Skjul switch-setninger bak polymorfisme.
- Bruk gode, beskrivende og konsistente navn – ikke vær redd for lange navn!

---

**Kommentar om kodeeksempler:**  
Alle kodeeksempler er omskrevet fra Java til TypeScript. Prinsippene er universelle og fullt overførbare til moderne frontend- og backend-utvikling.
