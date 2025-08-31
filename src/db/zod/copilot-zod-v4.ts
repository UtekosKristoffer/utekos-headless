/**
 * @copilot
 */

/**
 * @fileoverview Zod v4 migration guide summarised.
 * This file documents the breaking changes introduced in Zod version 4, based on the official
 * migration guide at https:@notezod.dev/v4/changelog.  It is formatted as a structured JSDoc file
 * intended to teach Copilot about the new APIs and differences from Zod 3.  Each section
 * corresponds to a major topic in the migration guide and reproduces the provided code
 * examples verbatim.  Comments prefixed with ❌ or ✅ reflect the original documentation and are
 * included for clarity.
 */

/**
 * @section Migration guide overview
 * @description The migration guide lists breaking changes in Zod 4 ordered by impact.  To
 * upgrade to Zod 4 install the new package version and read the guide thoroughly.  The guide
 * notes that Zod 3 exported some undocumented quasi‑internal utilities which are no longer
 * considered part of the public API; those changes are not documented here.  A community‑
 * maintained codemod is available to assist with migration.
 * @example
 * @note Install Zod 4
 * npm install zod@^4.0.0
 *
 * @note Note: A codemod called zod‑v3‑to‑v4 exists to help upgrade your codebase.
 */

/**
 * @section Error customization
 * @description Zod 4 standardizes error customization under a single `error` parameter.  The
 * older `message` field is still accepted but deprecated.  The `invalid_type_error` and
 * `required_error` parameters have been removed; their functionality is subsumed by the
 * new `error` callback.  The `errorMap` parameter has been renamed to `error`.  An error
 * callback may return a string or `undefined` (to yield control to the next error map in
 * the chain).
 * @example
 * import * as z from 'zod';
 *
 * @note Provide a custom error message directly via the error parameter
 * z.string().min(5, { error: 'Too short.' });
 *
 * @note Use an error callback to distinguish missing inputs from invalid types
 * z.string({
 *   error: (issue) => issue.input === undefined
 *     ? 'This field is required'
 *     : 'Not a string',
 * });
 *
 * @note Error maps can now return plain strings or undefined
 * z.string().min(5, {
 *   error: (issue) => {
 *     if (issue.code === 'too_small') {
 *       return `Value must be >${issue.minimum}`;
 *     }
 *     @note return undefined to let other error maps handle the issue
 *   },
 * });
 */

/**
 * @section ZodError changes
 * @description The `ZodError` class has been refined.  Issue formats are simplified, and
 * several issue types have been renamed or removed.  Error map precedence has changed such
 * that a schema‑level error map takes precedence over a contextual error map provided to
 * `.parse()`.  Some methods on `ZodError` are deprecated or removed.
 *
 * @example
 * import * as z from 'zod';
 *
 * @note New issue type definitions (v4)
 * type IssueFormats =
 *   | z.core.$ZodIssueInvalidType
 *   | z.core.$ZodIssueTooBig
 *   | z.core.$ZodIssueTooSmall
 *   | z.core.$ZodIssueInvalidStringFormat
 *   | z.core.$ZodIssueNotMultipleOf
 *   | z.core.$ZodIssueUnrecognizedKeys
 *   | z.core.$ZodIssueInvalidValue
 *   | z.core.$ZodIssueInvalidUnion
 *   | z.core.$ZodIssueInvalidKey        @note new: used for z.record/z.map
 *   | z.core.$ZodIssueInvalidElement    @note new: used for z.map/z.set
 *   | z.core.$ZodIssueCustom;
 *
 * @note Old issue types (v3) and their mapping to v4 types
 * type LegacyIssueFormats =
 *   | z.ZodInvalidTypeIssue                    @note ♻️ renamed to z.core.$ZodIssueInvalidType
 *   | z.ZodTooBigIssue                         @note ♻️ renamed to z.core.$ZodIssueTooBig
 *   | z.ZodTooSmallIssue                       @note ♻️ renamed to z.core.$ZodIssueTooSmall
 *   | z.ZodInvalidStringIssue                  @note ♻️ renamed to z.core.$ZodIssueInvalidStringFormat
 *   | z.ZodNotMultipleOfIssue                  @note ♻️ renamed to z.core.$ZodIssueNotMultipleOf
 *   | z.ZodUnrecognizedKeysIssue               @note ♻️ renamed to z.core.$ZodIssueUnrecognizedKeys
 *   | z.ZodInvalidUnionIssue                   @note ♻️ renamed to z.core.$ZodIssueInvalidUnion
 *   | z.ZodCustomIssue                         @note ♻️ renamed to z.core.$ZodIssueCustom
 *   | z.ZodInvalidEnumValueIssue;              @note ❌ merged into z.core.$ZodIssueInvalidValue
 * @note The following types were removed entirely: z.ZodInvalidLiteralIssue, z.ZodInvalidUnionDiscriminatorIssue,
 * @note z.ZodInvalidArgumentsIssue, z.ZodInvalidReturnTypeIssue, z.ZodInvalidDateIssue,
 * @note z.ZodInvalidIntersectionTypesIssue, z.ZodNotFiniteIssue.
 *
 * @note Error map precedence example
 * const mySchema = z.string({ error: () => 'Schema‑level error' });
 *
 * @note In Zod 3 the contextual error map takes precedence
 * mySchema.parse(12, { error: () => 'Contextual error' }); @note => 'Contextual error'
 *
 * @note In Zod 4 the schema‑level error takes precedence
 * mySchema.parse(12, { error: () => 'Contextual error' }); @note => 'Schema‑level error'
 *
 * @note Deprecated methods on ZodError
 * @note .format() and .flatten() are deprecated; use z.treeifyError() instead
 * @note .formErrors was identical to .flatten() and has been removed
 * @note .addIssue() and .addIssues() are deprecated; push new issues directly to err.issues
 * const err = new z.ZodError([]);
 * err.issues.push({
 *   @note add issue properties here
 * });
 */

