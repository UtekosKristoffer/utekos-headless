---
name: markdown-perfection
description: Optimize Markdown docs, specs, prompts, and skill files for agent readability, structural consistency, and markdownlint-aligned quality. Use when reviewing, rewriting, normalizing, or lint-fixing Markdown so agents can parse it more reliably.
---

# Markdown Perfection

## Workflow

1. Audit structure before editing. Identify the document purpose, the current heading tree, broken references, inconsistent list/table usage, and whether the issue is semantic or only stylistic.
2. Fix meaning-preserving hierarchy first. Keep the author's intent, normalize heading depth, and remove structure that hides relationships between sections.
3. Prefer tables for structured parameters, option matrices, field definitions, and comparison-heavy content. Keep prose for narrative explanation, constraints, and caveats.
4. Fix links and references before polishing wording. Resolve broken relative paths, misleading labels, empty link text, and orphaned reference definitions.
5. Normalize for agent readability. Prefer explicit section titles, short paragraphs, stable terminology, consistent list markers, and predictable field naming.
6. Consult rule docs only when the issue maps to a specific markdownlint rule or formatting ambiguity. Do not load reference material preemptively.
7. Use the schema reference only when editing `markdownlint` configuration, schema-shaped settings, or rule parameter definitions.

## Default Standards

- Preserve meaning while improving structure.
- Prefer one clear heading tree over visually clever formatting.
- Prefer explicit tables over mixed bullet formatting for structured inputs.
- Prefer descriptive link labels over raw URLs unless the URL itself is the artifact.
- Prefer consistent casing, spacing, and delimiter style within the same document.
- Remove duplicated or generic filler that does not improve retrieval or understanding.
- Always use proper Markdown links with correct relative paths when referencing local files for navigation. Do not use raw filenames when the intent is to open a resource.

## Resource Map

- Open [markdownlint-rules-guide.md](references/markdownlint-rules-guide.md) first when the exact markdownlint rule is still unknown and you need the aggregate catalog.
- Open the matching rule-specific reference only after you have identified a supported markdownlint rule ID.
- Open [markdown-syntax-guide.md](references/markdown-syntax-guide.md) only for Markdown-language edge cases involving headings, tables, links, images, lists, or frontmatter-like formatting behavior.
- Open [markdownlint-config-schema-strict.json](references/markdownlint-config-schema-strict.json) only when editing schema-driven `markdownlint` configuration or validating allowed rule parameters.

### Available References

- Core references: [markdown-syntax-guide.md](references/markdown-syntax-guide.md), [markdownlint-config-schema-strict.json](references/markdownlint-config-schema-strict.json), [markdownlint-rules-guide.md](references/markdownlint-rules-guide.md)
- Rule-specific references: [md001.md](references/md001.md), [md004.md](references/md004.md), [md005.md](references/md005.md), [md012.md](references/md012.md), [md022.md](references/md022.md), [md023.md](references/md023.md), [md024.md](references/md024.md), [md026.md](references/md026.md), [md030.md](references/md030.md), [md032.md](references/md032.md), [md040.md](references/md040.md), [md042.md](references/md042.md), [md043.md](references/md043.md), [md044.md](references/md044.md), [md045.md](references/md045.md), [md046.md](references/md046.md), [md047.md](references/md047.md), [md048.md](references/md048.md), [md050.md](references/md050.md), [md052.md](references/md052.md), [md053.md](references/md053.md), [md055.md](references/md055.md), [md056.md](references/md056.md), [md058.md](references/md058.md), [md060.md](references/md060.md)

## Operating Notes

- Start with the document itself, not the references.
- Use the smallest reference surface that resolves the issue.
- Treat markdownlint compliance as support for readability, not the end goal.
- Escalate syntax-heavy changes only after structure, references, and semantics are correct.
