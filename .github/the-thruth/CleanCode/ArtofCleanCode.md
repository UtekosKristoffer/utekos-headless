# Kunsten å skrive ren kode

La oss si du mener at rotete kode er en betydelig hindring. La oss si at du aksepterer at den eneste måten å ha høy hastighet på, er å holde koden ren. Da må du spørre deg selv: «Hvordan skriver jeg ren kode?» Det er ingen vits i å prøve å skrive ren kode hvis du ikke vet hva det vil si at kode er ren!

Den dårlige nyheten er at å skrive ren kode er mye som å male et bilde. De fleste av oss vet når et bilde er malt bra eller dårlig. Men å kunne skille god kunst fra dårlig betyr ikke at vi vet hvordan vi skal male. På samme måte betyr ikke det å kunne skille ren kode fra skitten kode at vi vet hvordan vi skal skrive ren kode!

Å skrive ren kode krever disiplinert bruk av en myriade av små teknikker, anvendt gjennom en møysommelig tilegnet følelse av «renhet». Denne «kode-følelsen» er nøkkelen. Noen av oss er født med den. Noen av oss må kjempe for å tilegne seg den. Ikke bare lar den oss se om kode er god eller dårlig, men den viser oss også strategien for å bruke vår disiplin til å transformere dårlig kode til ren kode.

En programmerer uten «kode-følelse» kan se på en rotete modul og gjenkjenne rotet, men vil ikke ha noen anelse om hva som skal gjøres med det. En programmerer med «kode-følelse» vil se på en rotete modul og se muligheter og variasjoner. «Kode-følelsen» vil hjelpe den programmereren med å velge den beste variasjonen og veilede ham eller henne til å planlegge en sekvens av atferdsbevarende transformasjoner for å komme fra her til der.

Kort sagt er en programmerer som skriver ren kode en kunstner som kan ta en blank skjerm gjennom en rekke transformasjoner til det blir et elegant kodet system.

---

## Hva er ren kode?

Det finnes sannsynligvis like mange definisjoner som det finnes programmerere. Så jeg spurte noen veldig kjente og dypt erfarne programmerere hva de mente.

---

### Bjarne Stroustrup, oppfinneren av C++ og forfatter av The C++ Programming Language

> Jeg liker at koden min er elegant og effektiv. Logikken bør være rett frem for å gjøre det vanskelig for feil å gjemme seg, avhengighetene minimale for å lette vedlikehold, feilhåndteringen komplett i henhold til en tydelig strategi, og ytelsen nær optimal for ikke å friste folk til å gjøre koden rotete med prinsipløse optimaliseringer. Ren kode gjør én ting bra.

Bjarne bruker ordet «elegant». Det er litt av et ord! Ordboken i min MacBook® gir følgende definisjoner: behagelig grasiøs og stilig i utseende eller manér; behagelig genial og enkel. Legg merke til vekten på ordet «behagelig». Tydeligvis mener Bjarne at ren kode er behagelig å lese. Å lese den bør få deg til å smile, slik en velutformet spilledåse eller en veldesignet bil ville gjort.

Han nevner også effektivitet – to ganger. Kanskje dette ikke bør overraske oss fra oppfinneren av C++; men jeg tror det ligger mer i det enn bare et ønske om hastighet. Bortkastede sykluser er uelegant, de er ikke behagelige. Dårlig kode frister rotet til å vokse! Når andre endrer dårlig kode, har de en tendens til å gjøre den verre.

Pragmatiske Dave Thomas og Andy Hunt brukte metaforen om knuste vinduer: En bygning med knuste vinduer ser ut som om ingen bryr seg om den. Så andre slutter å bry seg. De lar flere vinduer bli knust. Til slutt knuser de dem aktivt. De skjemmer fasaden med graffiti og lar søppel samle seg. Ett knust vindu starter forfallsprosessen.