/**
 * @section z.number() changes
 * @description The `z.number()` API has stricter semantics in Zod 4.  Infinite values
 * (`POSITIVE_INFINITY` and `NEGATIVE_INFINITY`) are no longer valid numbers.  The `.safe()`
 * method is deprecated and now behaves the same as `.int()`: it no longer accepts floats.  The
 * `.int()` method rejects integers outside the safe integer range.  Consider switching to
 * `z.int()`.
 */

/**
 * @section z.string() updates
 * @description String format validators are now implemented as top‑level functions rather than
 * methods on `z.string()`.  While the method forms still work for backwards compatibility,
 * they are deprecated.  Several new validators are available, and some behaviours have
 * changed.
 * @example
 * import * as z from 'zod';
 *
 * @note Top‑level format validators
 * z.email();          @note validates an email address
 * z.uuid();           @note RFC 9562/4122 compliant UUID
 * z.guid();           @note accepts any 8‑4‑4‑4‑12 hex pattern
 * z.url();            @note URL validator
 * z.emoji();          @note validates a single emoji character
 * z.base64();         @note standard base64
 * z.base64url();      @note base64url (padding is not allowed)
 * z.nanoid();         @note validates nanoid strings
 * z.cuid();
 * z.cuid2();
 * z.ulid();
 * z.ipv4();
 * z.ipv6();
 * z.cidrv4();         @note CIDR IPv4 range
 * z.cidrv6();         @note CIDR IPv6 range
 * z.iso.date();       @note ISO date
 * z.iso.time();       @note ISO time
 * z.iso.datetime();   @note ISO datetime
 * z.iso.duration();   @note ISO duration
 *
 * @note Method forms still exist but are deprecated
 * z.string().email(); @note ❌ deprecated
 * z.email();          @note ✅ preferred
 *
 * @note Strict UUID validation: variant bits must be `10` per RFC
 * z.uuid(); @note RFC 9562/4122 compliant
 * z.guid(); @note permits any 8‑4‑4‑4‑12 hex pattern
 *
 * @note IP address validation now uses separate validators
 * z.string().ip(); @note ❌ removed
 * z.ipv4();       @note ✅ IPv4 validator
 * z.ipv6();       @note ✅ IPv6 validator
 *
 * @note CIDR validation split into IPv4 and IPv6 variants
 * z.string().cidr(); @note ❌ removed
 * z.cidrv4();        @note ✅ IPv4 CIDR range
 * z.cidrv6();        @note ✅ IPv6 CIDR range
 */

