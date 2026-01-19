# Konfigurer og tilpass informasjonskapsler

Denne siden er for utviklere som ønsker å tilpasse innstillinger for
informasjonskapsler med Google-taggen eller Google Tag Manager. Hvis du ikke er
sikker på om du trenger å konfigurere informasjonskapsler, les
[Informasjonskapsler og brukeridentifikasjon](https://support.google.com/analytics/answer/11397207).

---

Som standard bruker Google-tagger automatisk konfigurasjon av
informasjonskapseldomene. Informasjonskapsler settes på høyest mulig domenenivå.
For eksempel, hvis nettstedadressen din er `blog.example.com`, settes
informasjonskapsler på domenet `example.com`.

For de fleste nettsteder og apper bør lagring av informasjonskapsler også styres
av brukersamtykke.
[Oversikt over brukerpersonvern](https://support.google.com/analytics/answer/12017362)
introduserer de tilgjengelige alternativene for å administrere brukersamtykke.

> **Merk:** Hvis du bruker Google-taggen og har flere produkter på en side som
> deler informasjonskapsler, bruk `gtag('set')`-kommandoer i stedet for
> `gtag('config')` for konfigurasjonsinnstillingene for informasjonskapsler.
> Dette gir deg mer konsistente resultater.

---

## Endre informasjonskapseldomene

> **Viktig:** Verdien for `cookie_domain` må være en forløper til det nåværende
> domenet, ellers vil ikke informasjonskapselen bli satt. For eksempel, hvis
> domenet ditt er `one.two.three.root.com`, kan du konfigurere
> informasjonskapselen til å bli satt på `root.com`, men ikke på
> `someotherdomain.com`.

For å gjøre endringer i konfigurasjonen av informasjonskapseldomenet, følg disse
trinnene:

### Med Tag Manager

#### For Google-taggen:

1.  I arbeidsområdet ditt, åpne **Tags**-menyen.
2.  Rediger en eksisterende Google-tagg eller opprett en ny.
3.  I **Configuration settings**, legg til en ny parameter:
    - **Name:** `cookie_domain`
    - **Value:** `my.example.com`
4.  Lagre taggen og publiser containeren.

#### For Google Ads- og Floodlight-tagger:

Domeneinnstillinger kan endres fra **Conversion Linker**-taggen:

1.  I Tag Manager, åpne din eksisterende **Conversion Linker**-tagg.
2.  Under **Linker Options**, klikk på **Override cookie settings (advanced)**.
3.  I **Domain**-feltet, skriv inn det høyeste nivået av domenet som en
    informasjonskapsel skal kunne settes for.

---

## Gi informasjonskapsler nytt navn

For å unngå konflikter med andre informasjonskapsler, kan det være nødvendig å
endre navnet på informasjonskapselen.

> **Viktig:** Hvis innstillingene for informasjonskapselnavn endres etter at
> brukere først har besøkt nettstedet ditt, vil disse besøkende fremstå som nye
> besøkende fordi konteksten som er lagret i de umodifiserte
> informasjonskapslene vil gå tapt.

### Med Tag Manager

#### For Google-taggen:

1.  I arbeidsområdet ditt, åpne **Tags**-menyen.
2.  Rediger en eksisterende Google-tagg eller opprett en ny.
3.  I **Configuration settings**, legg til en ny parameter:
    - **Name:** `cookie_prefix`
    - **Value:** `example`
4.  Lagre taggen og publiser containeren.

#### For Google Ads- og Floodlight-tagger:

Navneprefiksinnstillinger kan endres fra **Conversion Linker**-taggen:

1.  I Tag Manager, åpne din eksisterende **Conversion Linker**-tagg.
2.  Under **Linker Options**, klikk på **Override cookie settings (advanced)**.
3.  I **Name prefix**-feltet, skriv inn ønsket navneprefiks.

---

## Utløpstid for informasjonskapsler

Ved hver sideinnlasting oppdateres utløpstiden for informasjonskapselen til å
være gjeldende tidspunkt pluss verdien for utløpstid satt av Google-taggen.

Hvis du setter verdien for utløpstid til `0` (null) sekunder, blir
informasjonskapselen en øktbasert informasjonskapsel og utløper når den
nåværende nettleserøkten avsluttes.

### Med Tag Manager

#### For Google-taggen:

1.  I arbeidsområdet ditt, åpne **Tags**-menyen.
2.  Rediger en eksisterende Google-tagg eller opprett en ny.
3.  I **Configuration settings**, legg til en ny parameter:
    - **Name:** `cookie_expires`
    - **Value:** `2419200` (dette tilsvarer 28 dager i sekunder)
4.  Lagre taggen og publiser containeren.

> **Merk:** Google Ads- og Floodlight-informasjonskapsler satt av Conversion
> Linker-taggen støtter ikke `cookie_expires` for øyeblikket. Hvis støtte for
> `cookie_expires` er nødvendig, bruk **gtag.js** for denne tag-konfigurasjonen.

---

## Oppdatering av informasjonskapsler

Når `cookie_update`-flagget er satt til `true` (standardverdien), kan
Google-tagger oppdatere informasjonskapsler ved hver sideinnlasting og oppdatere
utløpstiden relativt til det siste besøket.

Når det er satt til `false`, oppdateres ikke informasjonskapsler ved hver
sideinnlasting. Dette fører til at utløpstiden for informasjonskapselen er
relativ til første gang en bruker besøkte nettstedet.

### Med Tag Manager

#### For Google-taggen:

1.  I arbeidsområdet ditt, åpne **Tags**-menyen.
2.  Rediger en eksisterende Google-tagg eller opprett en ny.
3.  I **Configuration settings**, legg til en ny parameter:
    - **Name:** `cookie_update`
    - **Value:** `false`
4.  Lagre taggen og publiser containeren.

> **Merk:** Google Ads- og Floodlight-informasjonskapsler satt av Conversion
> Linker-taggen støtter ikke `cookie_update` for øyeblikket. Hvis støtte for
> `cookie_update` er nødvendig, bruk **gtag.js** for denne tag-konfigurasjonen.
