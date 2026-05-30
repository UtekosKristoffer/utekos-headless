---
description: 
alwaysApply: false
---

# BRAND GUIDELINES: Short but important version

## **Tone of voice:**:

- Confident, but relaxed
- Low saturationand soft, high brightness profile to hit “uncompromising comfort and peace".

## CODE & PROJECT GUIDELINES

### **MAXIMUM READABILITY:**

To increase the chances of the customer believing the message, you must maximize the contrast between text and
background.

- Color choices affect accessibility, audience engagement, and brand recognition.
- Testing color distribution across headlines, CTAs, and accents ensures both beauty and performance.

## COLORS (Short excerpt)

### Backgrounds

```css
--maritime-darkest: oklch(0.1996 0.0201 279.96);
--havdyp: oklch(0.2884 0.0366 279.42);
--cloud-dancer: oklch(0.9493 0.007 88.64);
--color-mountain-view: oklch(0.3424 0.0298 148.54);
--demitasse: oklch(0.3328 0.0233 53.3);
```

### BODY & HEADING TEXT COLORS

```css
--cloud-dancer: oklch(0.9493 0.007 88.64);
--maritime-darkest: oklch(0.1996 0.0201 279.96);
```

**Avoid using a percentage of the current color** **Rather:** Se [agents-workplace-folder](.agents/css/) for
official PANTONE contrast, lightness, shades, complementary colors, monochromic and analogous colors:

- [Cloud Dancer](.agents/css/cloud-dancer.css)
- [Ancient Water](.agents/css/ancient-water.css)
- [Dazzling Blue](.agents/css/dazzling-blue.css)
- [Demitasse](.agents/css/demitasse.css)
- [Dusky Orchid](.agents/css/dusky-orchid.css)
- [Dusted Peri](.agents/css/dusted-peri.css)
- [Ganache](.agents/css/ganache.css)
- [Kombu Green](.agents/css/kombu-green.css)
- [Magical Forest](.agents/css/magical-forest.css)
- [Maritime Blue](.agents/css/maritime-blue.css)
- [Mountain View](.agents/css/mountain-view.css)
- [Overcast](.agents/css/overcast.css)
- [Peppermint](.agents/css/peppermint.css)
- [Trash](.agents/css/trash.css)
- [Veiled Vista](.agents/css/veiled-vista.css)
- [Withered Rose](.agents/css/withered-rose.css)

## BADGE COLORS & COMBINATIONS:

### COMBINATION 1

**BACKGROUND:**

```css
--dusted-peri: oklch(0.5433 0.105 281.67);
```

**TEXT:**

```css
--dusted-peri: oklch(0.5433 0.105 281.67);
--havdyp: oklch(0.2884 0.0366 279.42);
```

## COMBINATION 2

**BACKGROUND:**

```css
--havdyp: oklch(0.2884 0.0366 279.42);
```

**TEXT:**

```css
--dusted-peri: oklch(0.5433 0.105 281.67);
--havdyp: oklch(0.2884 0.0366 279.42);
```

#### MAIN TEXT COLORS