/**
 * @section z.coerce() updates
 * @description The input type of all coercion schemas (`z.coerce.string()`, `z.coerce.number()`, etc.)
 * is now `unknown`.  In Zod 3 the input type matched the output type (e.g. `string`), but in Zod 4
 * any value is accepted and then coerced.
 * @example
 * import * as z from 'zod';
 *
 * const schema = z.coerce.string();
 * type SchemaInput = z.input<typeof schema>;
 *
 * @note Zod 3 inferred the input type as `string`.
 * @note Zod 4 now infers the input type as `unknown`.
 */

/**
 * @section .default() updates
 * @description The semantics of `.default()` have changed.  If the input is `undefined`, Zod 4
 * short‑circuits parsing and returns the default value without running any transforms.  The default
 * value must be assignable to the output type.  In Zod 3 the default value was parsed as
 * input and then transformed.  To replicate the old behaviour, use the new `.prefault()` method
 * (pre‑parse default).
 * @example
 * import * as z from 'zod';
 *
 * @note Zod 4: default value returned without parsing
 * const schemaV4 = z.string()
 *   .transform((val) => val.length)
 *   .default(0); @note default must match the output type (number)
 * schemaV4.parse(undefined); @note => 0
 *
 * @note Zod 3: default value parsed as input then transformed
 * const schemaV3 = z.string()
 *   .transform((val) => val.length)
 *   .default('tuna');
 * schemaV3.parse(undefined); @note => 4
 *
 * @note Replicate old behaviour with .prefault()
 * const schemaPrefault = z.string()
 *   .transform((val) => val.length)
 *   .prefault('tuna');
 * schemaPrefault.parse(undefined); @note => 4
 */

/**
 * @section z.object() updates
 * @description Object schemas have undergone several refinements.
 *  - Defaults declared on properties are now applied even inside optional fields.
 *  - The `.strict()` and `.passthrough()` methods are deprecated; use `z.strictObject()` and
 *    `z.looseObject()` instead.  These legacy methods remain for compatibility.
 *  - The `.strip()` method (which converted a strict object back to loose) is removed.  Use
 *    `z.object(A.shape)` to create a non‑strict object from a strict one.
 *  - The long‑deprecated `.nonstrict()` alias is removed.
 *  - The `.deepPartial()` helper is removed; it is considered an anti‑pattern.
 *  - The `z.unknown()` and `z.any()` types are no longer marked as optional when used as object
 *    properties.  Keys are required unless explicitly marked optional.
 *  - The `.merge()` method on `ZodObject` is deprecated; use `.extend()` or object
 *    destructuring instead for better TypeScript performance.
 *
 * @example
 * import * as z from 'zod';
 *
 * @note Defaults applied within optional fields
 * const schema = z.object({
 *   a: z.string().default('tuna').optional(),
 * });
 * schema.parse({});
 * @note Zod 4: { a: 'tuna' }
 * @note Zod 3: {}
 *
 * @note Strict vs loose objects (deprecated methods vs new functions)
 * @note Zod 3
 * z.object({ name: z.string() }).strict();
 * z.object({ name: z.string() }).passthrough();
 * @note Zod 4
 * z.strictObject({ name: z.string() });
 * z.looseObject({ name: z.string() });
 *
 * @note Stripping back to a loose object
 * @note use z.object(A.shape) instead of .strip()
 *
 * @note unknown/any keys are no longer optional
 * const mySchema = z.object({
 *   a: z.any(),
 *   b: z.unknown(),
 * });
 * @note Zod 3 inferred { a?: any; b?: unknown }
 * @note Zod 4 infers { a: any; b: unknown }
 *
 * @note .merge() deprecated in favour of .extend() or destructuring
 * const BaseSchema = z.object({ name: z.string() });
 * const AdditionalSchema = z.object({ age: z.number() });
 *
 * @note Deprecated merge
 * const ExtendedSchemaDeprecated = BaseSchema.merge(AdditionalSchema);
 *
 * @note Recommended extend
 * const ExtendedSchema = BaseSchema.extend(AdditionalSchema.shape);
 *
 * @note Best TypeScript performance: object spread
 * const ExtendedSchemaSpread = z.object({
 *   ...BaseSchema.shape,
 *   ...AdditionalSchema.shape,
 * });
 */

