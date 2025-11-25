## 3.1 Hypotese om "Contextual Data Loss" (Kontekstuelt Datatap)

### Hypotese

Siden Purchase-eventet ofte feiler i browser (klient-side) og kun reddes av CAPI
(server-side), mister Meta verdifull kontekstuell data ("snapshotet" av
brukerens miljø: batteritid, scrollehastighet, nøyaktig tidsstempel,
musbevegelser, cookie-kontekst).

**Spørsmål:** Ved å bytte til InitiateCheckout (som skjer før redirect), fanger
vi 100% av denne kontekstuelle dataen. Vil dette gi algoritmen bedre
treningsgrunnlag (bedre "Estimated Action Rate"-beregninger) enn et "nakent"
CAPI-Purchase event?

### Analyse

Denne hypotesen berører et fundamental avveining mellom **datarikdom** og
**signalverdi**.

#### Realiteten ved CAPI-Datatap

Det er korrekt, som dokumentert i seksjon 2.1, at en ren CAPI-hendelse mangler
telemetri-data som:

- Musebevegelser
- Enhetsstatus
- Scrollehastighet
- Batteritid
- Nøyaktig tidsstempel

Meta bruker disse signalene aktivt til sine integritetssystemer for å filtrere
bort ugyldig trafikk (IVT) og roboter.[^17] Et "nakent" CAPI-event er
vanskeligere for Meta å validere som "ekte menneskelig adferd" i sanntid
sammenlignet med et Pixel-event. Dette kan teoretisk føre til:

- Lavere "User Value"-score
- Lavere intern tillitsscore for hendelsen
- Negativ påvirkning på auksjonsytelsen[^25]

#### Risiko ved å Bytte til InitiateCheckout

Imidlertid er det en betydelig risiko ved å bytte optimaliseringsmål til
InitiateCheckout (IC) for å fange denne dataen:

##### 1. Verdisignalet er Svakere

EAR-algoritmen trenes best på data som ligger så tett opp mot det faktiske
forretningsmålet som mulig. Forskjellen i intensjon mellom:

- **En bruker som starter utsjekk** (InitiateCheckout)
- **En bruker som fullfører et kjøp** (henter lommebok, taster kortinfo,
  bekrefter med BankID)

...er **enorm**. Ved å optimalisere for IC, ber du algoritmen finne folk som er
tilbøyelige til å starte prosessen, ikke nødvendigvis fullføre den.

##### 2. Proxy-optimaliseringens Feller

Selv med høy korrelasjon i egne data (99% overgang), opererer Meta i et
økosystem med milliarder av brukere. Det finnes segmenter av brukere som er:

- "Serielle handlekurv-fyllere"
- "Window shoppers"

Disse er ofte **billigere å nå** (lavere CPM) enn faktiske kjøpere. Hvis
algoritmen får beskjed om å skaffe IC til lavest mulig pris, vil den gradvis
styre visningene mot disse brukerne. Over tid vil dette:

- Degradere trafikkvaliteten
- Redusere den faktiske konverteringsraten til kjøp[^26]

##### 3. Manglende Value-Based Optimization (VBO)

InitiateCheckout har sjelden en bekreftet pengeverdi knyttet til seg på samme
måte som et Purchase. Du mister dermed muligheten til å bruke:

- ROAS-mål (Return on Ad Spend)
- "Highest Value" budstrategier

...effektivt, da systemet mangler et konkret verdisignal å optimalisere
mot.[^27]

### Konklusjon

Selv om tapet av kontekstuell data ved CAPI-only Purchase er reelt, er **tapet
av selve kjøpssignalet som optimaliseringsmål langt mer kritisk**.

**Verdien av å fortelle algoritmen "denne brukeren brukte faktisk penger"
overgår verdien av å fortelle "denne brukeren beveget musen og startet
utsjekk".**

**Anbefaling:** Det anbefales derfor ikke å bytte optimaliseringshendelse basert
på denne hypotesen alene. Løsningen bør heller være å forbedre datarikdommen i
CAPI-signalet (se seksjon 4).

---

## 3.4 Hypotese om Proxy-optimalisering (IC som Erstatning for Purchase)

### Hypotese

Gitt en 99% korrelasjon mellom IC og Purchase:

**Spørsmål:** Finnes det noen skjulte nedsider ved denne strategien? (F.eks. at
algoritmen bevisst oppsøker "window shoppers" selv om vår data tilsier at disse
ikke eksisterer i vårt segment?)

### Analyse

Som diskutert i seksjon 3.1, innebærer denne strategien en betydelig risiko,
ofte referert til som **"Conversion Rate Ranking"-fellen**.

#### Problemet med Korrelasjon vs. Kausalitet

Selv om dine interne data viser 99% korrelasjon (fordi din nåværende trafikk er
høykvalitets trafikk som faktisk kjøper når de først legger i kurven), vil **en
endring i optimaliseringsmål endre hvem Meta viser annonsene til**.

#### Algoritmen Søker Minste Motstands Vei

##### Kostnadsforskjell

- **Cost per Purchase (CPP)** er dyrt fordi konkurransen om kjøpere er høy
- **Cost per Initiate Checkout (CPIC)** er lavere fordi volumet er større og
  konkurransen noe lavere

##### Konsekvensen av Målendring

Hvis du endrer målet til IC, frigjør du algoritmen fra kravet om at brukeren
skal fullføre kjøpet. I Meta sitt enorme økosystem finnes det millioner av
brukere som:

1. Elsker å klikke på annonser
2. Legger varer i handlekurven
3. Starter utsjekk for å se totalpris med frakt
4. **Sjelden fullfører kjøpet**

Disse brukerne har:

- **Høy EAR for IC** ✓
- **Lav EAR for Purchase** ✗

#### Degradering Over Tid

Ved å optimalisere for IC, vil algoritmen gradvis begynne å vinne auksjoner for
disse "billige" IC-brukerne for å oppfylle ditt mål til lavest mulig pris.

**Tidslinje:** Over en periode på 4-8 uker kan dette føre til at korrelasjonen
din på 99% begynner å synke drastisk, fordi trafikkblandingen endres fra:

- **"Kjøpere"** → **"Kikkere"**[^27]

### Konklusjon

Risikoen for å "lære opp" algoritmen til å finne feil type brukere er **reell og
dokumentert**.

For en etablert konto med tilstrekkelig kjøpsvolum, er **nedsiden ved
proxy-optimalisering større enn oppsiden ved økt datavolum**.

---

[^17]: Meta's Integrity Systems for Invalid Traffic Detection

[^25]: Meta Ads Auction Performance Factors

[^26]: Traffic Quality Degradation in Proxy Optimization

[^27]: Value-Based Optimization Best Practices
