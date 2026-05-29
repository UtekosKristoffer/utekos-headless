# SKILL: Tailwind CSS v4 Installasjon (Next.js)

Dette er en kort huskeliste for oppsett av den moderne, lynraske Tailwind v4-motoren i nye Next.js prosjekter.

## Hvorfor denne metoden er optimal i v4

- [ ] **Ingen `tailwind.config.js`:** All konfigurasjon styres via CSS. Installasjonen er slankere.
- [ ] **Rust-basert Compiler:** Tailwind v4 bygger CSS i Rust, og den nye `@tailwindcss/postcss` oversetter lynraskt uten ekstra dependencies.

## Standard Oppsett-rutine

### 1. Opprett Next.js prosjekt (hvis nytt)

```bash
npx create-next-app@latest my-project --typescript --eslint --app
cd my-project
```

### 2. Installer nødvendige pakker

Installer selve Tailwind og den nye oppdaterte PostCSS-pluginen:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

### 3. Konfigurer PostCSS

Opprett eller rediger `postcss.config.mjs` i rot-mappen, og benytt v4-pluginet.
_(Merk at dette erstatter eventuell v3 legacy configuration)._

```javascript
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### 4. Importer Tailwind-motoren i Global CSS

Tøm/rens `./app/globals.css` (eller hva hoved-stilarket heter), og injiser Tailwinds kjerne:

```css
/* globals.css */
@import "tailwindcss";

/* 
Her legger du senere til alle @theme konfigurasjoner for prosjektet:
@theme {
  --color-primary: #123456;
}
*/
```

### 5. Kjør prosjektet

```bash
npm run dev
```