This project use --cloud-dancer`and`--maritime-darkest` as its primary text colors.

#### CHOOSING TEXT COLOR

The background color determines the text color; use the one that provides the best contrast.

- Choose background color carefully.
- Vary wisely and logically.
- Always get an overview of which colors are used in surrounding actions and components.
- Always write solutions based on how the end user will see the page, section and area your working on.
- Typical patterns are every other section with every other color.
- Always provide maximum cognitive ease for our users.
- Make sure to implement a visual satisfing UI; tidy, air/room, clear and with color harmony

## TYPOGRAHY

### TEXT SIZE: `font-size`

```css
@theme {
  /* Fluid typography scale (Automatically responsive from mobile to desktop) */
  --font-size-1: clamp(2.25rem, 1.385rem + 3.46vw, 4.5rem); /* Big and bold headlines */
  --font-size-2: clamp(1.75rem, 1.365rem + 1.54vw, 2.75rem); /* Main Headlines (H1 & H2)  */
  --font-size-3: clamp(1.25rem, 1.106rem + 0.58vw, 1.625rem); /* Subtitles & Card/Dialog Titles  */
  --font-size-4: clamp(1rem, 0.9375rem + 0.25vw, 1.125rem); /* Standard Body Copy & Paragraphs  */
  --font-size-5: clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem); /* Micro-copy, Badges, Buttons, Footers */
}
```

### LETTER SPACING: `tracking` `tracking`

```css
@theme {
  /* The scale runs from extremely tight (headlines) to readable (body copy) */
  --leading-1: 0.8; /* Tightest limit for massive headlines (80%) */
  --leading-2: 0.95; /* Standard heading tight limit (95%) */
  --leading-3: 1.1; /* Transitional limit (helpful for multiline headers or special characters) */
  --leading-4: 1.4; /* Standard for body copy and buttons (140%) */
  --leading-5: 1.5; /* Maximum comfortable limit for long-form reading (150%) */
}
```

### LINE HEIGHT: `tracking`

```css
@theme {
  /* The scale now runs strictly from neutral to compact */
  --tracking-1: -0.03em; /* Max tight limit for body copy/buttons (-3%) */
  --tracking-2: -0.02em; /* Medium-snug body copy (-2%) */
  --tracking-3: -0.015em; /* Light-snug body copy (-1.5%) */
  --tracking-4: -0.01em; /* Max tight limit for headlines (-1%) */
  --tracking-5: 0em; /* Completely neutral/standard default */
}
```

## Motion: Slow Transitions

**USE:**

- Long, eased animation curves (like ease-in-out) for page transitions and hover effects.
- Slow fades promote relaxation.

Eliminate fast, snappy animations that creates urgency.

## WCAG AA'

Always respect and follow WCAG AA and use the MCP which is available

## Write for the reader

Express yourself in a clear, friendly and confident manner by choosing simple, professional and
solution-oriented language. Vary your vocabulary, use the correct product naming and refrain from using
company lingo.

## COGNETIVE EASE

**The basic, but mandatory and absolutely essential approach, for to ensure that cognitive ease:**

- **Maximise readability:** Clear fonts, strong contrast between text and background, and a clear structure.
- **Familiarity & Simple language:** Stay away from complex language where simple words will suffice.
- **Clarity:** Short sentences, clear headings and a use a vocabulary which the user is familiar with.
- **Always make sure to show professional language writing skills in Norwegian**
- **Create content that represents the truth, formulate it understandably and write with great fluency**
- **Positive mood:** A state of cognitive ease is more likely when when humans are in a good mood. Make sure
  to always have focus on small details that may affect users mood - both consciously and unconscious.

However, that doesn't mean it should be lazy, unengaging or

## Key Architectural Decisions

### SchadCN

Important patterns for UI Components:

- **Composition over Inheritance**: We build on existing shadcn/ui components (`Card`, `CardHeader`,
  `CardContent`) rather than creating everything from scratch. This ensures visual consistency and reduces
  code duplication.
- **Type Safety First**: The comprehensive TypeScript interfaces provide excellent developer experience with
  autocomplete, validation, and clear documentation of what props are available.
- **Theme Integration**: Using CSS custom properties and semantic color classes ensures our component works
  seamlessly with both light and dark themes.
- **Variant System**: The `class-variance-authority` pattern allows for flexible styling while maintaining
  consistency with other shadcn/ui components.
- **Accessibility by Default**: Proper semantic HTML structure, ARIA labels, and keyboard navigation support
  ensure the component works for all users.

#### Performance Optimization

For complex compound components, split contexts to prevent unnecessary re-renders. This is a performance
optimization technique that is often used in compound components.

```tsx
// Split contexts to prevent unnecessary re-renders
const CardStateContext = createContext<{
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}>({} as any)

const CardConfigContext = createContext<{
  variant: string
  size: string
  isCollapsible: boolean
  isExpandable: boolean
  isDismissible: boolean
}>({} as any)

// Optimized root component
function OptimizedCardRoot({ children, ...props }: CardRootProps) {
  const [isCollapsed, setIsCollapsed] = useState(props.defaultCollapsed || false)
  const [isExpanded, setIsExpanded] = useState(props.defaultExpanded || false)

  /* Memoized context values to prevent child re-renders */
  const stateValue = useMemo(
    () => ({
      isCollapsed,
      setIsCollapsed,
      isExpanded,
      setIsExpanded
    }),
    [isCollapsed, isExpanded]
  )

  const configValue = useMemo(
    () => ({
      variant: props.variant || 'default',
      size: props.size || 'default'
      /* ... rest of config values ... */
    }),
    [
      /* dependency array */
    ]
  )

  return (
    <CardConfigContext.Provider value={configValue}>
      <CardStateContext.Provider value={stateValue}>{children}</CardStateContext.Provider>
    </CardConfigContext.Provider>
  )
}
```

#### TypeScript Best Practices

Ensure your compound components are fully type-safe:

```tsx
// Type-safe compound component interface
interface CardComponent {
  Root: React.ComponentType<CardRootProps>
  Header: React.ComponentType<CardHeaderProps>
  /* ... rest of component type definitions ... */
}

// Ensure compound component has correct typing
export const Card: CardComponent = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
  Status: CardStatus
} as const

// Helper types for extracting props
type CardRootPropsType = React.ComponentProps<typeof Card.Root>
type CardHeaderPropsType = React.ComponentProps<typeof Card.Header>
```