Han nevner også at feilhåndtering skal være komplett. Dette handler om disiplinen med å være oppmerksom på detaljer. Forkortet feilhåndtering, minnelekkasjer, "race conditions", inkonsekvent navngivning – alt dette er tegn på uryddighet. Ren kode viser en nøyaktig oppmerksomhet på detaljer.

Avslutningsvis: Ren kode gjør én ting bra. Dårlig kode prøver å gjøre for mye, har tåkete intensjon og tvetydig formål. Ren kode er fokusert. Hver funksjon, hver klasse, hver modul utstråler en målrettet holdning.

---

### Grady Booch, forfatter av Object Oriented Analysis and Design with Applications

> Ren kode er enkel og direkte. Ren kode leses som velskrevet prosa. Ren kode skjuler aldri designerens intensjon, men er snarere full av klare og konsise abstraksjoner og rett frem kontrollflyt.

Grady har et lesbarhetsperspektiv. Han sier at ren kode skal leses som velskrevet prosa – den skal være like naturlig og «usynlig» å lese som en god bok. Ren kode eksponerer spenningene i problemet, bygger dem mot et klimaks, og gir leseren en «Aha!»-følelse.

---

### "Big" Dave Thomas, grunnlegger av OTI

> Ren kode kan leses og forbedres av en annen utvikler enn den opprinnelige forfatteren. Den har enhets- og akseptansetester. Den har meningsfulle navn. Den gir én måte, snarere enn mange måter, å gjøre én ting på. Den har minimale avhengigheter, som er eksplisitt definert, og gir et klart og minimalt API. Kode bør være «literate», siden avhengig av språket, kan ikke all nødvendig informasjon uttrykkes tydelig i koden alene.

Dave kobler renhet til tester. Kode uten tester er ikke ren. Han bruker ordet minimalt to ganger – kode skal være liten, ikke stor. Kode skal være lesbar for mennesker – «literate programming».

---

### Michael Feathers, forfatter av Working Effectively with Legacy Code

> Jeg kunne listet opp alle kvalitetene jeg legger merke til i ren kode, men det er én overordnet kvalitet som fører til alle de andre. Ren kode ser alltid ut som den er skrevet av noen som bryr seg.

Ren kode er kode det har blitt tatt vare på. Noen har tatt seg tid til å holde den enkel og ryddig, har viet oppmerksomhet til detaljer og brydd seg.

---

### Ron Jeffries, forfatter av Extreme Programming Installed

> Enkel kode kjører alle testene, inneholder ingen duplisering, uttrykker alle designideene som er i systemet, og minimerer antall enheter som klasser, metoder, funksjoner og lignende.

Ron fokuserer mest på å unngå duplisering, og på uttrykksfullhet – meningsfulle navn, tydelige metoder, små abstraksjoner. Redusert duplisering, høy uttrykksfullhet og tidlig bygging av enkle abstraksjoner utgjør ren kode for ham.

---

### Ward Cunningham, oppfinner av Wiki og medoppfinner av eXtreme Programming

> Du vet at du jobber med ren kode når hver rutine du leser viser seg å være stort sett det du forventet. Du kan kalle det vakker kode når koden også får det til å se ut som om språket ble laget for problemet.

Ward mener ren kode ikke overrasker – den er åpenbar, enkel og overbevisende. Språket ser ut som det er laget for problemet.

---

## Tankeskoler

Hva med meg (Uncle Bob)? Hva mener jeg ren kode er? Denne boken vil fortelle deg, i grufull detalj, hva jeg og mine landsmenn mener om ren kode. Vi vil presentere disse meningene som absolutter, og vi vil ikke be om unnskyldning for vår påståelighet. For oss, på dette tidspunktet i karrieren vår, er de absolutter. De er vår tankeskole om ren kode.

Kampsportutøvere er ikke alle enige om den beste kampsporten, eller den beste teknikken innen en kampsport. Ofte vil mestere i kampsport danne sine egne tankeskoler og samle elever for å lære av dem. Senere, etter hvert som studentene vokser i sin kunst, kan de bli student av en annen mester for å utvide sin kunnskap og praksis. Noen går til slutt videre for å foredle sine ferdigheter, oppdage nye teknikker og grunnlegge sine egne skoler.

