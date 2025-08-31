# Hvordan ville du bygget en by?

Kunne du håndtert alle detaljene selv? Sannsynligvis ikke. Selv det å administrere en eksisterende by er for mye for én person. Likevel fungerer byer (stort sett). De fungerer fordi byer har team av mennesker som administrerer bestemte deler av byen: vannsystemer, kraftsystemer, trafikk, politiet, bygningsforskrifter osv. Noen av disse menneskene har ansvar for helheten, mens andre fokuserer på detaljene.

Byer fungerer også fordi de har utviklet hensiktsmessige nivåer av abstraksjon og modularitet som gjør det mulig for enkeltindivider og «komponentene» de styrer å jobbe effektivt, selv uten å forstå helheten.

Selv om programvareteam ofte er organisert på samme måte, har ikke systemene de jobber på like god separasjon av ansvar og abstraksjonsnivåer. Ren kode hjelper oss å oppnå dette på de lavere abstraksjonsnivåene. I dette kapittelet skal vi se på hvordan vi holder oss rene på høyere nivåer – systemnivået.

---

## Skill mellom å konstruere et system og å bruke det

Bygging er veldig forskjellig fra bruk. Mens jeg skriver dette, ser jeg et nytt hotell bli bygget utenfor vinduet mitt i Chicago. I dag er det bare en betongboks med en kran og heis boltet fast utenpå. De travle menneskene der har på seg hjelmer og arbeidsklær. Om et år er hotellet ferdig. Kranen og heisen er borte. Bygget er rent, kledd i glassvinduer og pen maling. Folkene som jobber og bor der vil se helt annerledes ut.

Programvaresystemer bør skille mellom oppstartsprosessen – når applikasjonsobjektene konstrueres og avhengigheter «kobles sammen» – og den kjøretidslogikken som tar over etter oppstarten.

Oppstartsprosessen er et anliggende alle applikasjoner må håndtere. Det er den første bekymringen vi ser på i dette kapittelet. Separasjon av bekymringer er en av de eldste og viktigste designteknikkene i vårt fag.

Dessverre skiller ikke de fleste applikasjoner mellom dette. Koden for oppstarten er ad hoc og blandet inn med kjøretidslogikk. Her er et typisk eksempel:

```typescript
public getService() {
  if (service == null)
    service = new MyServiceImpl(...); // Godt nok for de fleste tilfeller?
  return service;
}
```

Dette er LAZY INITIALIZATION/EVALUATION-idiomet, og det har flere fordeler. Vi får ikke konstruksjonskostnadene før vi faktisk bruker objektet, og oppstartstiden kan bli raskere. Vi sørger også for at null aldri returneres.

Men nå har vi en hardkodet avhengighet til `MyServiceImpl` og alt som kreves i konstruktøren. Vi kan ikke kompilere uten å løse disse avhengighetene, selv om vi aldri bruker objektet i praksis!

Testing kan bli et problem. Hvis `MyServiceImpl` er et tungt objekt, må vi sørge for at en passende TEST DOUBLE eller MOCK OBJECT tilordnes service-feltet før denne metoden kalles under enhetstesting. Fordi vi har konstruksjonslogikk blandet med vanlig kjøretidsprosessering, må vi teste alle kjørebaner (for eksempel null-sjekken og dens blokk). Å ha begge disse ansvarene betyr at metoden gjør mer enn én ting, så vi bryter Single Responsibility Principle i liten skala.

Kanskje verst av alt: Vi vet ikke om `MyServiceImpl` er riktig objekt i alle tilfeller. Hvorfor må klassen med denne metoden kjenne den globale konteksten? Kan vi noen gang vite hvilket objekt som er riktig å bruke her? Er det i det hele tatt mulig at én type er riktig i alle sammenhenger?

Ett tilfelle av LAZY INITIALIZATION er ikke et alvorlig problem, selvsagt. Men det er vanligvis mange slike små oppstartsidiomer i applikasjoner. Dermed blir den globale oppstartstrategien (hvis det finnes en) spredd utover applikasjonen, med lite modularitet og ofte duplisering.

Hvis vi ønsker å bygge robuste, velstrukturerte systemer, må vi aldri la små, praktiske idiomer føre til at modulariteten bryter sammen. Oppstartsprosessen for objektkonstruksjon og wiring er intet unntak. Vi bør modularisere denne prosessen separat fra kjøretidslogikken, og sørge for at vi har en global og konsistent strategi for å løse de viktigste avhengighetene våre.

---

## Separation of Main

En måte å skille konstruksjon fra bruk på, er å flytte alle aspekter av konstruksjon til `main` eller moduler kalt av `main`, og designe resten av systemet med antakelse om at alle objekter allerede er konstruert og koblet opp riktig. (Se figur 11-1.)

