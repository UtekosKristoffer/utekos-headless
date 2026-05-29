---
name: llm-markdown-optimization
description: Use when processing, scraping, or cleaning up documentation files to optimize them for LLM context, readability, and token efficiency.
---

# LLM Markdown Optimization

## Overview

This skill defines the strict constraints, formatting rules, and optimization techniques for transforming official documentation and text into highly structured, LLM-friendly markdown files. The goal is to maximize LLM processing efficiency, context retention, and token economy without losing meaningful technical content.

## When to Use

- You are scraping official documentation into markdown files.
- You are asked to optimize markdown or `.mdx` files for LLMs.
- You are analyzing or cleaning up documentation directories (e.g., BigQuery, Shopify docs).

---

## Core Optimization Rules

### 1. Mandatory Context Frontmatter

Every optimized document MUST begin with a YAML frontmatter block to provide immediate context, categorization, and source tracking to the LLM.

```yaml
---
title: "The official document title"
url: "https://docs.cloud.google.com/path (The original source URL)"
category: "Optimal description for LLM context understanding"
date: "YYYY-MM-DD"
---
```

_Note: The date should always be the current date of optimization (e.g., `2026-03-23`)._

### 2. Aggressive Backticking

Use inline backticks (\`) consistently and continuously for ALL technical entities to aid parsing:

- Function names, variables, API endpoints, SDK methods
- Types, interfaces, classes
- File names, paths, shell commands
- Cloud services, platforms, and specific concepts (e.g., `BigQuery`, `ShopifyQL`, `AdGroupAudienceStats`)

**Exception:** Do not arbitrarily place inline backticks around SQL or language keywords _inside_ a fenced code block, as this breaks syntax validation (e.g., use `SELECT * FROM table`, NOT \`SELECT\` \* \`FROM\` table).

### 3. Code Block Perfection

- **Explicit Languages:** EVERY fenced code block MUST start with three backticks followed by the correct language identifier (e.g., \`\`\`bash, \`\`\`sql, \`\`\`typescript, \`\`\`json, \`\`\`graphql).
- **No Orphaned Boundaries:** NEVER leave three backticks lying around without closing them, and never use four backticks (` \`\`\`\` `) unless specifically required by MDX logic.
- **Syntactic Validity:** The contents of the code block must be valid for the specified language.

### 4. Token Trimming & Link Flattening

Minimize token usage by removing standard markdown hyperlink structures and retaining only the anchor text. URLs within the content consume heavy tokens and disrupt LLM reading flow.

**CRITICAL RULE FOR FLATTENED LINKS:** When you remove the `[ ](url)` wrapper, you MUST aggressively backtick the remaining text (e.g., `text` -> \`text\`) if it refers to a feature, concept, API, or guide. Do NOT just leave it as bare, unformatted text.

**Before:**

> Extract information into [structured output](https://ai.google.dev/gemini-api/docs/structured-output) formats.

**After:**

> Extract information into `structured output` formats.

_Exception:_ Only retain a URL if the explicit purpose of the paragraph is to provide that URL for an API endpoint or crucial reference.

### 5. Multi-Language Example Deduplication

If documentation provides the exact same code example in multiple languages or formats (e.g., Python, REST, Go, JavaScript), **KEEP ONLY ONE** to save tokens and reduce redundancy.
**Priority sequence for retaining languages:**

1. `Python` (Always keep if present)
2. `JavaScript` (Keep if Python is absent)
3. `TypeScript` (Keep if Python and JavaScript are absent)
4. `Go` / `Java` (Keep if Python and JavaScript are absent)
5. `REST` / `bash` / `cURL` (Keep only if no other languages exist)

**Action:** Delete the entire blocks (including headers like `### Python` and the fenced code blocks) of the lower-priority redundant languages.

### 6. Structure and Fluff Removal

Remove all non-essential documentation site artifacts that provide zero contextual value:

- "On this Page" sections and deep Tables of Contents (TOC).
- "Was this helpful?", "Send feedback", "Report issue" footers.
- Conversational filler ("In this tutorial, you will learn how to...").
- Empty or redundant UI-based instructions ("Click the blue button in the top right corner").

### 7. Semantic Hierarchy

- Use a single `# Title` (usually handled by the frontmatter now, but `#` is fine).
- Use `##`, `###`, and `####` strictly hierarchically.
- Do not skip header levels.

---

## Red Flags - STOP and Refactor

If you see any of the following during an optimization pass, you must fix them:

- **` ``` ` without a language identifier.** -> Add the correct language (e.g., `json`, `sql`).
- **`[Text](https://...)` inline hyperlinks.** -> Remove brackets, delete the URL, backtick the text if technical.
- **Missing YAML frontmatter.** -> Inject the required YAML block.
- **Bare technical terms.** -> Add backticks (e.g., change `Partitioned tables are...` to `Partitioned tables are...`).
- **Web scraping remnants.** -> Delete "On this page", language selectors, and footer menus.