Betrakt denne boken som en beskrivelse av Object Mentor School of Clean Code. Teknikker og læren inni er måten vi praktiserer vår kunst på. Men ikke tro at vi har «rett» i absolutt forstand – det finnes andre skoler og andre mestere. Lær av dem også.

---

## Vi er forfattere

`@author`-feltet i en Javadoc forteller oss hvem vi er. Vi er forfattere. Og én ting om forfattere er at de har lesere. Faktisk er forfattere ansvarlige for å kommunisere godt med leserne sine. Neste gang du skriver en kodelinje, husk at du er en forfatter som skriver for lesere som vil dømme innsatsen din.

Du spør kanskje: Hvor mye blir kode egentlig lest? Går ikke mesteparten av innsatsen med til å skrive den?

Har du noen gang spilt av en redigeringsøkt? På 80- og 90-tallet hadde vi editorer som Emacs som holdt styr på hvert eneste tastetrykk. Du kunne jobbe i en time og deretter spille av hele redigeringsøkten som en høyhastighetsfilm. Da jeg gjorde dette, var resultatene fascinerende.

Den aller største delen av avspillingen var scrolling og navigering til andre moduler!

_Forholdet mellom tid brukt på å lese versus å skrive er godt over 10:1. Vi leser konstant gammel kode som en del av arbeidet med å skrive ny kode._

Fordi dette forholdet er så høyt, ønsker vi at lesing av kode skal være enkelt, selv om det gjør skrivingen vanskeligere. Selvfølgelig er det ingen måte å skrive kode på uten å lese den, så å gjøre den lett å lese gjør den faktisk lettere å skrive.

> Hvis du vil ha høy hastighet, bli ferdig raskt, og vil at koden din skal være lett å skrive, gjør den lett å lese.

---

## Speiderregelen

Det er ikke nok å skrive koden bra. Koden må holdes ren over tid. Vi har alle sett kode forfalle og forringes ettersom tiden går. Så vi må ta en aktiv rolle i å forhindre denne forringelsen.

Speiderbevegelsen i Amerika har en enkel regel som vi kan anvende på vårt yrke:

> Forlat leirplassen renere enn du fant den.

Hvis vi alle sjekket inn koden vår litt renere enn da vi sjekket den ut, kunne koden rett og slett ikke forfalle. Oppryddingen trenger ikke å være noe stort. Endre ett variabelnavn til det bedre, del opp én funksjon som er litt for stor, eliminer ett lite stykke duplisering, rydd opp i én sammensatt if-setning.

---

## Forløper og prinsipper

Denne boken er en «prequel» til Agile Software Development: Principles, Patterns, and Practices (PPP). I denne boken vil du finne sporadiske referanser til ulike designprinsipper som SRP, OCP og DIP.

---

## Konklusjon

Bøker om kunst lover ikke å gjøre deg til en kunstner. Alt de kan gjøre er å gi deg noen av verktøyene, teknikkene og tankeprosessene som andre kunstnere har brukt. På samme måte kan ikke denne boken love å gjøre deg til en god programmerer. Den kan ikke love å gi deg «kode-følelse». Alt den kan gjøre er å vise deg tankeprosessene til gode programmerere og triksene, teknikkene og verktøyene de bruker.

Akkurat som en bok om kunst, vil denne boken være full av detaljer. Det vil være mye kode. Du vil se god kode og du vil se dårlig kode. Du vil se dårlig kode transformert til god kode. Du vil se lister med heuristikker, disipliner og teknikker. Du vil se eksempel etter eksempel. Etter det er det opp til deg.

> Husk den gamle vitsen om konsertfiolinisten som gikk seg vill på vei til en forestilling? Han stoppet en gammel mann på hjørnet og spurte ham hvordan han kom seg til Carnegie Hall. Den gamle mannen så på fiolinisten og fiolinen under armen hans, og sa: «Øv, gutten min. Øv!»