Flyten er lett å følge: `main` bygger opp nødvendige objekter for systemet og sender dem til applikasjonen, som bare bruker dem. Legg merke til at alle avhengigheter peker én vei, vekk fra `main`. Applikasjonen vet ingenting om `main` og konstruksjonsprosessen – den forventer bare at alt er riktig bygd.

---

## Fabrikker

Noen ganger må applikasjonen selv ha kontroll over når et objekt lages. For eksempel i et ordresystem må applikasjonen selv opprette `LineItem`-instanser for å legge til en ordre. Da kan vi bruke ABSTRACT FACTORY-mønsteret for å gi applikasjonen kontroll over når objektene lages, men likevel holde konstruksjonsdetaljene utenfor applikasjonskoden. (Se figur 11-2.)

Nok en gang: Alle avhengigheter peker fra `main` mot applikasjonen. Applikasjonen er løsrevet fra detaljene rundt hvordan et `LineItem` lages. Den evnen holdes på `main`-siden gjennom for eksempel en `LineItemFactoryImplementation`. Likevel har applikasjonen full kontroll over når instanser bygges og kan til og med sende inn egne argumenter.

---

## Dependency Injection

En kraftig mekanisme for å skille konstruksjon fra bruk er Dependency Injection (DI), altså bruk av Inversion of Control (IoC) på avhengighetsstyring. IoC flytter sekundæransvar fra et objekt til andre objekter dedikert til det formålet, og støtter dermed Single Responsibility Principle. Når det gjelder avhengigheter, bør ikke et objekt ta ansvar for å instansiere sine egne avhengigheter – det skal overlate dette til en «autoritativ» mekanisme, og dermed invertere kontrollen. Siden oppsett er et globalt anliggende, vil denne mekanismen vanligvis være enten `main` eller en spesialcontainer.

JNDI-oppslag er en «delvis» implementasjon av DI, der et objekt ber en katalogserver om å levere en tjeneste med et bestemt navn:

```typescript
const myService = jndiContext.lookup('NameOfMyService') as MyService
```

Objektet som kaller, vet ikke hva slags objekt som faktisk returneres (så lenge det implementerer riktig grensesnitt), men objektet styrer fortsatt oppslaget.

Ekte Dependency Injection går ett steg lenger: Klassen tar ingen direkte steg for å løse avhengighetene sine – den er helt passiv. I stedet tilbyr den settere eller konstruktørargumenter (eller begge deler) til å injisere avhengighetene. Under konstruksjonen lager DI-containeren de nødvendige objektene (ofte ved behov) og bruker argumentene/setterne til å koble sammen avhengighetene. Hvilke objekter som faktisk brukes, spesifiseres via konfigurasjonsfil eller programmatisk i en konstruksjonsmodul.

Spring Framework er det mest kjente DI-rammeverket for Java. Her definerer du hvilke objekter som skal kobles sammen i en XML-konfigurasjon, så ber du om bestemte objekter ved navn i Java-koden. (Eksempel følger senere.)

Men hva med fordelene ved LAZY INITIALIZATION? Dette idiomet kan fortsatt brukes sammen med DI. For det første lager de fleste DI-containere ikke et objekt før det trengs. For det andre tilbyr mange containere mekanismer for å bruke fabrikker eller lage proxier, slik at man kan få LAZY EVALUATION og lignende optimaliseringer.

---

## Skalering

Byer vokser fra tettsteder, som vokser fra bosetninger. Først er veiene smale eller ikke-eksisterende, så blir de asfaltert og utvidet. Små bygg og tomme tomter fylles med større bygg, noen av disse blir til slutt erstattet med skyskrapere.

Tjenester som strøm, vann, avløp og internett kommer til etter hvert som folketetthet og bygningsmasse øker.

Denne veksten er ikke smertefri. Hvor mange ganger har du ikke stått i kø gjennom et veiarbeid og tenkt «Hvorfor bygde de den ikke bred nok med en gang!?» Men det kunne ikke vært annerledes. Hvem ville forsvart kostnaden ved en seksfelts motorvei gjennom en småby som bare forventer vekst? Hvem vil ha en slik vei gjennom byen sin?

Det er en myte at vi kan få systemer «riktige på første forsøk». I stedet bør vi implementere dagens behov nå, og så refaktorere og utvide systemet for nye behov senere. Dette er essensen av iterativ og inkrementell smidighet. Testdrevet utvikling, refaktorering og ren kode gjør dette mulig på kodenivå.

Men hva med systemnivået? Krever ikke systemarkitektur forhåndsplanlegging? Kan arkitekturen virkelig vokse inkrementelt fra enkelt til komplekst?

