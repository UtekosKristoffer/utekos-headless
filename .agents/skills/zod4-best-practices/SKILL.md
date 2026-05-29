---
name: zod4-best-practices
description: Use when creating new Zod schemas, handling Zod validation errors, refining data types, or when migrating Zod 3 schemas to Zod 4. Pay attention to this if you encounter deprecated Zod 3 methods or related errors.
---

# Zod 4 Best Practices

## Overview

Zod 4 introduces major performance enhancements (100x reduction in `tsc` instantiations, better tree-shaking, and parsing speed) and syntax updates. This skill ensures you write modern, high-performance Zod 4 validation schemas without relying on outdated and deprecated Zod 3 APIs.

## When to Use

- Writing data validation schemas using Zod.
- Refactoring `z.object().strict()` or `.email()` configurations.
- Customizing error messages and formats for Zod issues.
- Handling mutually recursive types.

## Core Pattern

In Zod 4, heavily favor top-level utility functions (like `z.email()`) over chainable methods (like `z.string().email()`) for optimal tree-shaking and performance. Use the unified `error` property instead of `message`, `invalid_type_error`, or `errorMap`.

## Quick Reference

| Feature | Zod 3 (Deprecated/Slow) | Zod 4 (Standard) |
| :--- | :--- | :--- |
| **String formats** | `z.string().email()` | `z.email()` |
| **Object strictness** | `z.object({}).strict()` | `z.strictObject({})` |
| **Loose objects** | `z.object({}).passthrough()` | `z.looseObject({})` |
| **Error message** | `{ message: "Bad" }` | `{ error: "Bad" }` |
| **Required error** | `{ required_error: "Req" }` | Use `{ error: (issue) => ... }` |
| **Merging objects** | `Base.merge(Additional)` | `Base.extend(Additional.shape)` |
| **Native Enums** | `z.nativeEnum(Color)` | `z.enum(Color)` |
| **Boolean strings** | Manual coercion | `z.stringbool()` (handles "yes", "true", "1") |

## Error Customization

Zod 4 provides a unified `error` property. Say goodbye to `invalid_type_error`, `required_error`, and `errorMap`.

```tsx
// ❌ BAD: Zod 3 style (deprecated)
z.string({
  required_error: "This field is required",
  invalid_type_error: "Not a string",
});

// ✅ GOOD: Zod 4 style
z.string({
  error: (issue) => issue.input === undefined
    ? "This field is required"
    : "Not a string"
});
```

To pretty-print errors (for logging or CLI output), use `z.prettifyError(err)`. Do **not** use the deprecated `err.flatten()` or `err.format()`.

## Red Flags - STOP and Start Over

- `z.string().uuid()` or `z.string().url()` -> Delete it, use `z.uuid()` or `z.url()`.
- `z.object({...}).strict()` -> Delete it, use `z.strictObject({...})`.
- The `message` property for custom errors -> Use the unified `error` property.
- `z.promise()` -> Deprecated. Just `await` the input before parsing.
- Using `Error` prototype checks on safe parse -> `z.string().safeParse(12).error` is NO LONGER an instance of `Error` for performance reasons!
- `ZodError.formErrors` or `err.flatten()` -> Deprecated, migrate error logging to `z.prettifyError(err)` or custom tree-mapping logic.

## Recursive Objects

Zod 4 handles recursive and mutually recursive types flawlessly via getters without messy type casting:

```tsx
const Category = z.object({
  name: z.string(),
  get subcategories() {
    return z.array(Category);
  },
});
// Type inference automatically yields: { name: string; subcategories: Category[] }
```

## JSON Schema & Metadata Conversion

Instead of third-party libs, Zod 4 supports JSON schemas directly:

```tsx
const mySchema = z.object({
  name: z.string().describe("User name")
});
const schemaObj = z.toJSONSchema(mySchema);
```

To attach metadata to a schema without altering its type, use `.meta()` instead of the legacy `.describe()` for more flexibility:

```tsx
const emailSchema = z.string().meta({ title: "Email", description: "..." });
```

### Available References

- Basic usage: [basic-usage.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/basic-usage.md)
- Codecs: [codecs.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/codex.md)
- Customizing errors: [customizing-errors.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/customixing-errors.md)
- Defining schemas: [defining-schemas.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/defining-schemas.md)
- JSON Schema: [json-schema.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/jsonSchema.md)
- Registery: [registry.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/registry.md)
- Migration guide: [migration-guide.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/migration-guide.md)
- Zod core: [zod-core.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/zod-core.md)
- Zod: [zod.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/zod.md)
- Ecosystem: [ecosystem.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/ecosystem.md)
- Release notes: [release-notes.md](file:///Users/kristofferohnstadhjelmeland/utekos-wiki/zod/release-notes.md)
