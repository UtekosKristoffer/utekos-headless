# Kunsten å skrive ren kode?

> La oss si du mener at rotete kode er en betydelig hindring. La oss si at du aksepterer at den eneste måten å ha høy hastighet på, er å holde koden ren. Da må du spørre deg selv:  
> **«Hvordan skriver jeg ren kode?»**  
> Det er ingen vits i å prøve å skrive ren kode hvis du ikke vet hva det vil si at kode er ren!

---

Den dårlige nyheten er at å skrive ren kode er mye som å male et bilde. De fleste av oss vet når et bilde er malt bra eller dårlig. Men å kunne skille god kunst fra dårlig betyr ikke at vi vet hvordan vi skal male. På samme måte betyr ikke det å kunne skille ren kode fra skitten kode at vi vet hvordan vi skal skrive ren kode!

Å skrive ren kode krever disiplinert bruk av en myriade av små teknikker, anvendt gjennom en møysommelig tilegnet følelse av «renhet». Denne «kode-følelsen» er nøkkelen. Noen av oss er født med den. Noen av oss må kjempe for å tilegne seg den. Ikke bare lar den oss se om kode er god eller dårlig, men den viser oss også strategien for å bruke vår disiplin til å transformere dårlig kode til ren kode.

En programmerer uten «kode-følelse» kan se på en rotete modul og gjenkjenne rotet, men vil ikke ha noen anelse om hva som skal gjøres med det. En programmerer med «kode-følelse» vil se på en rotete modul og se muligheter og variasjoner. «Kode-følelsen» vil hjelpe den programmereren med å velge den beste variasjonen og veilede ham eller henne til å planlegge en sekvens av atferdsbevarende transformasjoner for å komme fra her til der.

> Kort sagt er en programmerer som skriver ren kode en kunstner som kan ta en blank skjerm gjennom en rekke transformasjoner til det blir et elegant kodet system.

---

## Hva er ren kode?

Det finnes sannsynligvis like mange definisjoner som det finnes programmerere. Så jeg spurte noen veldig kjente og dypt erfarne programmerere hva de mente.

---

### Bjarne Stroustrup, oppfinneren av C++ og forfatter av The C++ Programming Language

> Jeg liker at koden min er elegant og effektiv. Logikken bør være rett frem for å gjøre det vanskelig for feil å gjemme seg, avhengighetene minimale for å lette vedlikehold, feilhåndteringen komplett i henhold til en tydelig strategi, og ytelsen nær optimal for ikke å friste folk til å gjøre koden rotete med prinsipløse optimaliseringer. Ren kode gjør én ting bra.

Bjarne bruker ordet «elegant». Det er litt av et ord! Ordboken i min MacBook® gir følgende definisjoner: behagelig grasiøs og stilig i utseende eller manér; behagelig genial og enkel. Legg merke til vekten på ordet «behagelig». Tydeligvis mener Bjarne at ren kode er behagelig å lese. Å lese den bør få deg til å smile, slik en velutformet spilledåse eller en veldesignet bil ville gjort.

Bjarne nevner også effektivitet – to ganger. Kanskje dette ikke bør overraske oss fra oppfinneren av C++; men jeg tror det ligger mer i det enn bare et ønske om hastighet. Bortkastede sykluser er uelegant, de er ikke behagelige. Og legg nå merke til ordet Bjarne bruker for å beskrive konsekvensen av den uelegansen. Han bruker ordet «friste». Det ligger en dyp sannhet her. Dårlig kode frister rotet til å vokse! Når andre endrer dårlig kode, har de en tendens til å gjøre den verre.

Pragmatiske Dave Thomas og Andy Hunt sa dette på en annen måte. De brukte metaforen om knuste vinduer. En bygning med knuste vinduer ser ut som om ingen bryr seg om den. Så andre slutter å bry seg. De lar flere vinduer bli knust. Til slutt knuser de dem aktivt. De skjemmer fasaden med graffiti og lar søppel samle seg. Ett knust vindu starter forfallsprosessen.

