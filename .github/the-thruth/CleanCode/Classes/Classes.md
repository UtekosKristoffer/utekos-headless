# Klasser

Vi har gått i dybden på riktig sammensetning av funksjoner og hvordan de samhandler. Men uansett hvor mye vi fokuserer på uttrykksfulle kodelinjer og funksjoner, har vi ikke ren kode før vi har gitt oppmerksomhet til høyere nivåer av kodeorganisering. La oss snakke om rene klasser.

---

## Klasseorganisering

Følger vi standard Java-konvensjon, bør en klasse begynne med en liste over variabler. Offentlige statiske konstanter, hvis noen, først. Deretter private statiske variabler, etterfulgt av private instansvariabler. Det er sjelden god grunn til å ha en offentlig variabel.

Offentlige funksjoner skal følge variabellisten. Vi liker å plassere private hjelpefunksjoner som brukes av en offentlig funksjon rett etter den offentlige funksjonen. Dette følger stepdown-regelen og hjelper koden å leses som en avisartikkel.

---

## Innkapsling

Vi holder variabler og hjelpefunksjoner private, men vi er ikke fanatiske. Noen ganger må vi gjøre en variabel eller hjelpefunksjon beskyttet (protected) slik at den kan nås av en test. For oss styrer testene. Hvis en test i samme pakke trenger å kalle en funksjon eller få tilgang til en variabel, gjør vi den protected eller pakke-synlig. Men vi prøver først å opprettholde privathet. Å løsne innkapslingen er alltid siste utvei.

---

## Klasser skal være små!

Første regel for klasser: De skal være små. Andre regel: De skal være mindre enn det. Som med funksjoner, er mindre hovedregelen når vi designer klasser. Men hvor små?

For funksjoner målte vi størrelse i fysiske linjer. For klasser bruker vi et annet mål: **Vi teller ansvarsområder.**

Se på denne klassen fra Listing 10-1, SuperDashboard, som har rundt 70 offentlige metoder. De fleste utviklere er enige om at dette er for mye. Noen ville kalt SuperDashboard en "Gud-klasse".

```java
public class SuperDashboard extends JFrame implements MetaDataUser {
  public String getCustomizerLanguagePath() {...}
  public void setSystemConfigPath(String systemConfigPath) {...}
  // ... (ca 70 metoder)
}
```

Hva om SuperDashboard kun inneholdt metodene i Listing 10-2?

```java
public class SuperDashboard extends JFrame implements MetaDataUser {
  public Component getLastFocusedComponent() {...}
  public void setLastFocused(Component lastFocused) {...}
  public int getMajorVersionNumber() {...}
  public int getMinorVersionNumber() {...}
  public int getBuildNumber() {...}
}
```

Fem metoder er ikke mye, men selv her har klassen for mange ansvar.

### Navn gir hint om ansvar

Navnet på en klasse bør beskrive hvilke ansvar den oppfyller. Hvis du ikke kan gi klassen et konsist navn, er den sannsynligvis for stor. Jo mer tvetydig navnet er, jo mer sannsynlig har klassen for mange ansvar. Navn som inneholder ord som `Processor`, `Manager` eller `Super` antyder ofte uheldig aggregering av ansvar.

Du bør også klare å skrive en kort beskrivelse (ca 25 ord) av klassen uten å bruke "hvis", "og", "eller", "men". Hvis du må, har klassen for mange ansvar.

---

## Single Responsibility Principle (SRP)

**SRP sier at en klasse eller modul skal ha én, og bare én, grunn til å endres.**

Dette gir både en definisjon av ansvar og en rettesnor for klassestørrelse. Klasser skal ha ett ansvar – én grunn til å endres.

Eksempel: Den tilsynelatende lille SuperDashboard-klassen over har to grunner til å endres: Den både holder styr på versjonsinformasjon og administrerer Swing-komponenter.

Ved å identifisere ansvar (grunner til endring), finner vi ofte bedre abstraksjoner. For eksempel kan vi trekke ut all versjonslogikk til en egen klasse:

```java
public class Version {
  public int getMajorVersionNumber() {...}
  public int getMinorVersionNumber() {...}
  public int getBuildNumber() {...}
}
```

SRP er et av de viktigste konseptene i OO-design, men også et av de mest misbrukte. Vi ser ofte klasser som gjør altfor mye.

