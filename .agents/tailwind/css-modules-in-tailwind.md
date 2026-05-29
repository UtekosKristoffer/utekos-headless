## [CSS modules](https://tailwindcss.com/docs/compatibility#css-modules)

Tailwind is compatible with CSS modules and can co-exist with them if you are
introducing Tailwind into a project that already uses them, but **we don't
recommend using CSS modules and Tailwind together** if you can avoid it.

### [Scoping concerns](https://tailwindcss.com/docs/compatibility#scoping-concerns)

CSS modules are designed to solve scoping problems that just don't exist when
composing utility classes in your HTML instead of writing custom CSS.

Styles are naturally scoped with Tailwind because each utility class always does
the same thing, no matter where it's used — there's no risk that adding a
utility class to one part of your UI creates some unexpected side effect
somewhere else.

### [Performance](https://tailwindcss.com/docs/compatibility#performance)

When using CSS modules, build tools like Vite, Parcel, and Turbopack process
each CSS module separately. That means if you have 50 CSS modules in a project,
**Tailwind needs to run 50 separate times**, which leads to much slower build
times and a worse developer experience.

### [Explicit context sharing](https://tailwindcss.com/docs/compatibility#explicit-context-sharing)

Since CSS modules are each processed separately, they have no `@theme` unless
you import one.

This means features like `@apply` won't work the way you expect unless you
explicitly import your global styles as reference:

Import your global styles as reference to make sure your theme variables are
defined

Button.module.css

```css
@reference "../app.css";
button {
  @apply bg-blue-500;
}
```

Alternatively, you can also just use CSS variables instead of `@apply` which has
the added benefit of letting Tailwind skip processing those files and will
improve your build performance:

Button.module.css

```css
button {
  background: var(--color-blue-500);
}
```
