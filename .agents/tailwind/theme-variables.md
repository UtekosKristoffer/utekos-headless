# Theme variables

Using utility classes as an API for your design tokens.

## [Overview](https://tailwindcss.com/docs/theme#overview)

Tailwind is a framework for building custom designs, and different designs need
different typography, colors, shadows, breakpoints, and more.

These low-level design decisions are often called _design tokens_, and in
Tailwind projects you store those values in _theme variables_.

### [What are theme variables?](https://tailwindcss.com/docs/theme#what-are-theme-variables)

Theme variables are special CSS variables defined using the `@theme` directive
that influence which utility classes exist in your project.

For example, you can add a new color to your project by defining a theme
variable like `--color-mint-500`:

```css
@import 'tailwindcss';
@theme {
  --color-mint-500: oklch(0.72 0.11 178);
}
```

Now you can use utility classes like `bg-mint-500`, `text-mint-500`, or
`fill-mint-500` in your :

```
<div class="bg-mint-500"><!-- ... --></div>
```

Tailwind also generates regular CSS variables for your theme variables so you
can reference your design tokens in arbitrary values or inline styles:

```
<div style="background-color: var(--color-mint-500)"><!-- ... --></div>
```

Learn more about how theme variables map to different utility classes in the
[theme variable namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)
documentation.

#### [Why `@theme` instead of `:root`?](https://tailwindcss.com/docs/theme#why-theme-instead-of-root)

Theme variables aren't _just_ CSS variables — they also instruct Tailwind to
create new utility classes that you can use in your .

Since they do more than regular CSS variables, Tailwind uses special syntax so
that defining theme variables is always explicit. Theme variables are also
required to be defined top-level and not nested under other selectors or media
queries, and using a special syntax makes it possible to enforce that.

Defining regular CSS variables with `:root` can still be useful in Tailwind
projects when you want to define a variable that isn't meant to be connected to
a utility class. Use `@theme` when you want a design token to map directly to a
utility class, and use `:root` for defining regular CSS variables that shouldn't
have corresponding utility classes.

### [Relationship to utility classes](https://tailwindcss.com/docs/theme#relationship-to-utility-classes)

Some utility classes in Tailwind like `flex` and `object-cover` are static, and
are always the same from project to project. But many others are driven by theme
variables, and only exist because of the theme variables you've defined.

For example, theme variables defined in the `--font-*` namespace determine all
of the `font-family` utilities that exist in a project:

./node_modules/tailwindcss/theme.css

```css
@theme {
  --font-sans:
    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace; /* ... */
}
```

The `font-sans`, `font-serif`, and `font-mono` utilities only exist by default
because Tailwind's default theme defines the `--font-sans`, `--font-serif`, and
`--font-mono` theme variables.

If another theme variable like `--font-poppins` were defined, a `font-poppins`
utility class would become available to go with it:

```css
@import 'tailwindcss';
@theme {
  --font-poppins: Poppins, sans-serif;
}
```

```
<h1 class="font-poppins">This headline will use Poppins.</h1>
```

You can name your theme variables whatever you want within these namespaces, and
a corresponding utility with the same name will become available to use in your
.

#### [Relationship to variants](https://tailwindcss.com/docs/theme#relationship-to-variants)

Some theme variables are used to define variants rather than utilities. For
example theme variables in the `--breakpoint-*` namespace determine which
responsive breakpoint variants exist in your project:

```css
@import 'tailwindcss';
@theme {
  --breakpoint-3xl: 120rem;
}
```

Now you can use the `3xl:*` variant to only trigger a utility when the viewport
is 120rem or wider:

```
<div class="3xl:grid-cols-6 grid grid-cols-2 md:grid-cols-4"><!-- ... --></div>
```

Learn more about how theme variables map to different utility classes and
variants in the
[theme variable namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)
documentation.

### [Theme variable namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)

Theme variables are defined in _namespaces_ and each namespace corresponds to
one or more utility class or variant APIs.

Defining new theme variables in these namespaces will make new corresponding
utilities and variants available in your project:

| Namespace          | Utility classes                                                          |
| ------------------ | ------------------------------------------------------------------------ |
| `--color-*`        | Color utilities like `bg-red-500`, `text-sky-300`, and many more         |
| `--font-*`         | Font family utilities like `font-sans`                                   |
| `--text-*`         | Font size utilities like `text-xl`                                       |
| `--font-weight-*`  | Font weight utilities like `font-bold`                                   |
| `--tracking-*`     | Letter spacing utilities like `tracking-wide`                            |
| `--leading-*`      | Line height utilities like `leading-tight`                               |
| `--tab-size-*`     | Tab size utilities like `tab-github`                                     |
| `--breakpoint-*`   | Responsive breakpoint variants like `sm:*`                               |
| `--container-*`    | Container query variants like `@sm:*` and size utilities like `max-w-md` |
| `--spacing-*`      | Spacing and sizing utilities like `px-4`, `max-h-16`, and many more      |
| `--radius-*`       | Border radius utilities like `rounded-sm`                                |
| `--shadow-*`       | Box shadow utilities like `shadow-md`                                    |
| `--inset-shadow-*` | Inset box shadow utilities like `inset-shadow-xs`                        |
| `--drop-shadow-*`  | Drop shadow filter utilities like `drop-shadow-md`                       |
| `--blur-*`         | Blur filter utilities like `blur-md`                                     |
| `--perspective-*`  | Perspective utilities like `perspective-near`                            |
| `--zoom-*`         | Zoom utilities like `zoom-compact`                                       |
| `--aspect-*`       | Aspect ratio utilities like `aspect-video`                               |
| `--ease-*`         | Transition timing function utilities like `ease-out`                     |
| `--animate-*`      | Animation utilities like `animate-spin`                                  |

For a list of all of the default theme variables, see the
[default theme variable reference](https://tailwindcss.com/docs/theme#default-theme-variable-reference).

### [Default theme variables](https://tailwindcss.com/docs/theme#default-theme-variables)

When you import `tailwindcss` at the top of your CSS file, it includes a set of
default theme variables to get you started.

Here's what you're actually importing when you import `tailwindcss`:

node_modules/tailwindcss/index.css

```css
@layer theme, base, components, utilities;
@import './theme.css' layer(theme);
@import './preflight.css' layer(base);
@import './utilities.css' layer(utilities);
```

That `theme.css` file includes the default color palette, type scale, shadows,
fonts, and more:

node_modules/tailwindcss/theme.css

```css
@theme {
  --font-sans:
    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  --color-red-50: oklch(0.971 0.013 17.38);
  --color-red-100: oklch(0.936 0.032 17.717);
  --color-red-200: oklch(0.885 0.062 18.334); /* ... */
  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm:
    0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); /* ... */
}
```

This is why utilities like `bg-red-200`, `font-serif`, and `shadow-sm` exist out
of the box — they're driven by the default theme, not hardcoded into the
framework like `flex-col` or `pointer-events-none`.

[Read about customizing theme:](./customizing-theme.md)
