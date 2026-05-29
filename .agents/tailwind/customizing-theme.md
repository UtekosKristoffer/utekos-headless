# [Customizing your theme](https://tailwindcss.com/docs/theme#customizing-your-theme)

The default theme variables are very general purpose and suitable for building
dramatically different designs, but they are still just a starting point. It's
very common to customize things like the color palette, fonts, and shadows to
build exactly the design you have in mind.

## [Extending the default theme](https://tailwindcss.com/docs/theme#extending-the-default-theme)

Use `@theme` to define new theme variables and extend the default theme:

```css
@import 'tailwindcss';
@theme {
  --font-script: Great Vibes, cursive;
}
```

This makes a new `font-script` utility class available that you can use in your
HTML, just like the default `font-sans` or `font-mono` utilities:

```css
<p class="font-script">This will use the Great Vibes font family.</p>
```

Learn more about how theme variables map to different utility classes and
variants in the
[theme variable namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)
documentation.

## [Overriding the default theme](https://tailwindcss.com/docs/theme#overriding-the-default-theme)

Override a default theme variable value by redefining it within `@theme`:

```css
@import 'tailwindcss';

@theme {
  --breakpoint-sm: 30rem;
}
```

Now the `sm:*` variant will trigger at 30rem instead of the default 40rem
viewport size:

```html
<div class="grid grid-cols-1 sm:grid-cols-3"><!-- ... --></div>
```

To completely override an entire namespace in the default theme, set the entire
namespace to `initial` using the special asterisk syntax:

```css
@import 'tailwindcss';
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-purple: #3f3cbb;
  --color-midnight: #121063;
  --color-tahiti: #3ab7bf;
  --color-bermuda: #78dcca;
}
```

When you do this, all of the default utilities that use that namespace _(like
`bg-red-500`)_ will be removed, and only your custom values _(like
`bg-midnight`)_ will be available.

Learn more about how theme variables map to different utility classes and
variants in the
[theme variable namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)
documentation.

### [Using a custom theme](https://tailwindcss.com/docs/theme#using-a-custom-theme)

To completely disable the default theme and use only custom values, set the
global theme variable namespace to `initial`:

```css
@import 'tailwindcss';
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-lagoon: oklch(0.72 0.11 221.19);
  --color-coral: oklch(0.74 0.17 40.24);
  --color-driftwood: oklch(0.79 0.06 74.59);
  --color-tide: oklch(0.49 0.08 205.88);
  --color-dusk: oklch(0.82 0.15 72.09);
}
```

Now none of the default utility classes that are driven by theme variables will
be available, and you'll only be able to use utility classes matching your
custom theme variables like `font-body` and `text-dusk`.

## Referencing other variables

When defining theme variables that reference other variables, use the inline
option:

```css
@import 'tailwindcss';
@theme inline {
  --font-sans: var(--font-inter);
}
```

Using the inline option, the utility class will use the theme variable value
instead of referencing the actual theme variable:

```css
.font-sans {
  font-family: var(--font-inter);
}
```

Without using `inline`, your utility classes might resolve to unexpected values
because of how variables are resolved in CSS.

For example, this text will fall back to `sans-serif` instead of using `Inter`
like you might expect:

```html
<div id="parent" style="--font-sans: var(--font-inter, sans-serif);">
  <div id="child" style="--font-inter: Inter; font-family: var(--font-sans);">
    This text will use the sans-serif font, not Inter.
  </div>
</div>
```

This happens because `var(--font-sans)` is resolved where `--font-sans` is
defined _(on `#parent`)_, and `--font-inter` has no value there since it's not
defined until deeper in the tree _(on `#child`)_.

## Generating all CSS variables

By default only used CSS variables will be generated in the final CSS output. If
you want to always generate all CSS variables, you can use the static theme
option:

```css
@import 'tailwindcss';
@theme static {
  --color-primary: var(--color-red-500);
  --color-secondary: var(--color-blue-500);
}
```

## [Using your theme variables](https://tailwindcss.com/docs/theme#using-your-theme-variables)

All of your theme variables are turned into regular CSS variables when you
compile your CSS:

```css
:root {
  --font-sans:
    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  --color-red-50: oklch(0.971 0.013 17.38);
  --color-red-100: oklch(0.936 0.032 17.717);
  --color-red-200: oklch(0.885 0.062 18.334);
  /* ... */
  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  /* ... */
}
```

This makes it easy to reference all of your design tokens in any of your custom
CSS or inline styles.

### [With custom CSS](https://tailwindcss.com/docs/theme#with-custom-css)

Use your theme variables to get access to your design tokens when you're writing
custom CSS that needs to use the same values:

app.css

```css
@import 'tailwindcss';
@layer components {
  .typography {
    p {
      font-size: var(--text-base);
      color: var(--color-gray-700);
    }
    h1 {
      font-size: var(--text-2xl--line-height);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-950);
    }
    h2 {
      font-size: var(--text-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-950);
    }
  }
}
```

This is often useful when styling HTML you don't control, like Markdown content
coming from a database or API and rendered to HTML.

### [Referencing in JavaScript](https://tailwindcss.com/docs/theme#referencing-in-javascript)

Most of the time when you need to reference your theme variables in JS you can
just use the CSS variables directly, just like any other CSS value.

For example, the popular [Motion](https://motion.dev/docs/react-quick-start)
library for React lets you animate to and from CSS variable values:

```jsx
<motion.div animate={{ backgroundColor: 'var(--color-blue-500)' }} />
```

If you need access to a resolved CSS variable value in JS, you can use
`getComputedStyle` to get the value of a theme variable on the document root:

```javascript
let styles = getComputedStyle(document.documentElement)
let shadow = styles.getPropertyValue('--shadow-xl')
```
