Prinsippet: Base vs. Modifikatorer

### Komponenter består av to stilnivåer

- **Base-stiler**: Den fundamentale, uforanderlige strukturen.
- **Modifikator-stiler**: Endringer, interaksjoner og tilstander.

---

## 1. `@utility` definerer basen

En egendefinert utility som `product-card-layout` gir et stabilt fundament:

```css
@utility product-card-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
```

Denne samlingen av egenskaper gir et forutsigbart og gjenbrukbart produktkort.

---

## 2. JSX definerer modifikatorer og tilstander

Utility-klasser i JSX-en tilfører variasjoner og interaksjoner:

```tsx
<Card className="product-card-layout bg-card-foreground group hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
```

- `bg-card-foreground`: Fargemodifikator som enkelt kan byttes per kort.
- `group`: Funksjonell markør som aktiverer `group-hover` for barn.
- `hover:shadow-xl`, `hover:shadow-primary/5`, `hover:-translate-y-1`:
  Tilstandsmodifikatorer som gjør hover-oppførselen eksplisitt i markup.

---

## Hvorfor alternative forslag ikke passer

### Kombinere `hover:`-klasser i en `@utility`

`@utility` definerer én CSS-regel. Hver `hover:`-klasse er en egen utility og
kan ikke samles i samme regel.

### Bruke `@apply` på alt

```css
.product-card {
  @apply h-full flex flex-col hover:shadow-xl hover:-translate-y-1;
}
```

Tilnærmingen fungerer, men skjuler oppførselen og gjør komponenten uleselig i
JSX.

### Bruke `@custom-variant` eller `--value()`

- `@custom-variant` er for nye varianter; `hover` finnes allerede.
- `--value()` brukes for utilities med argumenter; det er ikke tilfellet her.

---

## Konklusjon

- Bruk `@utility` til å definere den stabile basen.
- Bruk utility-klasser i JSX til modifikatorer, tilstander og funksjonelle
  markører.

Denne arbeidsflyten gir maksimal fleksibilitet, lesbarhet og vedlikeholdbarhet.
