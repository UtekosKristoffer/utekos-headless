# Concurrency

Å skrive ren, samtidig kode er vanskelig—veldig vanskelig. Det er mye enklere å skrive kode som kjører i en enkelt tråd. Det er også lett å skrive flertrådet kode som ser ut til å fungere, men som er ødelagt på et dypere nivå. Slik kode fungerer helt fint inntil systemet utsettes for belastning.

I dette kapittelet diskuterer vi behovet for samtidighet og utfordringene det medfører. Vi gir flere anbefalinger for å håndtere disse utfordringene og skrive ren, samtidig kode. Til slutt tar vi opp temaer relatert til testing av samtidig kode.

> **Merk:** Ren samtidighet er et komplekst tema, verdig en egen bok. Strategien her er å gi et overblikk, og senere en mer detaljert veiledning i "Concurrency II". Er du bare nysgjerrig, holder dette kapittelet. Vil du forstå samtidighet dypere, bør du lese gjennom hele veiledningen.

---

## Hvorfor samtidighet?

Samtidighet er en strategi for å løsrive _hva_ som skal gjøres fra _når_ det skal gjøres. I enkelttrådede applikasjoner er _hva_ og _når_ så tett koblet at systemets tilstand ofte kan bestemmes ved å se på stack backtrace. En utvikler kan sette et breakpoint og vite tilstanden basert på hvilke breakpoints som treffes.

Å løsrive _hva_ fra _når_ kan dramatisk forbedre både ytelse og struktur i en applikasjon. Strukturelt ser applikasjonen ut som mange små, samarbeidende "datamaskiner" i stedet for én stor hovedløkke. Dette gjør systemet lettere å forstå og gir sterke muligheter for å separere ansvar.

Eksempel: "Servlet"-modellen for webapplikasjoner. Servlet-programmereren trenger ikke håndtere alle innkommende forespørsler; hver servletkjøring er asynkron og isolert fra andre. Men denne løsrivelsen er langt fra perfekt; servlet-programmereren må fortsatt være svært bevisst på korrekt samtidighet.

Noen systemer har også responstid- og gjennomstrømningskrav som krever håndkodede samtidige løsninger. Eksempel: En enkelttrådet aggregator som henter informasjon fra mange nettsider vil til slutt bruke mer enn 24 timer hvis antall kilder øker, fordi hver side hentes sekvensielt. En samtidig løsning kan hente flere sider parallelt.

Et annet eksempel: Et system som håndterer én bruker om gangen, hvor hver brukerprosess tar ett sekund. Systemet blir raskt tregt når antall brukere øker. Løsning: Håndter flere brukere samtidig.

---

## Myter og misforståelser

- **Samtidighet gir alltid bedre ytelse.**  
  Nei, kun når det er mye ventetid som kan fordeles mellom flere tråder/prosessorer.
- **Designet endrer seg ikke ved samtidighet.**  
  Feil. Designet blir ofte radikalt annerledes.
- **Man trenger ikke forstå samtidighet hvis man bruker containere (Web/EJB).**  
  Feil. Du må forstå hva containeren gjør og hvordan du beskytter mot samtidige oppdateringer og deadlocks.

Noen balanserte sannheter:

- Samtidighet gir overhead, både i ytelse og i kodekompleksitet.
- Korrekt samtidighet er komplekst, selv for enkle problemer.
- Samtidighetsfeil er sjelden repeterbare og blir ofte ignorert som "one-offs".

---

## Hvorfor er samtidig programmering vanskelig?

Se på dette trivielle eksempelet:

```java
public class X {
    private int lastIdUsed;
    public int getNextId() { return ++lastIdUsed; }
}
```

Hvis to tråder kaller `getNextId()` samtidig, kan du få flere mulige utfall—også feilaktige. Det finnes tusenvis av mulige utføringsveier gjennom denne ene linjen kode, og noen gir feil resultat.

---

## Prinsipper for å forsvare deg mot samtidighetsproblemer

### Single Responsibility Principle (SRP)

Samtidighetsdesign er komplisert nok til å være en egen grunn til endring, og bør derfor separeres fra resten av koden.

**Anbefaling:** Hold samtidighetskoden adskilt fra annen kode.

#### Korollar: Begrens datatilgang

Jo flere steder data kan endres fra flere tråder, jo vanskeligere er det å beskytte alt og feilsøke.

**Anbefaling:** Ta innkapsling på alvor; begrens tilgang til delte data så mye som mulig.

#### Korollar: Bruk kopier av data

Unngå deling av data hvis du kan. Bruk kopier og samle resultater fra flere tråder etterpå.