Å få programvare til å fungere og å gjøre den ren er to forskjellige aktiviteter. Mange av oss tror vi er ferdige når programmet virker, men glemmer å rydde opp og splitte opp for store klasser i små, enkeltansvarlige enheter.

Noen frykter at for mange små, enkle klasser gjør det vanskelig å se helheten. Men et system med mange små klasser har ikke flere "bevegelige deler" enn et med få store. Spørsmålet er: Vil du ha verktøyene dine i mange små, velorganiserte skuffer – eller i noen få store?

---

## Kohesjon

Klasser skal ha få instansvariabler. Hver metode bør manipulere én eller flere av disse variablene. Jo flere variabler en metode bruker, jo mer kohesiv er den til klassen. En klasse der hver variabel brukes av hver metode, er maksimalt kohesiv.

Eksempel på kohesiv klasse (Stack):

```java
public class Stack {
  private int topOfStack = 0;
  List<Integer> elements = new LinkedList<Integer>();

  public int size() { return topOfStack; }
  public void push(int element) { topOfStack++; elements.add(element); }
  public int pop() throws PoppedWhenEmpty {
    if (topOfStack == 0) throw new PoppedWhenEmpty();
    int element = elements.get(--topOfStack); elements.remove(topOfStack);
    return element;
  }
}
```

Å holde funksjoner små og parameterlister korte kan føre til flere instansvariabler brukt av bare noen få metoder. Ofte betyr dette at det finnes en annen klasse som prøver å komme ut. Når klasser mister kohesjon, bør de deles!

---

## Vedlikehold av kohesjon gir mange små klasser

Å bryte opp store funksjoner i små gir ofte muligheten til å splitte ut flere små klasser. Dette gir bedre organisering og mer oversiktlig struktur.

Eksempel fra Knuths _Literate Programming_: Et program som skriver ut primtall kan brytes ned slik (se Listing 10-6 til 10-8):

- **PrimePrinter**: Hovedprogram, håndterer miljøet.
- **RowColumnPagePrinter**: Formaterer og skriver ut tall i tabellform.
- **PrimeGenerator**: Genererer primtall.

Hver klasse har ett ansvar og kan endres uavhengig av de andre.

---

## Organisering for endring

Endring er konstant. Hver endring utsetter oss for risiko for at systemet slutter å virke. I et rent system organiserer vi klasser for å redusere denne risikoen.

Eksempel: En klasse `Sql` som genererer SQL-strenger (Listing 10-9) må endres både når nye statement-typer skal støttes og når eksisterende funksjoner må endres. Dette bryter SRP.

Bedre løsning: Refaktorer ut hver statement-type til sin egen underklasse av `Sql` (Listing 10-10). Felles logikk flyttes ut i hjelpeklasser. Nå kan nye statementtyper legges til uten å endre eksisterende kode.

Dette støtter også **Open-Closed Principle (OCP)**: Klasser skal være åpne for utvidelse, men lukkede for modifikasjon.

---

## Isolering fra endring

Behov endrer seg, derfor må kode endres. En klientklasse som avhenger av konkrete detaljer er utsatt når disse endres. Vi kan introdusere grensesnitt og abstrakte klasser for å isolere effekten av slike detaljer.

Eksempel: Hvis `Portfolio` avhenger direkte av `TokyoStockExchange`, blir tester og fleksibilitet dårlig. Bedre: Definer et grensesnitt `StockExchange`, og la `Portfolio` ta inn dette i konstruktøren:

```java
public interface StockExchange {
  Money currentPrice(String symbol);
}

public class Portfolio {
  private StockExchange exchange;
  public Portfolio(StockExchange exchange) { this.exchange = exchange; }
  // ...
}
```

Da kan vi skrive tester med en testimplementasjon av `StockExchange` som gir faste verdier. Dette gjør systemet mer fleksibelt og gjenbrukbart.

Dette støtter **Dependency Inversion Principle (DIP)**: Klasser skal avhenge av abstraksjoner, ikke konkrete detaljer.

---

**Oppsummering:**

- Klasser skal være små, én grunn til endring.
- Høy kohesjon, lav kobling.
- Isolér endringer, bruk abstraksjoner.
- Organiser for fleksibilitet, testbarhet og vedlikehold.

---