Programvaresystemer er unike sammenlignet med fysiske systemer. Arkitekturen deres kan vokse inkrementelt, hvis vi holder ansvarene adskilt.

Programvarens flyktige natur gjør dette mulig. La oss først vurdere et moteksempel på en arkitektur som ikke separerer ansvar godt nok.

De opprinnelige EJB1- og EJB2-arkitekturene separerte ikke ansvar godt nok, og påførte dermed unødvendige barrierer for organisk vekst. Tenk på en entitetsbønne for en vedvarende Bank-klasse. En entitetsbønne er en in-memory-representasjon av relasjonsdata, altså en tabellrad.

Først måtte du definere et lokalt (i prosess) eller eksternt (annen JVM) grensesnitt, som klientene brukte. (Se Listing 11-1 for et mulig lokalt grensesnitt.)

```java
package com.example.banking;
import java.util.Collections;
import javax.ejb.*;
public interface BankLocal extends java.ejb.EJBLocalObject {
    String getStreetAddr1() throws EJBException;
    String getStreetAddr2() throws EJBException;
    String getCity() throws EJBException;
    String getState() throws EJBException;
    String getZipCode() throws EJBException;
    void setStreetAddr1(String street1) throws EJBException;
    void setStreetAddr2(String street2) throws EJBException;
    void setCity(String city) throws EJBException;
    void setState(String state) throws EJBException;
    void setZipCode(String zip) throws EJBException;
    Collection getAccounts() throws EJBException;
    void setAccounts(Collection accounts) throws EJBException;
    void addAccount(AccountDTO accountDTO) throws EJBException;
}
```

Deretter hadde du en tilhørende implementasjonsklasse for Bank-bønnen (se Listing 11-2).

```java
package com.example.banking;
import java.util.Collections;
import javax.ejb.*;
public abstract class Bank implements javax.ejb.EntityBean {
    // Forretningslogikk...
    public abstract String getStreetAddr1();
    public abstract String getStreetAddr2();
    public abstract String getCity();
    public abstract String getState();
    public abstract String getZipCode();
    public abstract void setStreetAddr1(String street1);
    public abstract void setStreetAddr2(String street2);
    public abstract void setCity(String city);
    public abstract void setState(String state);
    public abstract void setZipCode(String zip);
    public abstract Collection getAccounts();
    public abstract void setAccounts(Collection accounts);
    public void addAccount(AccountDTO accountDTO) {
        InitialContext context = new InitialContext();
        AccountHomeLocal accountHome = context.lookup("AccountHomeLocal");
        AccountLocal account = accountHome.create(accountDTO);
        Collection accounts = getAccounts();
        accounts.add(account);
    }
    // EJB container-logikk
    public abstract void setId(Integer id);
    public abstract Integer getId();
    public Integer ejbCreate(Integer id) { ... }
    public void ejbPostCreate(Integer id) { ... }
    // Resten måtte implementeres, men var ofte tomme:
    public void setEntityContext(EntityContext ctx) {}
    public void unsetEntityContext() {}
    public void ejbActivate() {}
    public void ejbPassivate() {}
    public void ejbLoad() {}
    public void ejbStore() {}
    public void ejbRemove() {}
}
```

Til slutt måtte du skrive én eller flere XML-deploymentsbeskrivelser som spesifiserte objekt-relasjonsmappingen, ønsket transaksjonsatferd, sikkerhetskrav osv.

Forretningslogikken er tett koblet til EJB2-applikasjonscontaineren. Du må subklasse containertyper, og du må implementere mange livssyklusmetoder som containeren krever.

Dette gjør isolerte enhetstester vanskelige. Du må mocke ut containeren, noe som er krevende, eller bruke mye tid på å deploye EJB-er og tester til en ekte server. Gjenbruk utenfor EJB2-arkitekturen er i praksis umulig grunnet tett kobling.

Selv objektorientering blir undergravd. Én bønne kan ikke arve fra en annen. Legg merke til logikken for å legge til en ny konto. Det er vanlig i EJB2-bønner å bruke «data transfer objects» (DTO-er), som i praksis er «structs» uten oppførsel. Dette leder vanligvis til redundante typer med stort sett samme data og krever mye boilerplate for å kopiere data mellom objekter.

---

## Tverrgående bekymringer («Cross-Cutting Concerns»)

EJB2-arkitekturen nærmer seg separasjon av ansvar i noen områder. For eksempel deklareres ønsket transaksjons-, sikkerhets- og noen persistensatferder i deploy-beskrivelsene, uavhengig av kildekoden.