Bjarne nevner også at feilhåndtering skal være komplett. Dette handler om disiplinen med å være oppmerksom på detaljer. Forkortet feilhåndtering er bare én måte programmerere glatter over detaljer. Minnelekkasjer er en annen, «race conditions» er enda en. Inkonsekvent navngivning enda en til. Poenget er at ren kode viser en nøyaktig oppmerksomhet på detaljer.

Bjarne avslutter med påstanden om at ren kode gjør én ting bra. Det er ingen tilfeldighet at det er så mange prinsipper for programvaredesign som kan kokes ned til denne enkle formaningen. Forfatter etter forfatter har forsøkt å formidle denne tanken. Dårlig kode prøver å gjøre for mye, den har en tåkete intensjon og tvetydig formål. Ren kode er fokusert. Hver funksjon, hver klasse, hver modul utstråler en målrettet holdning som forblir fullstendig uforstyrret og ubesudlet av de omkringliggende detaljene.

---

### Grady Booch, forfatter av Object Oriented Analysis and Design with Applications

> Ren kode er enkel og direkte. Ren kode leses som velskrevet prosa. Ren kode skjuler aldri designerens intensjon, men er snarere full av klare og konsise abstraksjoner og rett frem kontrollflyt.

Grady tar opp noen av de samme poengene som Bjarne, men han har et lesbarhetsperspektiv. Jeg liker spesielt godt hans syn på at ren kode skal leses som velskrevet prosa. Tenk tilbake på en virkelig god bok du har lest. Husk hvordan ordene forsvant og ble erstattet av bilder! Det var som å se en film, var det ikke? Bedre! Du så karakterene, du hørte lydene, du opplevde patosen og humoren.

Å lese ren kode vil aldri bli helt som å lese Ringenes Herre. Likevel er den litterære metaforen ikke dårlig. Som en god roman, bør ren kode tydelig eksponere spenningene i problemet som skal løses. Den bør bygge disse spenningene mot et klimaks og deretter gi leseren den «Aha! Selvfølgelig!»-følelsen, når problemene og spenningene løses i åpenbaringen av en innlysende løsning.

Jeg synes Gradys bruk av uttrykket «crisp abstraction» (klar og konsis abstraksjon) er et fascinerende oksymoron! Tross alt er ordet «crisp» nesten et synonym for «konkret». Ordboken på min MacBook har følgende definisjon av «crisp»: kvikt bestemt og saklig, uten nøling eller unødvendige detaljer. Til tross for denne tilsynelatende motsetningen i betydning, bærer ordene et kraftig budskap. Koden vår bør være saklig i motsetning til spekulativ. Den bør bare inneholde det som er nødvendig. Våre lesere bør oppfatte oss som å ha vært bestemte.

---

### «Big» Dave Thomas, grunnlegger av OTI, gudfar for Eclipse-strategien

> Ren kode kan leses og forbedres av en annen utvikler enn den opprinnelige forfatteren. Den har enhets- og akseptansetester. Den har meningsfulle navn. Den gir én måte, snarere enn mange måter, å gjøre én ting på. Den har minimale avhengigheter, som er eksplisitt definert, og gir et klart og minimalt API. Kode bør være «literate», siden avhengig av språket, kan ikke all nødvendig informasjon uttrykkes tydelig i koden alene.

Big Dave deler Gradys ønske om lesbarhet, men med en viktig vri. Dave hevder at ren kode gjør det enkelt for andre å forbedre den. Dette kan virke åpenbart, men det kan ikke understrekes nok. Det er tross alt en forskjell mellom kode som er lett å lese og kode som er lett å endre.

Dave knytter renhet til tester! For ti år siden ville dette ha fått mange til å heve øyenbrynene. Men disiplinen Testdrevet Utvikling (TDD) har hatt en dyp innvirkning på bransjen vår og har blitt en av våre mest grunnleggende disipliner. Dave har rett. Kode, uten tester, er ikke ren. Uansett hvor elegant den er, uansett hvor lesbar og tilgjengelig, om den ikke har tester, er den uren.

