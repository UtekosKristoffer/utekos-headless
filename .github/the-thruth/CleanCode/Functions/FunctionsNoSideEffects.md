# Unngå Sideeffekter

> **Sideeffekter er løgner.**  
> Funksjonen din lover å gjøre én ting, men den gjør også andre skjulte ting. Noen ganger vil den gjøre uventede endringer i variablene i sin egen klasse. Andre ganger vil den gjøre endringer i parameterne som sendes inn til funksjonen, eller i systemets globale variabler.  
> I begge tilfeller er de lumske og skadelige usannheter som ofte resulterer i merkelige temporale koblinger og avhengigheter av rekkefølge.

---

## Eksempel: Skjult sideeffekt

Vurder for eksempel den tilsynelatende harmløse funksjonen i Listing 3-6. Denne funksjonen bruker en standardalgoritme for å matche et brukernavn med et passord. Den returnerer `true` hvis de stemmer overens, og `false` hvis noe går galt. Men den har også en sideeffekt. Kan du se den?

```typescript
// Listing 3-6: UserValidator.ts (TypeScript-versjon)
class UserValidator {
  private cryptographer: Cryptographer

  public checkPassword(userName: string, password: string): boolean {
    const user = UserGateway.findByName(userName)
    if (user !== User.NULL) {
      const codedPhrase = user.getPhraseEncodedByPassword()
      const phrase = this.cryptographer.decrypt(codedPhrase, password)
      if ('Valid Password' === phrase) {
        Session.initialize() // Sideeffekt!
        return true
      }
    }
    return false
  }
}
```

Sideeffekten er selvfølgelig kallet til `Session.initialize()`. checkPassword-funksjonen, med sitt navn, sier at den sjekker passordet. Navnet antyder ikke at den initialiserer `checkPassword` En som kaller funksjonen og stoler på navnet, risikerer dermed å slette eksisterende sesjonsdata når han eller hun bestemmer seg for å sjekke brukerens gyldighet.

Denne sideeffekten skaper en temporal kobling. Det vil si at `checkPassword` bare kan kalles på bestemte tidspunkter (med andre ord, når det er trygt å initialisere sesjonen). Hvis den kalles i feil rekkefølge, kan sesjonsdata utilsiktet gå tapt. Temporale koblinger er forvirrende, spesielt når de er skjult som en sideeffekt. Hvis du må ha en temporal kobling, bør du gjøre det tydelig i funksjonens navn. I dette tilfellet kunne vi gitt funksjonen navnet `checkPasswordAndInitializeSession`, selv om det helt klart bryter med regelen om å «Gjøre én ting».

## Command Query Separation

Funksjoner bør enten gjøre noe eller svare på noe, men ikke begge deler. Enten skal funksjonen din endre tilstanden til et objekt, eller så skal den returnere informasjon om det objektet. Å gjøre begge deler fører ofte til forvirring. Vurder for eksempel følgende funksjon:

---

## Command Query Separation

> **Funksjoner bør enten gjøre noe eller svare på noe, men ikke begge deler.**

Enten skal funksjonen din endre tilstanden til et objekt, eller så skal den returnere informasjon om det objektet. Å gjøre begge deler fører ofte til forvirring.

**Eksempel på dårlig praksis:**

```typescript
function set(attribute: string, value: string): boolean {
  // Setter og returnerer true/false
}
```

Dette fører til tvetydige uttrykk:

```typescript
if (set("username", "unclebob")) ...
```

For leseren er dette tvetydig. Spør den om «username»-attributtet tidligere var satt til «unclebob»? Eller spør den om «username»-attributtet ble vellykket satt til «unclebob»? Det er vanskelig å utlede meningen fra kallet fordi det er uklart om ordet «set» er et verb eller et adjektiv.

**Løsningen:** Skille kommandoen (command) fra spørringen (query), slik at tvetydigheten ikke kan oppstå:

```typescript
if (attributeExists('username')) {
  setAttribute('username', 'unclebob')
  // ...
}
```

---

## Foretrekk Unntak (Exceptions) fremfor å returnere feilkoder

Å returnere feilkoder fra kommando-funksjoner er et subtilt brudd på Command Query Separation. Det fremmer bruken av kommandoer som uttrykk i if-setninger, noe som fører til dypt nestede strukturer. Når du returnerer en feilkode, må den som kaller funksjonen håndtere feilen umiddelbart.

Hvis du derimot bruker unntak, kan feilbehandlingskoden skilles fra den vellykkede logikken ("happy path"):

```typescript
try {
  deletePage(page)
  registry.deleteReference(page.name)
  configKeys.deleteKey(page.name.makeKey())
} catch (e) {
  logger.log((e as Error).message)
}
```

