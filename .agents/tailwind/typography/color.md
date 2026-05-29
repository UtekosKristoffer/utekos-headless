# color

Utilities for controlling the text color of an element.

| Class                            | color                                                                       |
| -------------------------------- | --------------------------------------------------------------------------- |
| `text-inherit`                   | `inherit`                                                                   |
| `text-current`                   | `currentColor`                                                              |
| `text-transparent`               | `transparent`                                                               |
| `text-black`                     | `var(--color-black); /* #000 */`                                            |
| `text-white`                     | `var(--color-white); /* #fff */`                                            |
| `text-<color>-<shade>`           | `var(--color-<color>-<shade>);`                                             |
| `text-<color>-<shade>/<opacity>` | `color-mix(in oklab, var(--color-<color>-<shade>) <opacity>, transparent);` |
| `text-(<custom-property>)`       | `var(<custom-property>);`                                                   |
| `text-[<value>]`                 | `<value>;`                                                                  |

Examples from the default palette:

| Class           | color                                                   |
| --------------- | ------------------------------------------------------- |
| `text-red-50`   | `var(--color-red-50); /* oklch(97.1% 0.013 17.38) */`   |
| `text-red-100`  | `var(--color-red-100); /* oklch(93.6% 0.032 17.717) */` |
| `text-red-500`  | `var(--color-red-500);`                                 |
| `text-blue-600` | `var(--color-blue-600);`                                |

…and so on for each color and shade in the theme.

## [Examples](https://tailwindcss.com/docs/color#examples)

### [Basic example](https://tailwindcss.com/docs/color#basic-example)

Use utilities like `text-blue-600` and `text-sky-400` to control the text color
of an element:

The quick brown fox jumps over the lazy dog.

```html
<p class="text-blue-600 dark:text-sky-400">The quick brown fox...</p>
```

### [Changing the opacity](https://tailwindcss.com/docs/color#changing-the-opacity)

Use the color opacity modifier to control the text color opacity of an element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

```html
<p class="text-blue-600/100 dark:text-sky-400/100">The quick brown fox...</p>
<p class="text-blue-600/75 dark:text-sky-400/75">The quick brown fox...</p>
<p class="text-blue-600/50 dark:text-sky-400/50">The quick brown fox...</p>
<p class="text-blue-600/25 dark:text-sky-400/25">The quick brown fox...</p>
```

### [Using a custom value](https://tailwindcss.com/docs/color#using-a-custom-value)

Use the `text-[<value>]` syntax to set the text color based on a completely
custom value:

```html
<p class="text-[#50d71e] ...">Lorem ipsum dolor sit amet...</p>
```

For CSS variables, you can also use the `text-(<custom-property>)` syntax:

```html
<p class="text-(--my-color) ...">Lorem ipsum dolor sit amet...</p>
```

This is just a shorthand for `text-[var(<custom-property>)]` that adds the
`var()` function for you automatically.

### [Applying on hover](https://tailwindcss.com/docs/color#applying-on-hover)

Prefix a `color` utility with a variant like `hover:*` to only apply the utility
in that state:

Hover over the text to see the expected behavior

Oh I gotta get on that [internet](https://en.wikipedia.org/wiki/Internet), I'm
late on everything!

```html
<p class="...">
  Oh I gotta get on that
  <a
    class="underline hover:text-blue-600 dark:hover:text-blue-400"
    href="https://en.wikipedia.org/wiki/Internet"
    >internet</a
  >, I'm late on everything!
</p>
```

Learn more about using variants in the
[variants documentation](https://tailwindcss.com/docs/hover-focus-and-other-states).

### [Responsive design](https://tailwindcss.com/docs/color#responsive-design)

Prefix a `color` utility with a breakpoint variant like `md:` to only apply the
utility at medium screen sizes and above:

```html
<p class="text-blue-600 md:text-green-600 ...">Lorem ipsum dolor sit amet...</p>
```

Learn more about using variants in the
[variants documentation](https://tailwindcss.com/docs/hover-focus-and-other-states).

## [Customizing your theme](https://tailwindcss.com/docs/color#customizing-your-theme)

Use the `--color-*` theme variables to customize the color utilities in your
project:

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

Now the `text-regal-blue` utility can be used in your markup:

```html
<p class="text-regal-blue">Lorem ipsum dolor sit amet...</p>
```

[font-family](https://tailwindcss.com/docs/font-family)