Dave bruker ordet minimalt to ganger. Tydeligvis verdsetter han kode som er liten, snarere enn kode som er stor. Dette har faktisk vært et vanlig refreng i programvarelitteraturen siden dens begynnelse. Mindre er bedre.

Dave sier også at kode skal være «literate» (lesbar/litterær). Dette er en myk referanse til Knuths «literate programming». Poenget er at koden skal være komponert på en slik måte at den er lesbar for mennesker.

---

### Michael Feathers, forfatter av Working Effectively with Legacy Code

> Jeg kunne listet opp alle kvalitetene jeg legger merke til i ren kode, men det er én overordnet kvalitet som fører til alle de andre. Ren kode ser alltid ut som den er skrevet av noen som bryr seg. Det er ingenting åpenbart du kan gjøre for å gjøre den bedre. Alle disse tingene ble tenkt på av kodens forfatter, og hvis du prøver å forestille deg forbedringer, blir du ledet tilbake til der du er, sittende i beundring av koden noen etterlot seg – kode etterlatt av noen som bryr seg dypt om håndverket.

Ett ord: omsorg. Det er egentlig temaet for denne boken. Kanskje en passende undertittel ville vært Hvordan ta vare på kode.

Michael traff spikeren på hodet. Ren kode er kode som har blitt tatt vare på. Noen har tatt seg tid til å holde den enkel og ryddig. De har viet tilstrekkelig oppmerksomhet til detaljer. De har brydd seg.

---

### Ron Jeffries, forfatter av Extreme Programming Installed og Extreme Programming Adventures in C#

Ron begynte sin karriere med å programmere i Fortran ved Strategic Air Command og har skrevet kode i nesten alle språk og på nesten alle maskiner. Det lønner seg å vurdere hans ord nøye.

> De siste årene begynner jeg, og avslutter nesten, med Becks regler for enkel kode. I prioritert rekkefølge, enkel kode:
>
> 1. Kjører alle testene;
> 2. Inneholder ingen duplisering;
> 3. Uttrykker alle designideene som er i systemet;
> 4. Minimerer antall enheter som klasser, metoder, funksjoner og lignende.

Av disse fokuserer jeg mest på duplisering. Når det samme gjøres om og om igjen, er det et tegn på at det er en idé i hodet vårt som ikke er godt representert i koden. Jeg prøver å finne ut hva det er. Deretter prøver jeg å uttrykke den ideen tydeligere.

For meg inkluderer uttrykksfullhet meningsfulle navn, og jeg endrer sannsynligvis navnene på ting flere ganger før jeg bestemmer meg. Med moderne kodeverktøy som Eclipse er omdøping ganske billig, så det plager meg ikke å endre. Uttrykksfullhet går imidlertid utover navn. Jeg ser også på om et objekt eller en metode gjør mer enn én ting. Hvis det er et objekt, må det sannsynligvis deles opp i to eller flere objekter. Hvis det er en metode, vil jeg alltid bruke «Extract Method»-refaktorering på den, noe som resulterer i én metode som sier tydeligere hva den gjør, og noen sub-metoder som sier hvordan det gjøres.

Duplisering og uttrykksfullhet tar meg en veldig lang vei mot det jeg anser som ren kode, og å forbedre skitten kode med bare disse to tingene i tankene kan utgjøre en enorm forskjell. Det er imidlertid én annen ting jeg er bevisst på at jeg gjør, som er litt vanskeligere å forklare.

Etter mange år med dette arbeidet, virker det for meg som om alle programmer består av veldig like elementer. Et eksempel er «finn ting i en samling». Enten vi har en database med ansattregistre, en hash map med nøkler og verdier, eller en array med elementer av et eller annet slag, finner vi oss ofte i å ville ha et bestemt element fra den samlingen. Når jeg finner ut at det skjer, vil jeg ofte pakke den bestemte implementeringen inn i en mer abstrakt metode eller klasse. Det gir meg et par interessante fordeler.