#### Korollar: Tråder skal være så uavhengige som mulig

Skriv kode slik at hver tråd opererer på sitt eget datasett, uten å dele med andre tråder.

---

## Kjenn ditt bibliotek

- Bruk trådsikre collections (`java.util.concurrent`)
- Bruk executor-rammeverk for å kjøre uavhengige oppgaver
- Foretrekk ikke-blokkerende løsninger
- Vær klar over at ikke alle klasser er trådsikre

Eksempel: `ConcurrentHashMap` gir bedre ytelse og trådsikkerhet enn `HashMap`.

**Anbefaling:** Gjør deg kjent med relevante biblioteker for samtidighet.

---

## Kjenn dine eksekveringsmodeller

- **ReentrantLock:** Lås som kan tas i én metode og slippes i en annen.
- **Semaphore:** Klassisk tellelås.
- **CountDownLatch:** Venter på at et antall hendelser skal inntreffe før tråder slippes løs.
- **Mutual Exclusion:** Kun én tråd kan aksessere en ressurs om gangen.
- **Starvation:** Tråder som aldri får kjøre.
- **Deadlock:** Tråder venter på hverandre i det uendelige.
- **Livelock:** Tråder gjør arbeid men kommer ingen vei.

---

## Kjernealgoritmer

- **Producer-Consumer:** Produsenter legger arbeid i en kø, konsumere henter fra den. Koordineres via signaler.
- **Readers-Writers:** Ressurs som leses ofte og skrives sjelden. Balanserer gjennomstrømning og korrekthet.
- **Dining Philosophers:** Modell for konkurranse om ressurser; illustrerer deadlock, livelock og effektivitet.

**Anbefaling:** Lær disse algoritmene grundig.

---

## Vær obs på avhengigheter mellom synkroniserte metoder

Unngå å bruke flere metoder på samme delte objekt. Hvis du må, bruk en av følgende strategier:

- Klient-baserte låser: Klienten låser serveren før første kall.
- Server-baserte låser: Serveren tilbyr en metode som låser alt som trengs.
- Adapter/server: En mellommann gjør låsingen hvis serveren ikke kan endres.

---

## Hold synkroniserte seksjoner små

Låser er dyre. Kritiske seksjoner må beskyttes, men ikke mer enn nødvendig. Store synkroniserte seksjoner gir dårlig ytelse.

**Anbefaling:** Hold synkroniserte seksjoner så små som mulig.

---

## Avslutningshåndtering er vanskelig

Å skrive korrekt nedstengning for trådbasert kode er vanskelig og tidkrevende. Vanlige problemer inkluderer deadlock og hengende tråder.

**Anbefaling:** Tenk på nedstengning tidlig, og få det til å fungere tidlig.

---

## Testing av trådet kode

Det er umulig å bevise at kode er korrekt, men god testing minimerer risikoen. Testing av samtidig kode er mye vanskeligere enn for enkelttrådet kode.

**Anbefaling:** Skriv tester som kan avsløre problemer, og kjør dem ofte, med ulike konfigurasjoner og last.

Andre anbefalinger:

- Behandle tilfeldige feil som sannsynlige trådfeil
- Få ikke-trådet kode til å fungere først
- Gjør trådet kode pluggbar og tunbar
- Kjør med flere tråder enn prosessorer
- Kjør på forskjellige plattformer
- Instrumenter koden for å prøve å fremtvinge feil

### Instrumentering

For å øke sjansen for å avsløre sjeldne feil, kan du legge inn kall til `wait()`, `sleep()`, `yield()` eller endre prioritet i koden for å endre kjøreorden.

Eksempel:

```java
public synchronized String nextUrlOrNull() {
    if (hasNext()) {
        String url = urlGenerator.next();
        Thread.yield(); // satt inn for å fremprovosere feil
        updateHasNext();
        return url;
    }
    return null;
}
```

Dette kan gjøres manuelt eller med automatiserte verktøy (f.eks. Aspect-Oriented Frameworks, CGLIB, ASM, eller IBM ConTest).

---

## Konklusjon

Samtidig kode er vanskelig å få riktig. Hvis du må skrive samtidig kode, må du gjøre det med disiplin og fokus på renhet. Følg SRP: Skill ut trådbevisst kode fra tråd-ignorant kode. Kjenn mulige kilder til problemene, og hold mengden delte objekter og omfanget av deling så smalt som mulig.

Test i mange konfigurasjoner og på mange plattformer. Instrumenter koden din for å finne feil tidlig. Bruk tid på å perfeksjonere og validere trådbasert kode før produksjon. Med en ren tilnærming øker du sjansen for å få det riktig betraktelig.

---