---

## Trekk ut Try/Catch-blokker

Try-catch-blokker er stygge i seg selv. De forvirrer kodestrukturen og blander feilbehandling med normal prosessering. Derfor er det bedre å trekke ut innholdet i try- og catch-blokkene i egne funksjoner.

```typescript
function delete(page: Page) {
  try {
    deletePageAndAllReferences(page);
  } catch (e) {
    logError(e);
  }
}

function deletePageAndAllReferences(page: Page) {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}

function logError(e: unknown) {
  logger.log((e as Error).message);
}
```

---

## Feilhåndtering er Én Ting

> **Funksjoner skal gjøre én ting. Feilhåndtering er én ting.**

Derfor bør en funksjon som håndterer feil, ikke gjøre noe annet. Dette innebærer at hvis nøkkelordet `try` finnes i en funksjon, bør det være det aller første ordet i funksjonen, og det bør ikke være noe etter catch/finally-blokkene.

---

## Ikke gjenta deg selv (Don't Repeat Yourself - DRY)

Duplisering kan være roten til alt ondt i programvare. Mange prinsipper og praksiser er laget for å kontrollere eller eliminere det. Siden oppfinnelsen av subrutinen har innovasjoner i programvareutvikling vært et kontinuerlig forsøk på å eliminere duplisering fra kildekoden vår.

---

## Strukturert Programmering

Noen programmerere følger Edsger Dijkstras regler for strukturert programmering, som sier at hver funksjon og hver blokk skal ha én inngang og én utgang. Dette betyr at det bare skal være én return-setning, ingen break eller continue i løkker, og aldri, aldri, noen goto-setninger.

> Selv om vi er sympatiske til målene, gir disse reglene liten fordel når funksjonene er veldig små. Hvis du holder funksjonene dine små, vil sporadiske multiple return, break eller continue ikke gjøre noen skade, og kan noen ganger være mer uttrykksfulle. goto har derimot kun mening i store funksjoner, så det bør unngås.

---

## Hvordan skriver du funksjoner som dette?

Å skrive programvare er som all annen skriving. Først får du tankene dine ned, deretter masserer du det til det leses godt. Førsteutkastet kan være klønete og uorganisert, så du finpusser, omstrukturerer og forbedrer det.

Når jeg skriver funksjoner, kommer de ut lange og kompliserte. De har mye innrykk og nestede løkker. De har lange argumentlister. Men jeg har også en suite med enhetstester som dekker hver eneste av de klønete kodelinjene.

Så masserer og forbedrer jeg koden, deler opp i funksjoner, endrer navn, eliminerer duplisering. Jeg krymper metodene og omorganiserer dem. Alt mens jeg sørger for at testene fortsetter å passere.

Til slutt ender jeg opp med funksjoner som følger reglene jeg har lagt frem i dette kapittelet. Jeg skriver dem ikke slik i utgangspunktet. Jeg tror ikke noen kan det.

Konklusjon
Hvert system er bygget av et domenespesifikt språk designet av programmererne for å beskrive det systemet. Funksjoner er verbene i det språket, og klasser er substantivene. Kunsten å programmere er, og har alltid vært, kunsten å designe språk.

Mesterprogrammerere tenker på systemer som historier som skal fortelles, ikke som programmer som skal skrives.

Dette kapittelet har handlet om mekanismene for å skrive funksjoner godt. Hvis du følger reglene her, vil funksjonene dine bli korte, velnavngitte og pent organiserte. Men glem aldri at ditt virkelige mål er å fortelle historien om systemet, og at funksjonene du skriver må passe rent sammen til et klart og presist språk for å hjelpe deg med den fortellingen.

---

## Konklusjon

> Hvert system er bygget av et domenespesifikt språk designet av programmererne for å beskrive det systemet. Funksjoner er verbene i det språket, og klasser er substantivene. Kunsten å programmere er, og har alltid vært, kunsten å designe språk.
>
> Mesterprogrammerere tenker på systemer som historier som skal fortelles, ikke som programmer som skal skrives.
>
> Dette kapittelet har handlet om mekanismene for å skrive funksjoner godt. Hvis du følger reglene her, vil funksjonene dine bli korte, velnavngitte og pent organiserte. Men glem aldri at ditt virkelige mål er å fortelle historien om systemet, og at funksjonene du skriver må passe rent sammen til et klart og presist språk for å hjelpe deg med den fortellingen.

---

**Kommentar om kodeeksempler:**  
Alle kodeeksempler er oversatt til TypeScript, men prinsippene og meningen er uendret fra originalen.