Jeg kan implementere funksjonaliteten nå med noe enkelt, for eksempel en hash map, men siden alle referansene til det søket nå er dekket av min lille abstraksjon, kan jeg endre implementeringen når som helst jeg vil. Jeg kan gå raskt fremover samtidig som jeg bevarer evnen til å endre senere.

I tillegg retter samlingsabstraksjonen ofte oppmerksomheten min mot hva som «egentlig» skjer, og hindrer meg i å løpe ned stien med å implementere vilkårlig samlingsatferd når alt jeg egentlig trenger er noen få ganske enkle måter å finne det jeg vil ha på.

Redusert duplisering, høy uttrykksfullhet og tidlig bygging av enkle abstraksjoner. Det er det som utgjør ren kode for meg.

Her, i noen få korte avsnitt, har Ron oppsummert innholdet i denne boken. Ingen duplisering, én ting, uttrykksfullhet, små abstraksjoner. Alt er der.

---

### Ward Cunningham, oppfinner av Wiki, oppfinner av Fit, medoppfinner av eXtreme Programming

> Du vet at du jobber med ren kode når hver rutine du leser viser seg å være stort sett det du forventet. Du kan kalle det vakker kode når koden også får det til å se ut som om språket ble laget for problemet.

Utsagn som dette er karakteristisk for Ward. Du leser det, nikker, og går videre til neste tema. Det høres så fornuftig ut, så åpenbart, at det knapt registreres som noe dyptgripende. Du tenker kanskje at det var stort sett det du forventet. Men la oss se nærmere på det.

> «… stort sett det du forventet.» Når var sist gang du så en modul som var stort sett det du forventet?  
> Er det ikke mer sannsynlig at modulene du ser på er forvirrende, kompliserte, flokete? Er ikke villedning regelen?  
> Er du ikke vant til å fomle rundt og prøve å gripe og holde fast i resonnementstrådene som spruter ut fra hele systemet og vever seg gjennom modulen du leser?  
> Når var sist gang du leste gjennom noe kode og nikket på samme måte som du kanskje nikket til Wards utsagn?

Ward forventer at når du leser ren kode, vil du ikke bli overrasket i det hele tatt. Faktisk vil du ikke engang bruke mye anstrengelse. Du vil lese den, og den vil være stort sett det du forventet. Den vil være åpenbar, enkel og overbevisende. Hver modul vil legge til rette for den neste. Hver forteller deg hvordan den neste vil bli skrevet. Programmer som er så rene er så dyptgripende velskrevet at du ikke engang legger merke til det. Designeren får det til å se latterlig enkelt ut, som alle eksepsjonelle design.

Og hva med Wards idé om skjønnhet? Vi har alle klaget over at språkene våre ikke ble designet for problemene våre. Men Wards utsagn legger ansvaret tilbake på oss. Han sier at vakker kode får språket til å se ut som det ble laget for problemet! Så det er vårt ansvar å få språket til å se enkelt ut! Språkfanatikere overalt, pass opp! Det er ikke språket som får programmer til å virke enkle. Det er programmereren som får språket til å virke enkelt!

---

## Tankeskoler

Hva med meg (Uncle Bob)? Hva mener jeg ren kode er? Denne boken vil fortelle deg, i grufull detalj, hva jeg og mine landsmenn mener om ren kode. Vi vil fortelle deg hva vi mener utgjør et rent variabelnavn, en ren funksjon, en ren klasse, osv. Vi vil presentere disse meningene som absolutter, og vi vil ikke be om unnskyldning for vår påståelighet. For oss, på dette tidspunktet i karrieren vår, er de absolutter. De er vår tankeskole om ren kode.

