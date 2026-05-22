# Other Semantic Elements

This document summarizes semantic HTML guidance and related checklist items for
structure, text semantics, and document meaning.

| Topic                             | Technique                                                                                                                                                                                                                                                                            | Requirement Level | WCAG Criterion |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | -------------- |
| Headings                          | See the requirements for [Headings](https://dequeuniversity.com/checklists/web/headings).                                                                                                                                                                                            | Required          | Multiple       |
| Landmarks                         | See the requirements for [Landmarks](https://dequeuniversity.com/checklists/web/landmarks).                                                                                                                                                                                          | Required          | Multiple       |
| Lists                             | See the requirements for [Lists](https://dequeuniversity.com/checklists/web/lists).                                                                                                                                                                                                  | Required          | Multiple       |
| Tables                            | See the requirements for [Tables](https://dequeuniversity.com/checklists/web/tables).                                                                                                                                                                                                | Required          | Multiple       |
| Links                             | See the requirements for [Links](https://dequeuniversity.com/checklists/web/links).                                                                                                                                                                                                  | Required          | Multiple       |
| Emphasis and Highlighting         | [Emphasis](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/strong-em#emphasis-text): Critical emphasis in the text SHOULD be conveyed in a text-based format, not visual styling alone.                                                                 | Best Practice     | N/A            |
| Emphasis and Highlighting         | [Highlighting Markup](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/highlighting#highlighted): Highlighted text SHOULD be marked with the `<mark>` element.                                                                                           | Best Practice     | N/A            |
| Emphasis and Highlighting         | [Text-Based Highlighting](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/highlighting#critical-hl): Critical highlighted text SHOULD be supplemented with a text-based method to convey the meaning of the highlighting.                               | Best Practice     | N/A            |
| Quotations                        | [Blockquote](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/blockquote-q#blockquote): The `<blockquote>` element SHOULD be used to designate long, block-level quotations.                                                                             | Best Practice     | N/A            |
| Quotations                        | [Indentation](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/blockquote-q#visual-use): The `<blockquote>` element SHOULD NOT be used for visual styling or indentation alone.                                                                          | Best Practice     | N/A            |
| Quotations                        | [Inline Quotations](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/blockquote-q#q-usage): The `<q>` element for inline quotations SHOULD NOT be used as the only way to designate quotations, due to poor support in screen readers and some browsers. | Best Practice     | N/A            |
| Strikethrough, Delete, and Insert | [Strikethrough Markup](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/strikethrough-insert#strike-del): Strikethrough text SHOULD be marked with the `<del>` element.                                                                                  | Best Practice     | N/A            |
| Strikethrough, Delete, and Insert | [Strikethrough Supplemental Text](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/strikethrough-insert#critical-st): Critical strikethrough text MUST be supplemented with a text-based method to convey the meaning of the strikethrough.              | Best Practice     | N/A            |
| Strikethrough, Delete, and Insert | [Insert Markup](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/strikethrough-insert#ins): Text designated for insertion SHOULD be marked with the `<ins>` element.                                                                                     | Best Practice     | N/A            |
| Strikethrough, Delete, and Insert | [Insert Supplemental Text](https://dequeuniversity.com/class/semantic-structure-wcag-2.2/other-elements/strikethrough-insert#ins-critical): Critical text designated for insertion MUST be supplemented with a text-based method to convey the meaning of the insertion.             | Best Practice     | N/A            |

## General Notes About Semantic Markup

If the technology used provides semantic structure to convey relationships
between information:

- Use semantic markup to mark emphasized or special text.
- Use text to convey information that is otherwise conveyed only through visual
  presentation.
- Separate information and structure from presentation. Do not use style alone
  to convey structure.

Convey relationships between information by correctly using web page structure:

- Use semantic markup when color cues are used.
- Use real HTML list elements `ol`, `ul`, and `dl` for lists, or
  `div role='list'` and `role='listitem'` when appropriate.
- Use real HTML heading elements `h1` through `h6` to identify headings.
  Headings must be informative and clearly describe the topic that follows. Text
  size is irrelevant for headings because size and style can be handled via CSS.
- Use Document Object Model functions to add content to a page.
