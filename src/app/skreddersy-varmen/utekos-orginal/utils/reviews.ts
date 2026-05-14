export type Review = {
  id: number
  name: string
  location?: string
  role?: string
  title?: string
  quote: string
  rating: number
}

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Marit, 62',
    location: 'Hemsedal',
    role: 'Hytteeier',
    title: 'Nå er det jeg som sitter lengst',
    quote:
      'Takk til dere. Nå er det jeg som vil sitte lengst ute om kveldene, og terrassen blir brukt mye mer enn før. Umulig å ikke elske dette produktet.',
    rating: 5
  },
  {
    id: 2,
    name: 'Elisabeth, 47',
    location: 'Tjøme',
    role: 'Livsnyter',
    title: 'Nytt yndlingsplagg',
    quote:
      'Genialt! Når man lærer seg å utnytte det eksisterende potensialet, så oppleves mulighetene nesten endeløse. Dette er mitt nye yndlingsplagg.',
    rating: 5
  },
  {
    id: 3,
    name: 'Knut-Egil, 58',
    location: 'Viken',
    role: 'Bobileier',
    title: 'Uvurderlig på bobilferie',
    quote:
      'Det beste kjøpet jeg gjorde i fjor. Å ha dette alternativet på bobilferie er faktisk uvurderlig. Anbefales på det varmeste!',
    rating: 5
  },
  {
    id: 4,
    name: 'Berit, 64',
    location: 'Narvik',
    title: 'Varm og fornøyd',
    quote: 'Veldig bra',
    rating: 4
  },
  {
    id: 5,
    name: 'Therese, 49',
    location: 'Narvik',
    title: 'Veldig komfortabel',
    quote:
      'Jeg har ikke prøvd den utendørs enda, men jeg kan nesten ikke vente! Veldig komfortabel å ha på og god passform.',
    rating: 5
  },
  {
    id: 6,
    name: 'Richard, 61',
    location: 'Narvik',
    title: 'Glad kone',
    quote: 'Kona ble kjempefornøyd.',
    rating: 4
  },
  {
    id: 7,
    name: 'Bente, 68',
    location: 'Lillehammer',
    title: 'Kjempegod service',
    quote:
      'Tusen takk for hurtig svar og kjempegod service. Veldig fornøyd med både produktet og opplevelsen.',
    rating: 5
  },
  {
    id: 8,
    name: 'Heidi',
    title: 'Utesesongen starter tidligere',
    quote:
      'Veldig fin passform og kvalitet! Blir deilig å ha ute på hytta og gjør at utesesongen på terrassen kan starte enda tidligere. Blir nok kjøpt inn noen flere.',
    rating: 5
  },
  {
    id: 9,
    name: 'Knut Arne',
    title: 'Varm fra hode til tå',
    quote:
      'Etter en hyggelig prat med kundeservice fikk vi tilpasset Utekosen perfekt. Varm og god, samtidig som den er veldig lett og heldekkende med hette. Holder deg varm fra hode til tå.',
    rating: 5
  },
  {
    id: 10,
    name: 'Mathias',
    title: 'Helt genialt',
    quote:
      'Helt genialt å dra frem i veldig mange situasjoner. Raskt og problemfritt, akkurat som lovet. Anbefales på det sterkeste!',
    rating: 5
  },
  {
    id: 11,
    name: 'Karin',
    title: 'Veldig fornøyd',
    quote:
      'Enkelt å bestille, rask levering og flott produkt. Veldig fornøyd med hele kjøpsopplevelsen.',
    rating: 5
  },
  {
    id: 12,
    name: 'Synnøve',
    title: 'Super passform',
    quote:
      'Super utekosdress. Helt fin passform og fulgte med dunkåpen jeg bestilte.',
    rating: 5
  }
]```markdown
---
title: "Product Reviews"
description: "Customer reviews and feedback"
---

# Product Reviews Master

| title | body                                                                                                                                                                                                                | rating | review_date             | source       | curated | reviewer_name           | reviewer_email                | product_id      | product_handle    | reply | reply_date | picture_urls                                                                                             | ip_address                              | location                         | metaobject_handle                           |
| :---- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -----: | :---------------------- | :----------- | :------ | :---------------------- | :---------------------------- | :-------------- | :---------------- | :---- | :--------- | :------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :------------------------------- | :------------------------------------------ |
|       | Helt genialt å dra frem i veldig mange situasjoner. Anbefales!                                                                                                                                                      |      5 | 2025-11-01 14:21:24 UTC | web          | ok      | Mathias                 | santini91yt@gmail.com         | 7710040391928.0 | utekos-dun        |       |            |                                                                                                          | 80.213.254.245                          | Bergen, Vestland, Norway         | review-f93c1f4a-14e4-41b6-bd89-f423129ca4b7 |
|       | Raskt og problemfritt, akkurat som lovet.                                                                                                                                                                           |      5 | 2025-11-01 14:22:03 UTC | web          | ok      | Mathias                 | santini91yt@gmail.com         |                 |                   |       |            |                                                                                                          | 80.213.254.245                          | Bergen, Vestland, Norway         | review-3eeace9f-cf93-4068-940b-161240d1341d |
|       | Kona ble kjempefornøyd                                                                                                                                                                                              |      5 | 2025-12-02 19:10:31 UTC | new-rre-flow | ok      | Richard Rasmussen       | richard.rasmussen87@gmail.com | 9240112693496.0 | utekos-techdown   |       |            |                                                                                                          | 2a04:981:5604:1b00:71f5:a236:ee1:fc38   | Stathelle, Telemark, Norway      | review-12bf6af2-7c17-4626-a8d6-042593b8d538 |
|       | veldig bra                                                                                                                                                                                                          |      5 | 2025-12-09 08:06:24 UTC | new-rre-flow | ok      | Berit Gåsholt           | tergaash@online.no            | 9227603149048.0 | utekos-buff       |       |            |                                                                                                          | 2001:464a:8b86:0:9997:d869:ae3e:bc2b    | Sandefjord, Vestfold, Norway     | review-1cd3d098-6048-407e-8dfb-a924aeaeefbb |
|       | I haven’t tried it outside yet, but I can’t wait! Very comfortable to wear and good fit.                                                                                                                            |      5 | 2025-12-17 19:37:48 UTC | new-rre-flow | ok      | Therese Westgaard       | twestgaard@hotmail.com        | 9240112693496.0 | utekos-techdown   |       |            |                                                                                                          | 2a09:bac2:4da9:341::53:5e               | Bergen, Vestland, Norway         | review-b7bff633-6e56-46ab-9187-0cf6a1c63b5f |
|       | Veldig fin passform og kvalitet! Blir deilig å ha ute på hytta og gjør at utesesongen på terrassen kan starte enda tidligere! Blir nok kjøpt inn noen flere                                                         |      5 | 2025-12-30 09:44:33 UTC | new-rre-flow | ok      | Heidi                   | heidiro@online.no             | 9240112693496.0 | utekos-techdown   |       |            |                                                                                                          | 2001:4656:8fef:0:b1dc:c653:cf9b:7480    | Nesttun, Vestland, Norway        | review-0665da23-1936-49a6-accf-342a6791ba41 |
|       | Etter å ha ringt inn å snakket med en hyggelig mannsperson fikk vi til å gjøre Utekosen om til en jakke. Varm og god samtidig som den er veldig lett og heldekkende med hette. Denne holder en varm fra hode til tå |      5 | 2026-01-05 13:51:40 UTC | new-rre-flow | ok      | Knut Arne Nygaard       | knut@gjestfriehus.no          | 7710325899512.0 | utekos-stapper    |       |            |                                                                                                          | 2001:2020:c313:cdfb:69ca:e164:8850:e62c | Bergen, Vestland, Norway         | review-4a39c398-c751-4a28-ab3f-b0990b54cf2a |
|       | Rask og grei behandling. Alt som var bestilt var raskt levert                                                                                                                                                       |      5 | 2026-01-05 13:53:00 UTC | new-rre-flow | ok      | Knut Arne Nygaard       | knut@gjestfriehus.no          |                 |                   |       |            |                                                                                                          | 2001:2020:c313:cdfb:69ca:e164:8850:e62c | Bergen, Vestland, Norway         | review-83425548-6b03-407b-b765-f4b7772e0108 |
|       | Super utekosdress 🤩                                                                                                                                                                                                |      5 | 2026-01-06 17:12:10 UTC | new-rre-flow | ok      | Synnøve Knappen         | sy-ha@online.no               | 7710040752376.0 | utekos-mikrofiber |       |            |                                                                                                          | 143.97.110.1                            | Bergen, Vestland, Norway         | review-8d9951e4-d067-4be8-b90e-c23502cc0b81 |
|       | Enkelt å bestille, rask levering og flott produkt! 😊👍                                                                                                                                                             |      5 | 2026-01-14 19:00:32 UTC | new-rre-flow | ok      | Karin Haugo             | karin.haugo@gmail.com         | 9240112693496.0 | utekos-techdown   |       |            |                                                                                                          | 51.174.160.184                          | Skien, Telemark, Norway          | review-8568ba22-303f-4dd2-9e2e-095a5b3f83bc |
|       | Helt fin! Fulgte med dunkåpen.                                                                                                                                                                                      |      5 | 2026-01-20 07:48:56 UTC | new-rre-flow | ok      | Karin Haugo             | karin.haugo@gmail.com         | 9227603149048.0 | utekos-buff       |       |            |                                                                                                          | 139.164.154.51                          | Holmestrand, Vestfold, Norway    | review-97affd44-cc9c-44d6-8d77-8f94c5c53ac0 |
|       | Fantastisk 😊                                                                                                                                                                                                       |      5 | 2026-01-24 21:53:25 UTC | new-rre-flow | ok      | Carina Johansen         | crnjohansen@gmail.com         | 7710040752376.0 | utekos-mikrofiber |       |            |                                                                                                          | 2a02:2121:81a:9c63:acf2:7cf9:83d2:8d45  | Oslo, Oslo County, Norway        | review-de6fe126-74dc-45f0-8cc5-dbd8418a22fd |
|       | Bra produkt                                                                                                                                                                                                         |      4 | 2026-02-01 15:32:39 UTC | new-rre-flow | ok      | Jan erik krohn Johansen | jan.erik778@gmail.com         | 9240112693496.0 | utekos-techdown   |       |            |                                                                                                          | 83.243.249.183                          | Ålesund, Møre og Romsdal, Norway | review-b6b3d55e-7168-4d02-99cd-9b7bcc95a0ff |
|       | Jeg kjøpte den til sønnen min som sitter i rullestolen og nå holder han seg godt og varmt 👍                                                                                                                        |      5 | 2026-02-09 00:36:38 UTC | new-rre-flow | ok      | A                       | a.luthart60@gmail.com         | 9240112693496.0 | utekos-techdown   |       |            |                                                                                                          | 2a0d:3341:bb07:c808:89:152a:9f4d:d9ef   | Oslo, Oslo County, Norway        | review-092bb084-2f7a-4954-b92f-d0595d3700d5 |
|       | Den var utrolig deilig å ha på ute i sneborgen. Varm og god over hele kroppen.                                                                                                                                      |      5 | 2026-02-23 09:45:09 UTC | new-rre-flow | ok      | Monika Hansen           | monikahansen43@gmail.com      | 9240112693496.0 | utekos-techdown   |       |            |                                                                                                          | 77.222.171.170                          | Alta, Finnmark, Norway           | review-29ff574d-49b3-499e-8215-d09e87b432e8 |
|       | Veldig behagelig på. Veldig hyggelig og hjelpsom betjening som stilte opp med varene under 24 timer etter bestilling.                                                                                               |      5 | 2026-02-28 17:06:19 UTC | new-rre-flow | ok      | Ørjan                   | zimba28@gmail.com             | 7710040752376.0 | utekos-mikrofiber |       |            |                                                                                                          |                                         |                                  | review-8194b24f-4221-440e-92b3-dcc5b1bd0984 |
|       | Veldig kjekk å ha på kalde kvelder, gjør at du ikke trenger å gå pga. at du fryser😊                                                                                                                                |      5 | 2026-03-16 18:16:11 UTC | new-rre-flow | ok      | Kjetil Hodne            | kjetil.hodne@haugnett.no      | 9240112693496.0 | utekos-techdown   |       |            |                                                                                                          | 2a01:799:c62:9300:6df6:899c:29c4:a5e1   | Haugesund, Rogaland, Norway      | review-0f9b395d-4363-425b-8f84-a75ee0d95029 |
|       | Utekos er prøvd på altan i sur nordaustavind og 4 grader. Den svarte til forventningene. Lurt å lære seg rett bruk av snøring. Den holdt meg varm og god. 🤩                                                        |      5 | 2026-04-05 15:34:19 UTC | new-rre-flow | ok      | Gunnar Lie Eide         | gunnareide.net@gmail.com      | 7710040752376.0 | utekos-mikrofiber |       |            | https://s3.amazonaws.com/me.judge.review-images/utekos/1775403309__1775403317616-img_1317__original.jpeg | 109.72.161.241                          | Harstad, Troms, Norway           | review-d4146dd9-d548-44f4-8f98-49a1eceea489 |
|       | God støtte på telefon etter at jeg skrev mail om at jeg hadde gjort feil i bestillingen 🤩                                                                                                                          |      5 | 2026-04-05 15:36:11 UTC | new-rre-flow | ok      | Gunnar Lie Eide         | gunnareide.net@gmail.com      |                 |                   |       |            |                                                                                                          | 109.72.161.241                          | Harstad, Troms, Norway           | review-fba6cc95-3740-4474-a988-0ceab83c932f |
```