Kampsportutøvere er ikke alle enige om den beste kampsporten, eller den beste teknikken innen en kampsport. Ofte vil mestere i kampsport danne sine egne tankeskoler og samle elever for å lære av dem. Så vi ser Gracie Jiu Jistu, grunnlagt og undervist av Gracie-familien i Brasil. Vi ser Hakkoryu Jiu Jistu, grunnlagt og undervist av Okuyama Ryuho i Tokyo. Vi ser Jeet Kune Do, grunnlagt og undervist av Bruce Lee i USA.

Studenter av disse tilnærmingene fordyper seg i grunnleggerens lærdom. De dedikerer seg til å lære det den bestemte mesteren lærer bort, ofte til utelukkelse av enhver annen mesters lære. Senere, etter hvert som studentene vokser i sin kunst, kan de bli student av en annen mester for å utvide sin kunnskap og praksis. Noen går til slutt videre for å foredle sine ferdigheter, oppdage nye teknikker og grunnlegge sine egne skoler.

Ingen av disse forskjellige skolene er absolutt riktige. Likevel, innenfor en bestemt skole, handler vi som om læren og teknikkene er riktige. Tross alt er det en riktig måte å praktisere Hakkoryu Jiu Jitsu, eller Jeet Kune Do. Men denne riktigheten innenfor en skole ugyldiggjør ikke læren til en annen skole.

> Betrakt denne boken som en beskrivelse av Object Mentor School of Clean Code.  
> Teknikkene og læren inni er måten vi praktiserer vår kunst på.  
> Vi er villige til å hevde at hvis du følger denne læren, vil du nyte fordelene vi har nytt, og du vil lære å skrive kode som er ren og profesjonell.  
> Men gjør ikke feilen å tro at vi på en eller annen måte har «rett» i absolutt forstand. Det finnes andre skoler og andre mestere som har like mye krav på profesjonalitet som oss. Det ville være lurt av deg å lære av dem også.

Faktisk er mange av anbefalingene i denne boken kontroversielle. Du vil sannsynligvis ikke være enig i alle. Du kan være voldsomt uenig i noen av dem. Det er greit. Vi kan ikke hevde å ha den endelige autoriteten. På den andre siden er anbefalingene i denne boken ting vi har tenkt lenge og grundig på. Vi har lært dem gjennom tiår med erfaring og gjentatte prøving og feiling. Så enten du er enig eller uenig, ville det være synd om du ikke så, og respekterte, vårt synspunkt.

---

## Vi er forfattere

`@author`-feltet i en Javadoc forteller oss hvem vi er. Vi er forfattere. Og én ting om forfattere er at de har lesere. Faktisk er forfattere ansvarlige for å kommunisere godt med leserne sine. Neste gang du skriver en kodelinje, husk at du er en forfatter som skriver for lesere som vil dømme innsatsen din.

Du spør kanskje: Hvor mye blir kode egentlig lest? Går ikke mesteparten av innsatsen med til å skrive den?

Har du noen gang spilt av en redigeringsøkt? På 80- og 90-tallet hadde vi editorer som Emacs som holdt styr på hvert eneste tastetrykk. Du kunne jobbe i en time og deretter spille av hele redigeringsøkten som en høyhastighetsfilm. Da jeg gjorde dette, var resultatene fascinerende.

> Den aller største delen av avspillingen var scrolling og navigering til andre moduler!
>
> Bob går inn i modulen.
> Han scroller ned til funksjonen som trenger endring.
> Han pauser, vurderer alternativene sine.
> Å, han scroller opp til toppen av modulen for å sjekke initialiseringen av en variabel.
> Nå scroller han ned igjen og begynner å skrive.
>
> Ops, han sletter det han skrev!
> Han skriver det igjen.
> Han sletter det igjen!
> Han skriver halvparten av noe annet, men sletter så det!
> Han scroller ned til en annen funksjon som kaller funksjonen han endrer for å se hvordan den kalles.
> Han scroller opp igjen og skriver den samme koden han nettopp slettet.
> Han pauser.
> Han sletter den koden igjen!
> Han åpner et annet vindu og ser på en subklasse. Er den funksjonen overstyrt?
> …