/**
 * @section z.nativeEnum() deprecated
 * @description The `z.nativeEnum()` helper is deprecated.  Zod 4 overloads the `z.enum()` API so
 * that TypeScript enums or enum‑like objects can be passed directly.  As a consequence, several
 * redundant properties on the returned schema have been removed.  Use the canonical `.enum` field
 * on the schema to access values.
 * @example
 * import * as z from 'zod';
 *
 * enum Color {
 *   Red = 'red',
 *   Green = 'green',
 *   Blue = 'blue',
 * }
 *
 * const ColorSchema = z.enum(Color); @note ✅ works with TypeScript enums
 *
 * @note The following properties have been removed
 * @note ColorSchema.enum.Red;   @note ✅ the canonical API
 * @note ColorSchema.Enum.Red;   @note ❌ removed
 * @note ColorSchema.Values.Red; @note ❌ removed
 */

/**
 * @section z.array() changes
 * @description The `.nonempty()` method on arrays no longer changes the inferred type; it now
 * behaves identically to `.min(1)`.  To represent an array with at least one item whose type
 * reflects a tuple `[T, ...T[]]`, use `z.tuple()` with a rest argument.
 * @example
 * import * as z from 'zod';
 *
 * const NonEmptyArray = z.array(z.string()).nonempty();
 * type NonEmptyArrayType = z.infer<typeof NonEmptyArray>;
 * @note Zod 3: [string, ...string[]]
 * @note Zod 4: string[]
 *
 * @note Use a tuple with a rest argument to replicate the old behaviour
 * z.tuple([z.string()], z.string()); @note => [string, ...string[]]
 */

/**
 * @section z.promise() deprecated
 * @description The `z.promise()` helper is deprecated.  If your input might be a promise, await
 * it before parsing with Zod.  When defining Zod‑validated functions with `z.function()`, there is
 * no need to wrap the return type in a promise; use the `.implementAsync()` method instead.
 */

/**
 * @section z.function() updates
 * @description The `z.function()` helper has been refactored.  It no longer returns a Zod schema
 * but rather a function factory.  You specify the `input` and `output` schemas up front.  The
 * returned value exposes `.implement()` and `.implementAsync()` methods for providing the actual
 * implementation.  This eliminates some confusing overloads from Zod 3.
 *
 * @example
 * import * as z from 'zod';
 *
 * @note Define a function that accepts an object with name and age and returns a string
 * const greet = z.function({
 *   input: [z.object({
 *     name: z.string(),
 *     age: z.number().int(),
 *   })],
 *   output: z.string(),
 * });
 *
 * @note Provide the implementation
 * greet.implement((input) => {
 *   return `Hello ${input.name}, you are ${input.age} years old.`;
 * });
 *
 * @note Define an async function
 * greet.implementAsync(async (input) => {
 *   return `Hello ${input.name}, you are ${input.age} years old.`;
 * });
 */

/**
 * @section .refine() updates
 * @description Refinements in Zod 4 no longer narrow the inferred type when you pass a type
 * predicate function.  Additionally, `ctx.path` is no longer available in refinement contexts,
 * and the overload that accepted a second function argument to build a message has been removed.
 *
 * @example
 * import * as z from 'zod';
 *
 * @note Passing a type predicate no longer narrows the inferred type
 * const mySchema = z.unknown().refine((val): val is string => {
 *   return typeof val === 'string';
 * });
 * type MySchema = z.infer<typeof mySchema>;
 * @note Zod 3: string
 * @note Zod 4: still unknown
 *
 * @note ctx.path is no longer available inside superRefine
 * z.string().superRefine((val, ctx) => {
 *   @note ctx.path; @note ❌ removed in Zod 4
 * });
 *
 * @note The overload accepting a second function argument has been removed
 * const longString = z.string().refine(
 *   (val) => val.length > 10,
 *   (val) => ({ message: `${val} is not more than 10 characters` }),
 * ); @note ❌ invalid in Zod 4
 */

/**
 * @section Dropped convenience helpers
 * @description Undocumented helpers like `z.ostring()`, `z.onumber()` and others have been
 * removed.  These were shorthand methods for defining optional schemas and are not part of
 * Zod 4.
 */

/**
 * @section z.literal() change
 * @description Symbol values are no longer allowed in `z.literal()`.  Symbols are not considered
 * literal values because they cannot be compared using `===`.
 */

/**
 * @section Static `.create()` factories dropped
 * @description All Zod classes previously exposed static `.create()` methods (e.g.
 * `z.ZodString.create()`).  These methods have been removed in favour of using the factory
 * functions directly (e.g. `z.string()`).
 * @example
 * import * as z from 'zod';
 *
 * z.ZodString.create(); @note ❌ no longer available
 */

