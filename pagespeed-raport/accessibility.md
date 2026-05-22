# Accessibility

Score: 89

These checks highlight opportunities to
[improve the accessibility of your web app](https://developer.chrome.com/docs/lighthouse/accessibility/?utm_source=lighthouse&utm_medium=lr).
Automatic detection can only detect a subset of issues and does not guarantee
the accessibility of your web app, so
[manual testing](https://web.dev/articles/how-to-review?utm_source=lighthouse&utm_medium=lr)
is also encouraged.

## ARIA

### Elements use prohibited ARIA attributes

Using ARIA attributes in roles where they are prohibited can mean that important
information is not communicated to users of assistive technologies.
[Learn more about prohibited ARIA roles](https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr).

Failing elements:

1. 5 av 5 stjerner

   ```html
   <div
     class="relative flex items-center gap-1"
     aria-label="5 av 5 stjerner"
   ></div>
   ```

2. 5 av 5 stjerner

   ```html
   <div
     class="relative flex items-center gap-1"
     aria-label="5 av 5 stjerner"
   ></div>
   ```

3. 5 av 5 stjerner

   ```html
   <div
     class="relative flex items-center gap-1"
     aria-label="5 av 5 stjerner"
   ></div>
   ```

4. 5 av 5 stjerner

   ```html
   <div
     class="relative flex items-center gap-1"
     aria-label="5 av 5 stjerner"
   ></div>
   ```

5. 4.5 av 5 stjerner

   ```html
   <div
     class="relative flex items-center gap-1"
     aria-label="4.5 av 5 stjerner"
   ></div>
   ```

6. 5 av 5 stjerner

   ```html
   <div
     class="relative flex items-center gap-1"
     aria-label="5 av 5 stjerner"
   ></div>
   ```

These are opportunities to improve the usage of ARIA in your application which
may enhance the experience for users of assistive technology, such as a screen
reader.

## Contrast

### Background and foreground colours do not have a sufficient contrast ratio

Low-contrast text is difficult or impossible for many users to read.
[Learn how to provide sufficient colour contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast).

Failing elements:

1. Isolasjon som absorberer og resirkulerer kroppsvarme.

   ```html
   <span
     class="block text-sm text-neutral-500 group-hover:text-neutral-400 transition-col…"
   ></span>
   ```

2. INNOVASJON & MATERIALER Vitenskapen bak din komfort. Det handler ikke bare om
   …

   ```html
   <div
     class="relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-950 …"
   ></div>
   ```

3. Pustende membran med 8000mm vannsøyle.

   ```html
   <span
     class="block text-sm text-neutral-500 group-hover:text-neutral-400 transition-col…"
   ></span>
   ```

4. INNOVASJON & MATERIALER Vitenskapen bak din komfort. Det handler ikke bare om
   …

   ```html
   <div
     class="relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-950 …"
   ></div>
   ```

5. Fra isolerende kokong til bevegelig parkas på sekunder.

   ```html
   <span
     class="block text-sm text-neutral-500 group-hover:text-neutral-400 transition-col…"
   ></span>
   ```

6. INNOVASJON & MATERIALER Vitenskapen bak din komfort. Det handler ikke bare om
   …

   ```html
   <div
     class="relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-950 …"
   ></div>
   ```

7. Godta alle

   ```html
   <button
     data-slot="button"
     class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md…"
   ></button>
   ```

These are opportunities to improve the legibility of your content.

## Tables and Lists

### Lists do not contain only `<li>` elements and script supporting elements (`<script>` and `<template>`)

Screen readers have a specific way of announcing lists. Ensuring proper list
structure aids screen reader output.
[Learn more about proper list structure](https://dequeuniversity.com/rules/axe/4.11/list).

Failing elements:

1. Kundeservice Tlf: +47 40 21 63 43 E-post: kundeservice@utekos.no
   Innstillinger …

   ```html
   <ul class="space-y-2"></ul>
   ```

2. Innstillinger for informasjonskapsler

   ```html
   <button
     data-slot="dialog-trigger"
     class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md…"
     type="button"
     aria-haspopup="dialog"
     aria-expanded="false"
     aria-controls="radix-_r_0_"
     data-state="closed"
   ></button>
   ```

These are opportunities to improve the experience of reading tabular or list
data using assistive technology, like a screen reader.

## Best Practices

### All heading elements contain content

A heading with no content or inaccessible text prevents screen reader users from
accessing information on the page's structure.
[Learn more about headings](https://dequeuniversity.com/rules/axe/4.11/empty-heading).
Unscored

Failing elements:

1. ```html
   <h2
     class="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight"
   ></h2>
   ```

2. div.grid > div.flex > div > h2.text-3xl

   ```html
   <h2 class="text-3xl font-bold tracking-tight text-foreground"></h2>
   ```

### Identical links have the same purpose

Links with the same destination should have the same description, to help users
understand the link's purpose and decide whether to follow it.
[Learn more about identical links](https://dequeuniversity.com/rules/axe/4.11/identical-links-same-purpose).
Unscored

Failing elements:

1. Se produkt

   ```html
   <a
     data-track="ProductCardFooterViewMoreClick"
     aria-label="Se produkt"
     class="flex-1"
     href="/produkter/utekos-dun?variant=gid%3A%2F%2Fshopify%2FProductVariant%2F42903…"
   ></a>
   ```

2. Se produkt

   ```html
   <a
     data-track="ProductCardFooterViewMoreClick"
     aria-label="Se produkt"
     class="flex-1"
     href="/produkter/utekos-mikrofiber?variant=gid%3A%2F%2Fshopify%2FProductVariant%…"
   ></a>
   ```

3. Se produkt

   ```html
   <a
     data-track="ProductCardFooterViewMoreClick"
     aria-label="Se produkt"
     class="flex-1"
     href="/produkter/comfyrobe?variant=gid%3A%2F%2Fshopify%2FProductVariant%2F439599…"
   ></a>
   ```

4. Se produkt

   ```html
   <a
     data-track="ProductCardFooterViewMoreClick"
     aria-label="Se produkt"
     class="flex-1"
     href="/produkter/utekos-techdown?variant=gid%3A%2F%2Fshopify%2FProductVariant%2F…"
   ></a>
   ```

These items highlight common accessibility best practices.

## Additional Items to Manually Check (10)

Show Hide

1. Interactive controls are keyboard focusable

   Custom interactive controls are keyboard focusable and display a focus
   indicator.
   [Learn how to make custom controls focusable](https://developer.chrome.com/docs/lighthouse/accessibility/focusable-controls/?utm_source=lighthouse&utm_medium=lr).
   Unscored

2. Interactive elements indicate their purpose and state

   Interactive elements, such as links and buttons, should indicate their state
   and be distinguishable from non-interactive elements.
   [Learn how to decorate interactive elements with affordance hints](https://developer.chrome.com/docs/lighthouse/accessibility/interactive-element-affordance/?utm_source=lighthouse&utm_medium=lr).
   Unscored

3. The page has a logical tab order

   Tabbing through the page follows the visual layout. Users cannot focus
   elements that are offscreen.
   [Learn more about logical tab ordering](https://developer.chrome.com/docs/lighthouse/accessibility/logical-tab-order/?utm_source=lighthouse&utm_medium=lr).
   Unscored

4. Visual order on the page follows DOM order

   DOM order matches the visual order, improving navigation for assistive
   technology.
   [Learn more about DOM and visual ordering](https://developer.chrome.com/docs/lighthouse/accessibility/visual-order-follows-dom/?utm_source=lighthouse&utm_medium=lr).
   Unscored

5. User focus is not accidentally trapped in a region

   A user can tab into and out of any control or region without accidentally
   trapping their focus.
   [Learn how to avoid focus traps](https://developer.chrome.com/docs/lighthouse/accessibility/focus-traps/?utm_source=lighthouse&utm_medium=lr).
   Unscored

6. The user's focus is directed to new content added to the page

   If new content, such as a dialog, is added to the page, the user's focus is
   directed to it.
   [Learn how to direct focus to new content](https://developer.chrome.com/docs/lighthouse/accessibility/managed-focus/?utm_source=lighthouse&utm_medium=lr).
   Unscored

7. HTML5 landmark elements are used to improve navigation

   Landmark elements (`<main>`, `<nav>`, etc.) are used to improve the keyboard
   navigation of the page for assistive technology.
   [Learn more about landmark elements](https://developer.chrome.com/docs/lighthouse/accessibility/use-landmarks/?utm_source=lighthouse&utm_medium=lr).
   Unscored

8. Offscreen content is hidden from assistive technology

   Offscreen content is hidden with display: none or aria-hidden=true.
   [Learn how to properly hide offscreen content](https://developer.chrome.com/docs/lighthouse/accessibility/offscreen-content-hidden/?utm_source=lighthouse&utm_medium=lr).
   Unscored

9. Custom controls have associated labels

   Custom interactive controls have associated labels, provided by aria-label or
   aria-labelledby.
   [Learn more about custom controls and labels](https://developer.chrome.com/docs/lighthouse/accessibility/custom-controls-labels/?utm_source=lighthouse&utm_medium=lr).
   Unscored

10. Custom controls have ARIA roles

    Custom interactive controls have appropriate ARIA roles.
    [Learn how to add roles to custom controls](https://developer.chrome.com/docs/lighthouse/accessibility/custom-control-roles/?utm_source=lighthouse&utm_medium=lr).
    Unscored

These items address areas which an automated testing tool cannot cover. Learn
more in our guide on
[conducting an accessibility review](https://web.dev/articles/how-to-review?utm_source=lighthouse&utm_medium=lr).

## Passed Audits (22)

Show Hide

### `[aria-*]` attributes match their roles

Each ARIA `role` supports a specific subset of `aria-*` attributes. Mismatching
these invalidates the `aria-*` attributes.
[Learn how to match ARIA attributes to their roles](https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr).

### `[aria-hidden="true"]` is not present on the document `<body>`

Assistive technologies, like screen readers, work inconsistently when
`aria-hidden="true"` is set on the document `<body>`.
[Learn how `aria-hidden` affects the document body](https://dequeuniversity.com/rules/axe/4.11/aria-hidden-body).

### `[role]`s have all required `[aria-*]` attributes

Some ARIA roles have required attributes that describe the state of the element
to screen readers.
[Learn more about roles and required attributes](https://dequeuniversity.com/rules/axe/4.11/aria-required-attr).

`[role]` values are valid

ARIA roles must have valid values in order to perform their intended
accessibility functions.
[Learn more about valid ARIA roles](https://dequeuniversity.com/rules/axe/4.11/aria-roles).

`[aria-*]` attributes have valid values

Assistive technologies, such as screen readers, can't interpret ARIA attributes
with invalid values.
[Learn more about valid values for ARIA attributes](https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value).

`[aria-*]` attributes are valid and not misspelled

Assistive technologies, such as screen readers, can't interpret ARIA attributes
with invalid names.
[Learn more about valid ARIA attributes](https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr).

Buttons have an accessible name

When a button doesn't have an accessible name, screen readers announce it as
'button', making it unusable for users who rely on screen readers.
[Learn how to make buttons more accessible](https://dequeuniversity.com/rules/axe/4.11/button-name).

Image elements have `[alt]` attributes

Informative elements should aim for short, descriptive alternative text.
Decorative elements can be ignored with an empty alt attribute.
[Learn more about the `alt` attribute](https://dequeuniversity.com/rules/axe/4.11/image-alt).

Form elements have associated labels

Labels ensure that form controls are announced properly by assistive
technologies, such as screen readers.
[Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label).

`[user-scalable="no"]` is not used in the `<meta name="viewport">` element and
the `[maximum-scale]` attribute is not less than 5.

Disabling zooming is problematic for users with low vision who rely on screen
magnification to properly see the contents of a web page.
[Learn more about the viewport meta tag](https://dequeuniversity.com/rules/axe/4.11/meta-viewport).

ARIA attributes are used as specified for the element's role

Some ARIA attributes are only allowed on an element under certain conditions.
[Learn more about conditional ARIA attributes](https://dequeuniversity.com/rules/axe/4.11/aria-conditional-attr).

`[aria-hidden="true"]` elements do not contain focusable descendents

Focusable descendants within an `[aria-hidden="true"]` element prevent those
interactive elements from being available to users of assistive technologies
like screen readers.
[Learn how `aria-hidden` affects focusable elements](https://dequeuniversity.com/rules/axe/4.11/aria-hidden-focus).

Document has a `<title>` element

The title gives screen reader users an overview of the page, and search engine
users rely on it heavily to determine if a page is relevant to their search.
[Learn more about document titles](https://dequeuniversity.com/rules/axe/4.11/document-title).

`<html>` element has a `[lang]` attribute

If a page doesn't specify a `lang` attribute, a screen reader assumes that the
page is in the default language that the user chose when setting up the screen
reader. If the page isn't actually in the default language, then the screen
reader might not announce the page's text correctly.
[Learn more about the `lang` attribute](https://dequeuniversity.com/rules/axe/4.11/html-has-lang).

`<html>` element has a valid value for its `[lang]` attribute

Specifying a valid
[BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question)
helps screen readers announce text properly.
[Learn how to use the `lang` attribute](https://dequeuniversity.com/rules/axe/4.11/html-lang-valid).

Links are distinguishable without relying on colour.

Low-contrast text is difficult or impossible for many users to read. Link text
that is discernible improves the experience for users with low vision.
[Learn how to make links distinguishable](https://dequeuniversity.com/rules/axe/4.11/link-in-text-block).

Links have a discernible name

Link text (and alternative text for images, when used as links) that is
discernible, unique and focusable improves the navigation experience for screen
reader users.
[Learn how to make links accessible](https://dequeuniversity.com/rules/axe/4.11/link-name).

List items (`<li>`) are contained within `<ul>`, `<ol>` or `<menu>` parent
elements

Screen readers require list items (`<li>`) to be contained within a parent
`<ul>`, `<ol>` or `<menu>` to be announced properly.
[Learn more about proper list structure](https://dequeuniversity.com/rules/axe/4.11/listitem).

Touch targets have sufficient size and spacing.

Touch targets with sufficient size and spacing help users who may have
difficulty targeting small controls to activate the targets.
[Learn more about touch targets](https://dequeuniversity.com/rules/axe/4.11/target-size).

Heading elements appear in a sequentially-descending order

Properly ordered headings that do not skip levels convey the semantic structure
of the page, making it easier to navigate and understand when using assistive
technologies.
[Learn more about heading order](https://dequeuniversity.com/rules/axe/4.11/heading-order).

Document has a main landmark.

One main landmark helps screen reader users navigate a web page.
[Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main).

Deprecated ARIA roles were not used

Deprecated ARIA roles may not be processed correctly by assistive technology.
[Learn more about deprecated ARIA roles](https://dequeuniversity.com/rules/axe/4.11/aria-deprecated-role).

Not applicable (33)

Show Hide

`[accesskey]` values are unique

Access keys let users quickly focus a part of the page. For proper navigation,
each access key must be unique.
[Learn more about access keys](https://dequeuniversity.com/rules/axe/4.11/accesskeys).Unscored

`button`, `link` and `menuitem` elements have accessible names

When an element doesn't have an accessible name, screen readers announce it with
a generic name, making it unusable for users who rely on screen readers.
[Learn how to make command elements more accessible](https://dequeuniversity.com/rules/axe/4.11/aria-command-name).Unscored

Elements with `role="dialog"` or `role="alertdialog"` have accessible names.

ARIA dialogue elements without accessible names may prevent screen reader users
from discerning the purpose of these elements.
[Learn how to make ARIA dialog elements more accessible](https://dequeuniversity.com/rules/axe/4.11/aria-dialog-name).Unscored

ARIA input fields have accessible names

When an input field doesn't have an accessible name, screen readers announce it
with a generic name, making it unusable for users who rely on screen readers.
[Learn more about input field labels](https://dequeuniversity.com/rules/axe/4.11/aria-input-field-name).Unscored

ARIA `meter` elements have accessible names

When a meter element doesn't have an accessible name, screen readers announce it
with a generic name, making it unusable for users who rely on screen readers.
[Learn how to name `meter` elements](https://dequeuniversity.com/rules/axe/4.11/aria-meter-name).Unscored

ARIA `progressbar` elements have accessible names

When a `progressbar` element doesn't have an accessible name, screen readers
announce it with a generic name, making it unusable for users who rely on screen
readers.
[Learn how to label `progressbar` elements](https://dequeuniversity.com/rules/axe/4.11/aria-progressbar-name).Unscored

Elements with an ARIA `[role]` that require children to contain a specific
`[role]` have all required children.

Some ARIA parent roles must contain specific child roles to perform their
intended accessibility functions.
[Learn more about roles and required children elements](https://dequeuniversity.com/rules/axe/4.11/aria-required-children).Unscored

`[role]`s are contained by their required parent element

Some ARIA child roles must be contained by specific parent roles to properly
perform their intended accessibility functions.
[Learn more about ARIA roles and required parent element](https://dequeuniversity.com/rules/axe/4.11/aria-required-parent).Unscored

Elements with the `role=text` attribute do not have focusable descendents.

Adding `role=text` around a text node split by markup enables VoiceOver to treat
it as one phrase, but the element's focusable descendents will not be announced.
[Learn more about the `role=text` attribute](https://dequeuniversity.com/rules/axe/4.11/aria-text).Unscored

ARIA toggle fields have accessible names

When a toggle field doesn't have an accessible name, screen readers announce it
with a generic name, making it unusable for users who rely on screen readers.
[Learn more about toggle fields](https://dequeuniversity.com/rules/axe/4.11/aria-toggle-field-name).Unscored

ARIA `tooltip` elements have accessible names

When a tooltip element doesn't have an accessible name, screen readers announce
it with a generic name, making it unusable for users who rely on screen readers.
[Learn how to name `tooltip` elements](https://dequeuniversity.com/rules/axe/4.11/aria-tooltip-name).Unscored

ARIA `treeitem` elements have accessible names

When a `treeitem` element doesn't have an accessible name, screen readers
announce it with a generic name, making it unusable for users who rely on screen
readers.
[Learn more about labelling `treeitem` elements](https://dequeuniversity.com/rules/axe/4.11/aria-treeitem-name).Unscored

The page contains a heading, skip link or landmark region

Adding ways to bypass repetitive content lets keyboard users navigate the page
more efficiently.
[Learn more about bypass blocks](https://dequeuniversity.com/rules/axe/4.11/bypass).Unscored

`<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`,
`<template>` or `<div>` elements.

When definition lists are not properly marked up, screen readers may produce
confusing or inaccurate output.
[Learn how to structure definition lists correctly](https://dequeuniversity.com/rules/axe/4.11/definition-list).Unscored

Definition list items are wrapped in `<dl>` elements

Definition list items (`<dt>` and `<dd>`) must be wrapped in a parent `<dl>`
element to ensure that screen readers can properly announce them.
[Learn how to structure definition lists correctly](https://dequeuniversity.com/rules/axe/4.11/dlitem).Unscored

ARIA IDs are unique

The value of an ARIA ID must be unique to prevent other instances from being
overlooked by assistive technologies.
[Learn how to fix duplicate ARIA IDs](https://dequeuniversity.com/rules/axe/4.11/duplicate-id-aria).Unscored

No form fields have multiple labels

Form fields with multiple labels can be confusingly announced by assistive
technologies, like screen readers, which use either the first, the last or all
of the labels.
[Learn how to use form labels](https://dequeuniversity.com/rules/axe/4.11/form-field-multiple-labels).Unscored

`<frame>` or `<iframe>` elements have a title

Screen reader users rely on frame titles to describe the contents of frames.
[Learn more about frame titles](https://dequeuniversity.com/rules/axe/4.11/frame-title).Unscored

`<html>` element has an `[xml:lang]` attribute with the same base language as
the `[lang]` attribute.

If the webpage does not specify a consistent language, then the screen reader
might not announce the page's text correctly.
[Learn more about the `lang` attribute](https://dequeuniversity.com/rules/axe/4.11/html-xml-lang-mismatch).Unscored

Input buttons have discernible text.

Adding discernable and accessible text to input buttons may help screen reader
users to understand the purpose of the input button.
[Learn more about input buttons](https://dequeuniversity.com/rules/axe/4.11/input-button-name).Unscored

`<input type="image">` elements have `[alt]` text

When an image is being used as an `<input>` button, providing alternative text
can help screen reader users understand the purpose of the button.
[Learn about input image alt text](https://dequeuniversity.com/rules/axe/4.11/input-image-alt).Unscored

The document does not use `<meta http-equiv="refresh">`

Users do not expect a page to refresh automatically and doing so will move focus
back to the top of the page. This may create a frustrating or confusing
experience.
[Learn more about the refresh meta tag](https://dequeuniversity.com/rules/axe/4.11/meta-refresh).Unscored

`<object>` elements have alternative text

Screen readers cannot translate non-text content. Adding alternative text to
`<object>` elements helps screen readers convey meaning to users.
[Learn more about alt text for `object` elements](https://dequeuniversity.com/rules/axe/4.11/object-alt).Unscored

Select elements have associated label elements.

Form elements without effective labels can create frustrating experiences for
screen reader users.
[Learn more about the `select` element](https://dequeuniversity.com/rules/axe/4.11/select-name).Unscored

Skip links are focusable.

Including a skip link can help users skip to the main content to save time.
[Learn more about skip links](https://dequeuniversity.com/rules/axe/4.11/skip-link).Unscored

No element has a `[tabindex]` value greater than 0

A value greater than 0 implies an explicit navigation ordering. Although
technically valid, this often creates frustrating experiences for users who rely
on assistive technologies.
[Learn more about the `tabindex` attribute](https://dequeuniversity.com/rules/axe/4.11/tabindex).Unscored

Cells in a `<table>` element that use the `[headers]` attribute refer to table
cells within the same table.

Screen readers have features to make navigating tables easier. Ensuring
that`<td>` cells using the `[headers]` attribute only refer to other cells in
the same table may improve the experience for screen reader users.
[Learn more about the `headers` attribute](https://dequeuniversity.com/rules/axe/4.11/td-headers-attr).Unscored

`<th>` elements and elements with `[role="columnheader"/"rowheader"]` have data
cells they describe.

Screen readers have features to make navigating tables easier. Ensuring that
table headers always refer to some set of cells may improve the experience for
screen reader users.
[Learn more about table headers](https://dequeuniversity.com/rules/axe/4.11/th-has-data-cells).Unscored

`[lang]` attributes have a valid value

Specifying a valid
[BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question)
on elements helps ensure that text is pronounced correctly by a screen reader.
[Learn how to use the `lang` attribute](https://dequeuniversity.com/rules/axe/4.11/valid-lang).Unscored

`<video>` elements contain a `<track>` element with `[kind="captions"]`

When a video provides a caption it is easier for deaf and hearing-impaired users
to access its information.
[Learn more about video captions](https://dequeuniversity.com/rules/axe/4.11/video-caption).Unscored

Tables have different content in the summary attribute and `<caption>`.

The summary attribute should describe the table structure, while `<caption>`
should have the onscreen title. Accurate table mark-up helps users of screen
readers.
[Learn more about summary and caption](https://dequeuniversity.com/rules/axe/4.11/table-duplicate-name).Unscored

Uses ARIA roles only on compatible elements

Many HTML elements can only be assigned certain ARIA roles. Using ARIA roles
where they are not allowed can interfere with the accessibility of the web page.
[Learn more about ARIA roles](https://dequeuniversity.com/rules/axe/4.11/aria-allowed-role).Unscored

Image elements do not have `[alt]` attributes that are redundant text.

Informative elements should aim for short, descriptive alternative text.
Alternative text that is exactly the same as the text adjacent to the link or
image is potentially confusing for screen reader users, because the text will be
read twice.
[Learn more about the `alt` attribute](https://dequeuniversity.com/rules/axe/4.11/image-redundant-alt).Unscored
