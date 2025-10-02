# Adding Custom Styles in Tailwind CSS

> **Overview**: Best practices for adding custom styles while maintaining the
> utility-first approach and leveraging powerful escape hatches.

## Table of Contents

1. [Core Concept](#core-concept)
2. [Arbitrary Values](#arbitrary-values)
3. [Arbitrary Properties](#arbitrary-properties)
4. [Arbitrary Variants](#arbitrary-variants)
5. [Handling Edge Cases](#handling-edge-cases)
6. [Advanced Techniques](#advanced-techniques)
7. [Best Practices](#best-practices)

---

## Core Concept

The biggest challenge when working with any framework is figuring out what to do
when there's something you need that the framework doesn't handle for you.

Tailwind is designed from the ground up to be **extensible and customizable**,
so that no matter what you're building, you should never feel like you're
fighting against the framework.

This guide covers:

- Customizing design tokens
- Breaking out of constraints when necessary
- Adding custom CSS
- Extending the framework with plugins

---

## Arbitrary Values

### Breaking Out of Design Constraints

Sometimes you need to break out of your design system constraints to get things
pixel-perfect. When you really need something like `top: 117px` to position a
background image just right, use Tailwind's **square bracket notation** to
generate a class on the fly:

```html
<div class="top-[117px]">
  <!-- ... -->
</div>
```

### Combining with Modifiers

This is essentially like inline styles, with the major advantage that you can
combine it with interactive modifiers like `hover` and responsive modifiers like
`lg`:

```html
<div class="top-[117px] lg:top-[344px] hover:top-[120px]">
  <!-- ... -->
</div>
```

### Comprehensive Value Support

Arbitrary values work for everything in the framework, including:

```html
<!-- Background colors -->
<div class="bg-[#bada55]">
  <!-- Font sizes -->
  <div class="text-[22px]">
    <!-- Pseudo-element content -->
    <div class="before:content-['Festivus']">
      <!-- Multiple properties -->
      <div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
        <!-- ... -->
      </div>
    </div>
  </div>
</div>
```

### CSS Variable Shorthand

When referencing a CSS variable as an arbitrary value, you can use the custom
property syntax:

```html
<div class="fill-[--my-brand-color]">
  <!-- ... -->
</div>
```

This is shorthand for `fill-[var(--my-brand-color)]` that automatically adds the
`var()` function.

---

## Arbitrary Properties

### Direct CSS Property Usage

If you need to use a CSS property that Tailwind doesn't have a utility for "out
of the box," use square bracket notation to write completely arbitrary CSS:

```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```

### Responsive CSS Variables

This is particularly powerful for CSS variables that need to change under
different conditions:

```html
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
  <!-- ... -->
</div>
```

**Why this matters**: This single approach can eliminate the need for many
small, separate CSS classes, keeping your styling decisions in the markup
alongside your other styles.

---

## Arbitrary Variants

### Complex One-Off Selectors

Arbitrary variants are similar to arbitrary values but are used to create
selector modifications on the fly. They're equivalent to what you can do with
built-in pseudo-class variants like `hover:{utility}` or responsive variants
like `md:{utility}`, but using square bracket notation directly in the HTML.

### Powerful Example: Nth-Child Styling

```html
<ul role="list">
  {#each items as item}
  <li class="lg:[&:nth-child(-n+3)]:hover:underline">{item}</li>
  {/each}
</ul>
```

**What this does**: On `lg` screens and larger, applies `hover:underline` to the
first 3 children of the list.

**Why this is revolutionary**: This solves a classic CSS problem (styling the
first N elements) elegantly, directly in the markup, without creating separate
CSS classes.

### Advanced Selector Combinations

```html
<!-- Style every even child on hover -->
<div class="[&:nth-child(even)]:hover:bg-gray-100">
  <!-- Target specific data attributes -->
  <div class="[&[data-state='active']]:text-blue-500">
    <!-- Combine multiple selectors -->
    <div class="[&>svg]:w-4 [&>svg]:h-4"></div>
  </div>
</div>
```

---

## Handling Edge Cases

### Whitespace in Arbitrary Values

When an arbitrary value needs to contain a space, use an underscore (`_`)
instead — Tailwind automatically converts underscores to spaces at build time:

```html
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- Becomes: grid-template-columns: 1fr 500px 2fr; -->
</div>
```

### URL Handling

In situations where underscores are common but spaces are invalid (like URLs),
Tailwind preserves the underscore:

```html
<div class="bg-[url('/what_a_rush.png')]">
  <!-- Underscore preserved in URL -->
</div>
```

### JavaScript String Handling

If you're using JSX where backslashes are stripped from rendered HTML, use
`String.raw()`:

```jsx
<div className={String.raw`before:content-['hello\_world']`}>
  <!-- ... -->
</div>
```

---

## Advanced Techniques

### Resolving Type Ambiguities

Many utilities share a common namespace but map to different CSS properties. For
example, `text-lg` and `text-black` both use the `text-` namespace, but one is
for `font-size` and the other is for `color`.

#### Automatic Resolution

Tailwind can generally handle ambiguity automatically:

```html
<!-- Generates font-size utility -->
<div class="text-[22px]">...</div>

<!-- Generates color utility -->
<div class="text-[#bada55]">...</div>
```

#### Type Hinting for CSS Variables

When using CSS variables, the context can be ambiguous:

```html
<div class="text-[--my-var]">...</div>
```

**Solution**: Add a CSS data type before the value to "hint" the underlying
type:

```html
<!-- Generates font-size utility -->
<div class="text-[length:--my-var]">...</div>

<!-- Generates color utility -->
<div class="text-[color:--my-var]">...</div>
```

**Critical for robust code**: This type hinting is essential for writing
predictable, maintainable styles when working with CSS variables.

### Available Data Types

Common data types for type hinting:

- `length` - for sizes, margins, padding
- `color` - for any color value
- `percentage` - for percentage values
- `number` - for numeric values
- `integer` - for whole numbers
- `angle` - for rotation values
- `time` - for animation/transition durations

---

## Best Practices

### ✅ Do's

1. **Use arbitrary values sparingly**: They're escape hatches, not the primary
   approach
2. **Combine with modifiers**: Leverage `hover:`, `lg:`, etc. with arbitrary
   values
3. **Type hint CSS variables**: Always specify data types for CSS variables in
   arbitrary values
4. **Handle whitespace properly**: Use underscores for spaces in values
5. **Keep design tokens in theme**: Use `@theme` for reusable values, arbitrary
   for one-offs

### ❌ Don'ts

1. **Don't overuse arbitrary properties**: Prefer extending the theme when
   possible
2. **Don't ignore type safety**: Always use type hints with CSS variables
3. **Don't forget responsive design**: Combine arbitrary values with responsive
   modifiers
4. **Don't create maintainability debt**: Document complex arbitrary variants

### Code Organization Example

```html
<!-- ✅ Good: Clear intent, proper type hinting -->
<div
  class="
  bg-[color:--brand-primary] 
  text-[length:--font-size-heading] 
  lg:[--spacing:2rem] 
  hover:[transform:scale(1.05)]
"
>
  Content
</div>

<!-- ❌ Poor: Ambiguous, no type hints -->
<div
  class="
  bg-[--brand-primary] 
  text-[--font-size-heading] 
  [--spacing:2rem] 
  hover:[transform:scale(1.05)]
"
>
  Content
</div>
```

---

## Summary

Tailwind's escape hatches provide incredible flexibility while maintaining the
utility-first philosophy:

### Key Features

| Feature                  | Use Case               | Example                               |
| ------------------------ | ---------------------- | ------------------------------------- |
| **Arbitrary Values**     | One-off measurements   | `top-[117px]`                         |
| **Arbitrary Properties** | Missing CSS properties | `[mask-type:luminance]`               |
| **Arbitrary Variants**   | Complex selectors      | `[&:nth-child(-n+3)]:hover:underline` |
| **Type Hinting**         | CSS variable clarity   | `text-[color:--my-var]`               |
| **Responsive Variables** | Dynamic CSS variables  | `[--offset:56px] lg:[--offset:44px]`  |

### Philosophy

These features eliminate the need for many small CSS classes while keeping
styling decisions in the markup. They provide the flexibility to handle any CSS
requirement without abandoning the utility-first approach.

**Remember**: These are powerful tools for specific situations. The goal is to
solve problems elegantly while maintaining code clarity and maintainability.
