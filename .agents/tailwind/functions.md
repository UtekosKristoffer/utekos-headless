# [Functions](https://tailwindcss.com/docs/functions-and-directives#functions)

Tailwind provides the following build-time functions to make working with colors
and the spacing scale easier.

## [\--alpha()](https://tailwindcss.com/docs/functions-and-directives#alpha-function)

Use the `--alpha()` function to adjust the opacity of a color:

### Input CSS

```css
.my-element {
  color: --alpha(var(--color-lime-300) / 50%);
}
```

### Compiled CSS

```css
.my-element {
  color: color-mix(in oklab, var(--color-lime-300) 50%, transparent);
}
```

### [\--spacing()](https://tailwindcss.com/docs/functions-and-directives#spacing-function)

Use the `--spacing()` function to generate a spacing value based on your theme:

Input CSS

```
.my-element {  margin: --spacing(4);}
```

Compiled CSS

```
.my-element {  margin: calc(var(--spacing) * 4);}
```

This can also be useful in arbitrary values, especially in combination with
`calc()`:

HTML

```
<div class="py-[calc(--spacing(4)-1px)]">  <!-- ... --></div>
```

## [Compatibility](https://tailwindcss.com/docs/functions-and-directives#compatibility)

The following directives and functions exist solely for compatibility with
Tailwind CSS v3.x.

The `@config` and `@plugin` directives may be used in conjunction with `@theme`,
`@utility`, and other CSS-driven features. This can be used to incrementally
move over your theme, custom configuration, utilities, variants, and presets to
CSS. Things defined in CSS will be merged where possible and otherwise take
precedence over those defined in configs, presets, and plugins.

### [@config](https://tailwindcss.com/docs/functions-and-directives#config-directive)

Use the `@config` directive to load a legacy JavaScript-based configuration
file:

```css
@config "../../tailwind.config.js";
```

The `corePlugins`, `safelist`, and `separator` options from the JavaScript-based
config are not supported in v4.0. To safelist utilities in v4 use
[`@source inline()`](https://tailwindcss.com/docs/detecting-classes-in-source-files#safelisting-specific-utilities).

### [@plugin](https://tailwindcss.com/docs/functions-and-directives#plugin-directive)

Use the `@plugin` directive to load a legacy JavaScript-based plugin:

```css
@plugin "@tailwindcss/typography";
```

The `@plugin` directive accepts either a package name or a local path.