/**
 * @section z.record() changes
 * @description The `z.record()` helper now requires both a key schema and a value schema.  Passing
 * a single argument is no longer supported.  Enum support has been improved: passing an enum
 * as the key schema produces a record with required keys instead of optional ones.  To obtain
 * optional keys, use `z.partialRecord()`.
 *
 * @example
 * import * as z from 'zod';
 *
 * @note Passing a single argument is no longer valid
 * z.record(z.string());    @note ❌ invalid in Zod 4
 * z.record(z.string(), z.string()); @note ✅ provide both key and value schemas
 *
 * @note Improved enum support
 * const myRecord = z.record(z.enum(['a', 'b', 'c']), z.number());
 * @note Zod 3 inferred { a?: number; b?: number; c?: number; }
 * @note Zod 4 infers { a: number; b: number; c: number; }
 *
 * @note To replicate optional keys use z.partialRecord()
 * const myPartial = z.partialRecord(z.enum(['a', 'b', 'c']), z.number());
 * @note => { a?: number; b?: number; c?: number; }
 */

/**
 * @section z.intersection() change
 * @description Intersections in Zod 4 throw a regular `Error` instead of a `ZodError` when the
 * parsed results cannot be merged.  In Zod 3 such cases produced a special
 * `"invalid_intersection_types"` issue.  The change reflects that a merge conflict indicates a
 * structural schema problem rather than a validation failure.
 */

/**
 * @section Internal changes and new utilities
 * @description Several internal refactors in Zod 4 may affect advanced usage or library authors.
 *  - **Generics**: `ZodType` has changed from `ZodType<Output, Def, Input>` to
 *    `ZodType<Output = unknown, Input = unknown>`.  The `Def` generic has been removed and
 *    `Input` now defaults to `unknown`.  Use `z.ZodType` instead of `z.ZodTypeAny`.
 *  - **z.core**: Many utility functions and types are moved to a new `zod/v4/core` sub‑package.
 *    They are also re‑exported under the `z.core` namespace for convenience.
 *  - **`._def` moved**: The internal `._def` property has moved to `._zod.def`.  Internal
 *    definitions are subject to change and should not be relied upon.
 *  - **ZodEffects removed**: Refinements and transforms no longer wrap schemas in a `ZodEffects`
 *    class.  Instead schemas contain an array of “checks”.  In Zod Mini the `.check()` method is
 *    used to compose validations.
 *  - **ZodTransform and ZodPipe**: Transforms are represented by a dedicated `ZodTransform`
 *    class.  `.transform()` and `z.preprocess()` now return instances of `ZodPipe` rather than
 *    special classes.  Branding is handled via type inference rather than a `ZodBranded` class.
 *
 * @example
 * import * as z from 'zod';
 *
 * @note Generic changes: Def removed and Input defaults to unknown
 * @note Zod 3
 * class ZodType<Output, Def extends z.ZodTypeDef, Input = Output> {}
 *
 * @note Zod 4
 * class ZodType<Output = unknown, Input = unknown> {}
 *
 * function inferSchema<T extends z.ZodType>(schema: T): T {
 *   return schema;
 * }
 * inferSchema(z.string()); @note => z.ZodString
 *
 * @note Using z.core from the core sub‑package
 * import * as core from 'zod/v4/core';
 * function handleError(iss: core.$ZodError) {
 *   @note handle error issues
 * }
 *
 * @note The same types are re‑exported under z.core
 * import * as zod from 'zod';
 * function handleErr(iss: zod.core.$ZodError) {
 *   @note handle error issues
 * }
 *
 * @note Composing checks with Zod Mini (.check())
 * import * as mini from 'zod/mini';
 * mini.string().check(
 *   mini.minLength(10),
 *   mini.maxLength(100),
 *   mini.toLowerCase(),
 *   mini.trim(),
 * );
 *
 * @note Standalone transform using ZodTransform
 * const schema = z.transform((input) => String(input));
 * schema.parse(12); @note => '12'
 *
 * @note .transform() now returns a ZodPipe
 * z.string().transform((val) => val); @note => ZodPipe<ZodString, ZodTransform>
 *
 * @note z.preprocess() also returns a ZodPipe
 * z.preprocess((val) => val, z.string()); @note => ZodPipe<ZodTransform, ZodString>
 */
