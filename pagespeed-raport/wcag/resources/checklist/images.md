# Images

| Topic                                                                   | Technique | WCAG AA Requirement |
| ----------------------------------------------------------------------- | --------- | ------------------- |
| Informative Images and Active Images (e.g. Links, Buttons, or Controls) |

[Alternative Text:](https://dequeuniversity.com/class/images2/alt-text/) The
image MUST have alternative text. Refer to the techniques for various image
types:

- [images using <img>](https://dequeuniversity.com/class/images2/alt-text/informative)
- [active images](https://dequeuniversity.com/class/images2/alt-text/actionable-links-buttons)
- [form input images](https://dequeuniversity.com/class/images2/alt-text/form-inputs)
- [SVG using <img>](https://dequeuniversity.com/class/images2/svg/svg-img)
- [SVG using <svg>](https://dequeuniversity.com/class/images2/svg/svg-inline)
- [HTML5 canvas](https://dequeuniversity.com/class/images2/canvas/alt)
- [icon fonts](https://dequeuniversity.com/class/images2/icon-font/informative-icon-fonts)

[Testing methodology 1.1.1.b](https://dequeuniversity.com/class/dequeway/interpreting/wcag/a/1.1.1/1.1.1.b)

| Required  
[WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | |

[Meaningful Description:](https://dequeuniversity.com/class/images2/alt-text/informative#descriptive-text)
Alternative text MUST be meaningful (accurately conveying the purpose of the
image, and the author's intent in a way that is useful to those who cannot see
the image).

- **Note 1:** Image links SHOULD describe the link destination.
- **Note 2:** Button/control links SHOULD describe the purpose and/or resulting
  action of the button or control.

[Testing methodology 1.1.1.b](https://dequeuniversity.com/class/dequeway/interpreting/wcag/a/1.1.1/1.1.1.b)

| Required  
[WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | |
[Concise:](https://dequeuniversity.com/class/images2/alt-text/informative#concise-text)
The length of the alternative text for informative images SHOULD be concise (no
more than about 250 characters). | Best Practice | |
[Avoid Restating that the Element Is an Image:](https://dequeuniversity.com/class/images2/alt-text/informative#words-not-to-use)
Alternative text SHOULD NOT include words that identify the element as a graphic
or image (e.g. avoid phrases like "graphic of," or "image of," etc.), because
screen readers already state the role (e.g. by saying "graphic" then reading the
alternative text). | Best Practice | | Unessential Images (Purely Decorative or
Redundant, and Not Active) |
[Unessential Images:](https://dequeuniversity.com/class/images2/alt-text/decorative-redundant)
Images that do not convey content, are decorative, or are redundant to content
that is already conveyed in text SHOULD be given null (empty) alternative text
(`alt=""`), ARIA `role="presentation"`, or implemented as CSS backgrounds. |
Best Practice | | Complex Images |

[Complex Images:](https://dequeuniversity.com/class/images2/alt-text/complex)
Complex images MUST be briefly described using `alt` text AND MUST have a more
complete extended description.

- **Note:** It is not "wrong" to provide descriptive alternative text in these
  instances, but it is highly discouraged if the image is truly unessential.

[Testing methodology 1.1.1.c](https://dequeuniversity.com/class/dequeway/interpreting/wcag/a/1.1.1/1.1.1.c)

| Required  
[WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | |
Background Images |
[Informative Background Images:](https://dequeuniversity.com/class/images2/alt-text/background#discernible-text-if-informative-actionable)
If a background image conveys information, alternative text MUST be provided
(e.g. via regular visible text, by adding `role="image"` and `aria-label`, or by
other means).

[Testing methodology 1.1.1.b](https://dequeuniversity.com/class/dequeway/interpreting/wcag/a/1.1.1/1.1.1.b)

| Required  
[WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | |
[Active Background Images:](https://dequeuniversity.com/class/images2/alt-text/background#discernible-text-if-informative-actionable)
If a background image is the only "content" in an active element (e.g. a link,
button, or control), the active element MUST have an accessible name (e.g. via
`aria-label` or similar).

[Testing methodology 1.1.1.a](https://dequeuniversity.com/class/dequeway/interpreting/wcag/a/1.1.1/1.1.1.a)

| Required  
[WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | |
[Color Contrast of Small Text:](https://dequeuniversity.com/class/visual-design-wcag-2.2/contrast/text-against-background#contrast-text-background-small-minimum)
Small text (under 18 point regular font or 14 point bold font) MUST have a
contrast ratio of at least 4.5 to 1 with the background.

[Testing methodology 1.4.3.a](https://dequeuniversity.com/class/dequeway/interpreting/wcag/aa/1.4.3/1.4.3.a)

| Required  
[WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | |
[Color Contrast of Large Text:](https://dequeuniversity.com/class/visual-design-wcag-2.2/contrast/text-against-background#visual-design-contrast-text-background-large)
Large text (at or over 18 point or 14 point bold) MUST have a contrast ratio of
at least 3 to 1 with the background.

[Testing methodology 1.4.3.b](https://dequeuniversity.com/class/dequeway/interpreting/wcag/aa/1.4.3/1.4.3.b)

| Required  
[WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | |
[Unessential Background Images:](https://dequeuniversity.com/class/images2/alt-text/background#no-text-if-decorative-redundant)
Alternative text SHOULD NOT be provided for unessential background images. |
Best Practice | | Images of Text |
[No Images of Text:](https://dequeuniversity.com/class/images2/alt-text/images-of-text#none-unless-essential-or-customizable)
An image MUST NOT include informative text if an equivalent visual presentation
of the text can be rendered using real text (unless the text is essential — such
as a logo — or the font, size, color, and background are customizable.).

[Testing methodology 1.4.5.a](https://dequeuniversity.com/class/dequeway/interpreting/wcag/aa/1.4.5/1.4.5.a)

| Required  
[WCAG 1.4.5](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text) | |
[Color Contrast of Small Text:](https://dequeuniversity.com/class/visual-design2/contrast/text-against-background#small)
Small text (under 18 point regular font or 14 point bold font) MUST have a
contrast ratio of at least 4.5 to 1 with the background.

[Testing methodology 1.4.3.a](https://dequeuniversity.com/class/dequeway/interpreting/wcag/aa/1.4.3/1.4.3.a)

| Required  
[WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | |
[Color Contrast of Large Text:](https://dequeuniversity.com/class/visual-design2/contrast/text-against-background#large)
Large text (at or over 18 point or 14 point bold) MUST have a contrast ratio of
at least 3 to 1 with the background.

[Testing methodology 1.4.3.b](https://dequeuniversity.com/class/dequeway/interpreting/wcag/aa/1.4.3/1.4.3.b)

| Required  
[WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | |
Animated Images | See the requirements for
[Animation, Motion, and Timed Content](https://dequeuniversity.com/checklists/web/animation-motion-timed).
| Required  
Multiple | | Image CAPTCHA |
[Alternative text](https://dequeuniversity.com/class/images2/alt-text/): Image
CAPTCHA elements MUST have alternative text describing the purpose of the image.

[Testing methodology 1.1.1.g](https://dequeuniversity.com/class/dequeway/interpreting/wcag/a/1.1.1/1.1.1.g)

| Required  
[WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | |
**Sensory Alternatives:** Image CAPTCHA elements MUST be supplemented with at
least one auditory alternative method.

[Testing methodology 1.1.1.g](https://dequeuniversity.com/class/dequeway/interpreting/wcag/a/1.1.1/1.1.1.g)

| Required  
[WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | |

**Deafblind Access:** At least one text-based alternative SHOULD be provided
that allows users who are both deaf and blind to pass the CAPTCHA.

- **Note:** Deafblind users typically use screen readers to convert text to
  braille, using a refreshable braille device.

| Best Practice |
