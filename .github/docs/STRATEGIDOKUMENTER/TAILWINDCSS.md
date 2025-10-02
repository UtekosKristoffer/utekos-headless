# Hvordan vi løser CSS i vårt prosjekt

Strategien vi allerede har etablert, er den moderne og anbefalte måten å
håndtere "komponent-styling" på i Tailwind v4:

- For allmenn styling: Vi bruker utility-klasser direkte i JSX.

- For gjenbrukbare komponent-stiler: Vi lager semantiske @utility-klasser i
  globals.css (som .product-card og .btn-tab).

Når vi lager @utility product-card { ... }, skaper vi en "scopet" stil for den
komponenten, men den forblir en fullverdig del av Tailwind-systemet med
variant-støtte og intelligent sortering – uten noen av ulempene til CSS Modules.

## Konklusjon: Vår nåværende tilnærming er fullt ut i tråd med "best practice" for et Next.js- og Tailwind v4-prosjekt.
