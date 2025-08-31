---
applyTo: 'src/**/*.{ts,tsx}'
---

Note: More information, guidelines and documentation can be found in the following locale files:

.github/copilot-config.md,
.github/tanstack-query-v5/copilot-tanstack-guide.md,
.github/tanstack-query-v5/copilot-tanstack-new-features.md,
.github/tanstack-query-v5/copilot-tanstack-useQuery.md,
.github/tanstack-query-v5/copilot-tanstack-QueryClient.md,
.github/tanstack-query-v5/hooks/copilot-tanstack-query-v5-hooks.md,
.github/tanstack-query-v5/hooks/examples/copilot-tanstack-prefetching.md,
.github/tanstack-query-v5/hooks/examples/copilot-tanstack-useQuery.md,
.github/tanstack-query-v5/hooks/examples/copilot-tanstack-suspense-streaming-examples.md,
.github/xstate/copilot-xstate-breaking-changes.md,
.github/xstate/copilot-@xstate-react.md,
.github/typescript/copilot-typescript-breaking-changes.md,

# Instruction for Copilot

- This document provides comprehensive instructions for Copilot to assist in developing a world-class e-commerce application using Next.js and React. It outlines the architectural principles, coding standards, and best practices that must be followed without exception.

# Copilot Instructions: E-commerce Project (World-Class Standards)

## 1. Goal and Context

Your primary goal is to assist in building an extremely performant, maintainable, and robust e-commerce application. You are a world-class senior developer, an expert in the Next.js App Router version 15.5 and React version 19. The application adheres to established principles without exception. Every code suggestion and change must comply with these principles. We do not take shortcuts.

### Naming Quality and Semantics

- Use names that clearly reflect their meaning and context, as a world-class developer would.
- Avoid abbreviations and cryptic names. Every name must be self-explanatory.
- **Use English for all names, comments, and documentation.** This is the project standard.
- Avoid unnecessary prefixes like `I` for interfaces or `T` for types.
- Use semantically accurate, descriptive names that are idiomatic within modern frontend development.

* **Project:** Headless e-commerce (Shopify).
* **Framework:** Next.js version `15.5.5` (App Router).
* **React:** version `19.1.0`.
* **Language:** TypeScript version `5.9.2`
* See file copilot-config.md for a full overview over the projects configuration and used packages.

---

## 2. Architectural Principles (Unyielding Rules)

These are the three laws of our architecture. All code must respect them.

1.  **Rendering: Server-First.** Server Components (RSC) are the default for data loading and UI. Client Components (`'use client'`) are used **only** for interactivity.
2.  **Data Flow: Unidirectional & Server-Driven.** Client interactions trigger Server Actions. The server is the Single Source of Truth and updates the UI by revalidating data (`revalidateTag`).
3.  **Compiler: Trust the React Compiler.** Write simple, readable code. **Avoid manual memoization** like `useCallback` and `useMemo`.

---

## 3. Style Guide and Patterns

### Code Quality

- **TypeScript:** No `any`.
- **Components:** Prefer using the design system's components (e.g., `<Button variant="default">`) over overriding with long, manual `className` strings. `className` is for layout (margin, flex), not style (color, border).
- **Priority:** If you see existing code that conflicts with these instructions, **these instructions take precedence**. Your goal is to help refactor towards these standards.

---

## 4. Documentation

Our documentation standard is guided by one principle: Maximize signal, minimize noise. Every comment must provide high-value architectural insight or clarify complex logic. We trust our tools to handle redundant metadata (like file paths) and follow modern conventions to keep our code clean and maintainable.

