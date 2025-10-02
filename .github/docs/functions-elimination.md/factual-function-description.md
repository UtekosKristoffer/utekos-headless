> **Merk**: Kontekst: Faktabasert - En objektiv tilnærming - .

# Funksjonsbeskrivelse av `@property`

`@property`er en CSS `at-rule` som formelt registrerer en `custom property`, og
definerer dens "kontrakt": en påkrevd `syntax` (type), `inherits` (arv) og
`initial-value` (standardverdi). Ved å kjenne typen, kan nettleseren interpolere
verdien. Dette muliggjør jevne animasjoner og overganger (transition) for
egenskaper som tidligere ikke var animerbare, som fargestopp i en
`linear-gradient`. Hvis en ugyldig verdi brukes, faller variabelen tilbake til
sin registrerte `initial-value`, noe som gjør komponenter mer robuste.

---

## Svakheter og ting å være bevisst på

### 1. Sen validering

Type-sjekken skjer ved "computed-value time", ikke når CSS-en parses. En vanlig
feilkilde er @supports, som vil returnere true for en syntaktisk gyldig, men
type-ugyldig, verdi (f.eks. @supports (--my-color: 1em)), fordi sjekken skjer
før typen valideres.

### 1. Uavhengig startverdi

`initial-value` må være "computationally independent". Det betyr at den ikke kan
bruke relative enheter som em eller rem, da verdien ikke kan avhenge av f.eks.
`font-size`.

Globalt omfang: Registreringer er globale for hele dokumentet og er ikke
avgrenset til Shadow DOM. Dette kan føre til navnekonflikter mellom komponenter.

---

## Kontekst

Beskrivelsen er skrevet med regler om maks 250 ord (eks. kilder), benytte
annerkjente kilder og krav om å belyse både positive og negative sider.

---

## Kilder

https://drafts.css-houdini.org/css-properties-values-api-1/#at-property-rule

https://developer.mozilla.org/en-US/docs/Web/CSS/@property
