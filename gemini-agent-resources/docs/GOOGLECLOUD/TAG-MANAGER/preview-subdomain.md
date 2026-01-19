# Konfigurer en privat forhåndsvisningsserver

Denne veiledningen er for utviklere som bruker Cloud Run for tagging på
serversiden og ønsker å sette opp en privat forhåndsvisningsserver.

---

Tagging på serversiden lar deg forhåndsvise endringer i tagger i
forhåndsvisnings- og feilsøkingsmodus før du tar dem i bruk. Dette er en kritisk
del av utviklingsarbeidsflyten for å sikre at taggene dine fungerer som
tiltenkt. For å aktivere denne muligheten kreves to Cloud Run-distribusjoner: en
for en taggingsserver og en for en forhåndsvisningsserver. Denne veiledningen
gir mer informasjon om hvordan de to serverne kommuniserer og hvordan du kan
konfigurere dem i et bedriftsmiljø.

## Oversikt

Når du distribuerer tagging på serversiden til Cloud Run, kan du distribuere den
med eller uten en lastbalanser. For distribusjoner i flere regioner trenger du
en lastbalanser for å dirigere trafikk til nærmeste instans.

### Uten lastbalanser

_Figur 1: Distribusjon uten lastbalanser._

### Med lastbalanser

I begge distribusjonene er inngangspunktet for både forhåndsvisningsserveren og
produksjonstaggingsmiljøet den samme URL-en (for eksempel `sgtm.example.com`).
Taggingsserveren er distribuert med en miljøvariabel kalt `PREVIEW_SERVER_URL`
som representerer URL-en til forhåndsvisningsserveren.

Når du besøker `tagmanager.google.com` og åpner forhåndsvisningsmodus, navigerer
Tag Manager til
`sgtm.example.com?id=[gtm_server_id]&gtm_auth=[auth_id]&gtm_preview=[env_id]` og
setter en informasjonskapsel. Når du deretter bruker den samme nettleseren til å
utforske målnettstedet, videresender også forespørsler sendt til
`sgtm.example.com` informasjonskapselen. På grunn av informasjonskapselen vet
taggingsserveren at dette er dine hendelser, så den videresender kun hendelsene
dine til forhåndsvisningsserveren slik at du kan se og feilsøke dem.

Taggingsserveren videresender disse hendelsene ved å gjøre HTTP-forespørsler til
URL-en som er angitt i miljøvariabelen `PREVIEW_SERVER_URL`.

---

## Om offentlig tilgjengelige forhåndsvisningsservere

Denne standardoppførselen krever at forhåndsvisningsserveren din er offentlig.
Dette er imidlertid problematisk for noen organisasjoner, da de har
restriksjoner på hvilken infrastruktur som kan være offentlig tilgjengelig og
vanligvis håndhever ytterligere sikkerhetstiltak gjennom en lastbalanser.

En lastbalanser gir deg:

- Mer kontroll over funksjoner som SSL-policyer for å begrense chifferpakker.
- Innebygd integrasjon med Cloud Armor for brannmur for webapplikasjoner (WAF)
  eller distribuert tjenestenekt (DDoS).
- Avanserte funksjoner for trafikkstyring.

---

## Rut forhåndsvisningsserveren din gjennom en lastbalanser

For å lage en privat forhåndsvisningsserver, bruk vertsbasert ruting gjennom
lastbalanseren med et ekstra underdomene. Resten av denne veiledningen forklarer
hvordan du ruter forhåndsvisningsserveren din gjennom en lastbalanser.

### Forutsetninger

- Taggingsserveren er distribuert på Cloud Run bak en lastbalanser.
- Tilgang til Google Cloud-prosjektet.
- Tilgang til et nytt underdomene for forhåndsvisningsserveren, for eksempel
  `preview.sgtm.example.com`.

### Trinn 1: Oppdater miljøvariabelen med et nytt underdomene

For å bruke det nye forhåndsvisningsserverdomenet, oppdater miljøvariabelen
`PREVIEW_SERVER_URL` på taggingsserveren på serversiden:

1.  Åpne **Cloud Run**.
2.  Velg taggingsserveren.
3.  Klikk på **Rediger og distribuer ny revisjon**.
4.  Under fanen **Variabler og hemmeligheter**, i seksjonen **Beholdere**, endre
    `PREVIEW_SERVER_URL` til det nye domenet. For eksempel:
    `preview.sgtm.example.com`.

### Trinn 2: Konfigurer den eksisterende lastbalanseren til å bruke vertsbasert ruting

For å konfigurere den eksisterende lastbalanseren, bruk vertsbasert ruting og
send trafikk til riktig server:

1.  I Cloud Run, åpne siden **Lastbalansering** og klikk på navnet på
    lastbalanseren din.
2.  Klikk på **Rediger**-knappen.
3.  Klikk på siden **Backend-konfigurasjon** og åpne nedtrekksmenyen for
    **Backend-tjenester og backend-bøtter**.
4.  Klikk på **Opprett en backend-tjeneste** og fullfør følgende:
    - Gi den et passende navn (f.eks. `preview-backend-service`).
    - Velg backend-typen som **Serverless network endpoint group**.
    - I **Backend**-seksjonen, opprett en ny serverless network endpoint group
      og fullfør følgende:
      - Gi den et navn og velg regionen der forhåndsvisningsserveren er vert.
      - Velg **Cloud Run** som serverless network endpoint group-type, og
        forhåndsvisningsserveren som tjeneste.
      - Klikk **Opprett**.
    - Endre andre innstillinger etter behov, eller behold
      standardinnstillingene, og klikk **Opprett**.

### Trinn 3: Legg til en ny regel og oppdater inngangskontrollen

Slik legger du til en regel for den nye verts-URL-en og oppdaterer
inngangskontrollen:

1.  Åpne siden **Verts- og baneregler**.
2.  Legg til en ny regel der:
    - **Verten** er den nye URL-en: `preview.sgtm.example.com`
    - **Banen** er: `/*`
    - **Backend** er: `preview-backend-service`
3.  Klikk på **Oppdater**-knappen for å distribuere lastbalanseren på nytt.
4.  Tilbake i Cloud Run, åpne forhåndsvisningsserveren, og velg fanen
    **Nettverk**.
5.  Endre **Inngangskontroll** til **Intern** og merk av for **Tillat trafikk
    fra eksterne applikasjonslastbalansere** slik at den ikke er offentlig
    tilgjengelig.

**Resultat:** Serverarkitekturen din skal nå se ut som Figur 3, der alle
trafikkforespørsler rettes til taggingsserveren, og taggingsserveren kan
videresende forespørsler til forhåndsvisningsserveren.

_Figur 3: Bruk av vertsbasert ruting._

> **Merk:** Du kan ikke bruke banebasert ruting, for eksempel å mappe
> `/gtm/debug` til `preview-backend-service`. Ved å bruke denne metoden kan du
> se feilsøkingsvinduet, men du kan ikke se hendelsene komme gjennom. Dette er
> fordi taggingsserveren videresender hendelser til andre baner, og disse kan
> ikke komme til riktig sluttdestinasjon. Verten gir en klar separasjon mellom
> de to destinasjonene.

---

## Sjekk konfigurasjonen din

Slik sjekker du konfigurasjonen din:

1.  Åpne **Google Tag Manager**.
2.  Åpne serverbeholderen din.
3.  Klikk på **Admin > Beholderinnstillinger** og sett serverbeholderens URL til
    taggingsserverens URL.
4.  Lukk vinduet og forhåndsvis arbeidsområdet. Feilsøkingsvinduet åpnes. Når du
    navigerer på nettstedet ditt, skal hendelsene dine vises i
    feilsøkingsvinduet.

---

### Relaterte lenker

- [Sett opp tagging på serversiden med Cloud Run](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
- [Aktiver regionspesifikk atferd i tagging på serversiden](https://developers.google.com/tag-platform/tag-manager/server-side/region-specific-behavior)