Du skjønner poenget. Forholdet mellom tid brukt på å lese versus å skrive er godt over 10:1. Vi leser konstant gammel kode som en del av arbeidet med å skrive ny kode.

Fordi dette forholdet er så høyt, ønsker vi at lesing av kode skal være enkelt, selv om det gjør skrivingen vanskeligere. Selvfølgelig er det ingen måte å skrive kode på uten å lese den, så å gjøre den lett å lese gjør den faktisk lettere å skrive.

Det er ingen vei utenom denne logikken. Du kan ikke skrive kode hvis du ikke kan lese den omkringliggende koden. Koden du prøver å skrive i dag vil være vanskelig eller lett å skrive avhengig av hvor vanskelig eller lett den omkringliggende koden er å lese. Så hvis du vil ha høy hastighet, hvis du vil bli ferdig raskt, hvis du vil at koden din skal være lett å skrive, gjør den lett å lese.

---

## Speiderregelen

Det er ikke nok å skrive koden bra. Koden må holdes ren over tid. Vi har alle sett kode forfalle og forringes ettersom tiden går. Så vi må ta en aktiv rolle i å forhindre denne forringelsen.

> Speiderbevegelsen i Amerika har en enkel regel som vi kan anvende på vårt yrke:
>
> **Forlat leirplassen renere enn du fant den.**

Hvis vi alle sjekket inn koden vår litt renere enn da vi sjekket den ut, kunne koden rett og slett ikke forfalle. Oppryddingen trenger ikke å være noe stort. Endre ett variabelnavn til det bedre, del opp én funksjon som er litt for stor, eliminer ett lite stykke duplisering, rydd opp i én sammensatt if-setning.

Kan du forestille deg å jobbe på et prosjekt der koden rett og slett ble bedre etter hvert som tiden gikk? Tror du at noe annet alternativ er profesjonelt? Er ikke kontinuerlig forbedring en iboende del av profesjonalitet?

---

## Forløper og prinsipper

På mange måter er denne boken en «prequel» til en bok jeg skrev i 2002 med tittelen Agile Software Development: Principles, Patterns, and Practices (PPP). PPP-boken omhandler prinsippene for objektorientert design, og mange av praksisene som brukes av profesjonelle utviklere. Hvis du ikke har lest PPP, vil du kanskje finne at den fortsetter historien som fortelles av denne boken. Hvis du allerede har lest den, vil du finne mange av stemningene fra den boken gjentatt i denne, på kodenivå.

I denne boken vil du finne sporadiske referanser til ulike designprinsipper. Disse inkluderer Single Responsibility Principle (SRP), Open Closed Principle (OCP), og Dependency Inversion Principle (DIP) blant andre. Disse prinsippene er beskrevet i dybden i PPP.

---

## Konklusjon

Bøker om kunst lover ikke å gjøre deg til en kunstner. Alt de kan gjøre er å gi deg noen av verktøyene, teknikkene og tankeprosessene som andre kunstnere har brukt. På samme måte kan ikke denne boken love å gjøre deg til en god programmerer. Den kan ikke love å gi deg «kode-følelse». Alt den kan gjøre er å vise deg tankeprosessene til gode programmerere og triksene, teknikkene og verktøyene de bruker.

Akkurat som en bok om kunst, vil denne boken være full av detaljer. Det vil være mye kode. Du vil se god kode og du vil se dårlig kode. Du vil se dårlig kode transformert til god kode. Du vil se lister med heuristikker, disipliner og teknikker. Du vil se eksempel etter eksempel. Etter det er det opp til deg.

> Husk den gamle vitsen om konsertfiolinisten som gikk seg vill på vei til en forestilling?  
> Han stoppet en gammel mann på hjørnet og spurte ham hvordan han kom seg til Carnegie Hall.  
> Den gamle mannen så på fiolinisten og fiolinen under armen hans, og sa:  
> **«Øv, gutten min. Øv!»**

---
