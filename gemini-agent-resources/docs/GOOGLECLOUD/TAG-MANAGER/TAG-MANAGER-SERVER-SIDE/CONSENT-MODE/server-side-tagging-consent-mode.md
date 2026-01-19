Ok, her er teksten formatert i strukturert markdown-syntaks:

# Implementer samtykkemodus med serverside Tag Manager

Dette dokumentet er for utviklere som allerede har en samtykkeløsning
implementert på nettstedet sitt og ønsker å bruke samtykkemodus i et
serverside-miljø.

---

## Hva er samtykkemodus?

> Samtykkemodus lar deg kommunisere brukernes samtykkestatus for
> informasjonskapsler eller app-identifikatorer til Google. Tagger justerer sin
> atferd og respekterer brukernes valg. Samtykkemodus tilbyr ikke et
> samtykkebanner eller en widget, men samhandler snarere med din Consent
> Management Platform (CMP).

For en grundig introduksjon til samtykkemodus, les
[Samtykkemodus på nettsteder og mobilapper](https://support.google.com/analytics/answer/9976101).

For å implementere samtykkemodus trenger du:

- Administrator-tilgang til Google-produktet(e) du vil konfigurere.
- En samtykkeløsning eller et informasjonskapselbanner på nettstedet ditt som er
  kompatibelt med Googles samtykkemodus-API eller gtag.js.
- En Google Tag Manager web-container og en server-container.
- En Google Analytics: GA4-klient i server-containeren for å motta samtykkedata.

---

## Hvordan samtykkemodus fungerer med serverside-tagging

Flyten av samtykkeinformasjon er som følger:

1.  **Samtykkebanneret** på nettstedet ditt mottar brukerens samtykkevalg og
    sender dem til **Google-taggen**.
2.  **Google-taggen** sender brukerens preferanser til **server-containeren**
    ved å legge til samtykkeparametere i HTTP-forespørselen.
3.  **Google-produkttagger** i serveren er samtykkebevisste og justerer mengden
    og typen data de sender basert på brukerens preferanser.

> **Nøkkelpoeng:** På grunn av denne arkitekturen trenger du kun å sette opp
> samtykkemodus i **web-containeren**.

### Avansert samtykkemodus

Server-containere støtter både grunnleggende og avansert samtykkemodus.

Når du har implementert avansert samtykkemodus i web-containeren din og jobber
med regionspesifikke innstillinger, må du sette opp taggingsserveren din til å
støtte
[regionspesifikke innstillinger](https://developers.google.com/tag-platform/tag-manager/server-side/consent-mode#region-specific_behavior).

[**Sett opp samtykkemodus →**](https://developers.google.com/tag-platform/tag-manager/server-side/consent-mode-setup)

---

## Eksempel

Din organisasjon ber deg implementere Googles samtykkemodus-API for Google
Analytics 4 og sporing av Google Ads-konverteringer. Du har allerede et
informasjonskapselbanner på nettstedet, som du har implementert ved hjelp av en
fellesskapsmal i web-containeren.

Du må sørge for at Google Ads- og Google Analytics-taggene dine utløses når
brukeren godtar informasjonskapsler for Annonser (`ad_storage`) og Analyse
(`analytics_storage`). Når brukeren avviser disse, skal taggene alltid sende
"pings" uten informasjonskapsler til sine destinasjoner.

For å implementere dette trenger du følgende komponenter:

| Komponent                    | Formål                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| **Web-container**            | Inneholder Google-taggen og logikken for samtykkebanneret (klient-side).                          |
| **Server-container**         | Mottar data fra web-containeren og håndterer logikk på server-siden.                              |
| **Informasjonskapselbanner** | Ber om samtykke for informasjonskapsler for Google Ads og Google Analytics.                       |
| **Google-tagg**              | Initialiserer Google Analytics 4-biblioteket i nettleseren og sender data til server-containeren. |

---

## Hvordan samtykkeinnstillinger påvirker tag-atferd

Følgende faner forklarer hvordan visse tagger oppfører seg i konteksten av
samtykkemodus.

### Floodlight Counter/Sales

#### Forutsetning

For at disse taggene skal fungere, må du installere **Conversion Linker**-taggen
i server-containeren.

#### Tag-atferd

- **`ad_storage: granted`**: Floodlight-tagger fungerer normalt.
- **`ad_storage: denied`**: Blockerer HTTP-forespørsler og bruk av
  informasjonskapsler.

#### Støttede funksjoner

- **URL Passthrough**: Fungerer hvis aktivert i Google-taggen på klientsiden.
- **Ads Data Redaction**: Taggen sender ikke en forespørsel om å lagre data når
  `ad_storage` er nektet.
- **TCF v2.0-integrasjon**: Fungerer hvis aktivert i web-containeren for hele
  siden.