1. File-Level Documentation
   File-level JSDoc is reserved for modules with significant architectural roles (e.g., core logic, services, complex components). Simple or self-explanatory files do not require it.

   The purpose of this documentation is to describe the file's role and responsibility within the system, not to list its contents.

   DO: Explain why the module exists and its place in the architecture.

   DO NOT: Describe specific functions, types, or returns. That is the job of inline documentation.

   Golden Path: File-Level Documentation:

   ````typescript
   /**
    * This module centralizes all interactions with the Shopify Storefront API
    * regarding shopping cart data. It acts as a dedicated data-fetching and
    * transformation layer, abstracting the direct API communication away
    * from UI components.
    *
    * @module lib/shopify/cart
    * @see {@link https://shopify.dev/docs/api/storefront/|Shopify Storefront API Docs}
    */
      ```
   ````

   Anti-Patterns: Tags to Avoid in File-Level Docs
   The following tags are considered noise and must not be used at the file level:

   @file: Redundant. Modern tools derive this from the file system. Hardcoding it is brittle and violates the DRY principle.

   @description: Redundant. The comment block itself is the description.

   @summary: Redundant. By convention, the first sentence of the description is the summary.

   @function, @returns, etc.: These are function-specific tags and belong directly above the function they describe.

2. Function & Component Documentation:
   This documentation is placed directe "How")ly above the function, class, or component it describes. It should be concise and focus on information that is not obvious from the code itself.
   Golden Path: Function-Level Documentation:

   ```typescript
   /**
    * Retrieves a specific cart by its ID from the Shopify Storefront API.
    * This function handles the API request and normalizes the complex response from Shopify
    * into a clean, application-specific `Cart` object.
    *
    * @param {string} id - The unique storefront ID of the cart (e.g., 'gid://...').
    * @returns {Promise<Cart | null>} A promise that resolves with the normalized `Cart`
    * object, or `null` if the request fails or the cart is not found.
    * @example
    * const myCart = await getCart('gid://shopify/Cart/abc123xyz');
    */
   ```

## 5. Experimental Features

- typedRoutes: Next.js can statically type links to prevent typos and other errors when using next/link,
  improving type safety when navigating between pages. Next.js will generate a link definition in .next/types that contains information about all existing routes in your application, which TypeScript can then use to provide feedback in your editor about invalid links.
  Currently, experimental support includes any string literal, including dynamic segments. For non-literal strings, you currently need to manually cast the href with as Route:

```typescript
import type { Route } from 'next'
import Link from 'next/link'
```

// No TypeScript errors if href is a valid route

  <Link href="/about" />
  <Link href="/blog/nextjs" />
  <Link href={`/blog/${slug}`} />
  <Link href={('/blog' + slug) as Route} />

// TypeScript errors if href is not a valid route

  <Link href="/aboot" />
    ```

### added experimental features in next.config.ts Configuration

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    reactCompiler: true
  }
  // The rest...
}
export default nextConfig
```

---

- `reactCompiler`: React Compiler automatically optimizes the application at build time. React is often fast enough without optimization, but sometimes you need to manually memoize components and values to keep your app responsive. This manual memoization is tedious, easy to get wrong, and adds extra code to maintain. React Compiler does this optimization automatically for you, freeing you from this mental burden so you can focus on building features. So reactCompiler improves performance by automatically optimizing component rendering. Eliminates our need for manual memoization with `useMemo` and `useCallback`.

---

## 6. The `'use server'` Directive

- Marks functions or entire files for server-side execution only.
  - Usage (Two Methods)
    - File Level
      - `'use server'` at the top of a file makes all its exports Server Functions.
    - Inline
      - `'use server'` at the top of a function body makes only that specific function a Server Function.
    - Interaction
      - Server Functions can be imported and called directly from Client Components.
    - Primary Use Case
      - Data mutations, especially as `action` props in `<form>` elements.
    - Rules
      - Security
        - Always authenticate and authorize sensitive operations.
    - Serialization
      - Arguments and return values must be serializable. JSX, classes, and non-Server Functions are not permitted.

---

## 7. Workflow | Baseline of Understanding

- Get to know these files to set your baseline of understanding:
- `src/lib/state/createCartProcess.ts`, `src/lib/helpers/getCart` `src/lib/state/cartStore.ts`, `src/components/CartDrawer.tsx`, `src/clients/CartProcessClient.tsx`, `src/lib/actors/CartProcessContext.ts` and `src/components/Provider.tsx`. These files are crucial for the cart functionality and should be used as a reference for implementing similar features in other parts of the application.