Merk at bekymringer som persistens ofte skjærer på tvers av de naturlige objektgrensene i et domene. Du ønsker å persistere alle objektene dine med samme strategi – f.eks. bruke et bestemt DBMS, følge visse navnekonvensjoner, ha konsistente transaksjoner, osv.

I prinsippet kan du tenke på persistensstrategi modulært og innkapslet. Men i praksis må du spre mye av koden som implementerer denne strategien utover mange objekter. Dette kalles tverrgående bekymringer. Persistensrammeverket kan være modulært, og domenelogikken isolert kan være modulær. Problemet er det fine sammensuriet i skjæringspunktet mellom disse domenene.

Måten EJB-arkitekturen håndterte persistens, sikkerhet og transaksjoner på, «antegnet» aspect-oriented programming (AOP) – som er en generell tilnærming til å gjenskape modularitet for slike tverrgående bekymringer.

I AOP spesifiserer modulære konstruksjoner kalt aspekter hvilke punkter i systemet som skal få modifisert oppførselen på en konsistent måte for å støtte en bestemt bekymring – dette gjøres deklarativt eller programmessig.

---

## Optimaliser beslutningstaking

Modularitet og separasjon av ansvar muliggjør desentralisert ledelse og beslutningstaking. I et stort nok system, enten det er en by eller et programvareprosjekt, kan ikke én person ta alle avgjørelser.

Vi vet alle at det er best å gi ansvar til de mest kvalifiserte. Vi glemmer ofte at det også er best å utsette beslutninger til siste mulige øyeblikk. Dette er ikke latskap, det gjør oss i stand til å ta avgjørelser på best mulig grunnlag. En prematur avgjørelse tas med suboptimal informasjon. Vi får mindre tilbakemelding fra kunder, mindre tid til refleksjon, og mindre erfaring med våre valg hvis vi bestemmer oss for tidlig.

Smidigheten i et POJO-system med modulariserte bekymringer lar oss ta optimale, just-in-time beslutninger, basert på den nyeste kunnskapen. Kompleksiteten i disse beslutningene reduseres også.

---

## Bruk standarder klokt, når de gir demonstrerbar verdi

Byggeprosesser er fascinerende å observere – både tempoet nye bygg reiser seg i (selv midt på vinteren) og de ekstraordinære designene dagens teknologi tillater. Bygg- og anleggsbransjen er moden, med optimaliserte deler, metoder og standarder utviklet gjennom århundrer.

Mange team brukte EJB2-arkitekturen fordi det var en standard, selv når lettere og enklere design hadde vært nok. Jeg har sett team bli så opptatt av ulike hypede standarder at de mister fokus på å levere verdi for kunden.

Standarder gjør det enklere å gjenbruke ideer og komponenter, rekruttere folk med relevant erfaring, innkapsle gode idéer og koble sammen komponenter. Men prosessen med å lage standarder kan ta for lang tid for industrien å vente, og noen standarder mister kontakten med de virkelige behovene til brukerne.

---

## Systemer trenger domenespesifikke språk

Bygg og anlegg har, som de fleste domener, utviklet et rikt språk – vokabular, idiomer og mønstre som formidler essensiell informasjon klart og konsist. I programvare har det vært økt interesse for å lage domenespesifikke språk (DSL-er), altså egne små skriptspråk eller API-er i standardspråk som lar kode skrives slik at den ligner strukturert prosa en domeneekspert kunne skrevet.

Et godt DSL minimerer «kommunikasjonsgapet» mellom et domenekonsept og koden som implementerer det, på samme måte som smidige praksiser optimaliserer kommunikasjonen i teamet og med interessenter. Hvis du implementerer domenelogikk i samme språk som en domeneekspert bruker, er risikoen for feiltolkning mindre.

DSL-er, brukt effektivt, løfter abstraksjonsnivået over kodeidiomer og designmønstre. De lar utvikleren avdekke hensikten med koden på riktig nivå.

Domain-Specific Languages gjør at alle abstraksjonsnivåer og domener i applikasjonen kan uttrykkes som POJO-er, fra høynivå-policy til lavnivådetaljer.

---

## Konklusjon

Systemer må også være rene. En invasiv arkitektur overskygger domenelogikken og hemmer smidighet. Når domenelogikken skjules, lider kvaliteten – feil skjuler seg lettere, og nye historier blir vanskeligere å implementere. Hvis smidigheten går tapt, går produktiviteten ned, og fordelene med TDD forsvinner.

På alle abstraksjonsnivåer bør intensjonen være tydelig. Dette skjer bare hvis du skriver POJO-er og bruker «aspect»-lignende mekanismer for å inkorporere andre implementasjonsdetaljer ikke-invasivt.

Enten du designer systemer eller individuelle moduler, ikke glem å bruke det enkleste som kan fungere.

---
