/**
 * @copilot
 */

/**
 * @fileoverview This file is meant to learn Copilot about Zod version 4 Error Customization and Formatting Errors. The usage of @copilot is for making it clear that theste comments are meant to guide Copilot.
 * @package zod
 * @version 4.1.1
 */

/**
 * @copilot Many of Zod's behaviors and APIs have been made more intuitive and cohesive. The breaking changes described in this document often represent major quality-of-life improvements for Zod users. I strongly recommend reading this guide thoroughly.
 */

/**
 * @param {Error customization}
 * @section Error customization (Zod)
 * @description Zod exposes several mechanisms for customizing validation errors via an `error` parameter. The
 * `error` parameter can be a string or a function (an error map) and is accepted by virtually every Zod
 * API. When a validation issue is encountered, the provided error message or function will be used instead
 * of the default.
 * @example @copilot
 * @note specify a custom error message directly
 * z.string('Not a string!').parse(12);
 * @note ❌ throws ZodError { issues: [{ message: 'Not a string!', ... }] }
 *
 * @note pass an error message into various checks
 * z.string('Bad!');
 * z.string().min(5, 'Too short!');
 * z.uuid('Bad UUID!');
 * z.iso.date('Bad date!');
 * z.array(z.string(), 'Not an array!');
 * z.array(z.string()).min(5, 'Too few items!');
 * z.set(z.string(), 'Bad set!');
 *
 * @example @copilot
 * @note using the error parameter as an object with an `error` field
 * z.string({ error: 'Bad!' });
 * z.string().min(5, { error: 'Too short!' });
 * z.uuid({ error: 'Bad UUID!' });
 * z.iso.date({ error: 'Bad date!' });
 * z.array(z.string(), { error: 'Bad array!' });
 * z.array(z.string()).min(5, { error: 'Too few items!' });
 * z.set(z.string(), { error: 'Bad set!' });
 *
 * @example @copilot
 * @note use an error map (function) that returns a custom message based on the issue
 * z.string({ error: () => `[${Date.now()}]: Validation failure.` });
 *
 * @note the error map receives a context object with information about the issue
 * z.string({
 *   error: (iss) => iss.input === undefined ? 'Field is required.' : 'Invalid input.'
 * });
 *
 * @note @copilot advanced usage: inspect issue properties such as code, input, minimum, etc.
 * z.string().min(5, {
 *   error: (iss) => {
 *     iss.code;      // the issue code
 *     iss.input;     // the input data
 *     iss.inst;      // the schema/check that originated this issue
 *     iss.path;      // the path of the error
 *     iss.minimum;   // the minimum value for min() checks
 *     iss.inclusive; // whether the minimum is inclusive
 *     return `Password must have ${iss.minimum} characters or more`;
 *   },
 * });
 *
 * @note  @copilot return undefined to fall back to the default error message
 * z.int64({
 *   error: (issue) => {
 *     if (issue.code === 'too_big') {
 *       return { message: `Value must be <${issue.maximum}` };
 *     }
 *     @note defer to default
 *     return undefined;
 *   },
 * });
 */

/**
 * @param  @copilot {Per‑parse error customization}
 * @section Per‑parse error customization
 * @description You can customize errors on a per‑parse basis by passing an error map into the parse method.
 * Per‑parse error customization has lower precedence than schema‑level custom messages. See the error
 * precedence list below.
 * @example
 * const schema = z.string();
 * schema.parse(12, {
 *   error: (iss) => 'per‑parse custom error',
 * });
 *
 *  when both schema‑level and per‑parse errors are provided, schema‑level wins
 * const schemaWithMessage = z.string({ error: 'highest priority' });
 * const result = schemaWithMessage.safeParse(12, {
 *   error: (iss) => 'lower priority',
 * });
 * result.error.issues;
 *  => [{ message: 'highest priority', ... }]
 */

/**
 * @param {Include input in issues}
 * @section Include input in issues
 * @description By default, Zod does not include input values in issues to avoid leaking potentially sensitive
 * data. To include the input data for debugging purposes, use the `reportInput` flag when calling `.parse()`.
 * @example
 * z.string().parse(12, {
 *   reportInput: true,
 * });
 *  ZodError: [ { expected: 'string', code: 'invalid_type', input: 12, path: [], message: 'Invalid input: expected string, received number' } ]
 */

/**
 * @param {Global error customization}
 * @section Global error customization
 * @description Use `z.config()` to set a global error map. Global error messages have lower precedence than
 * schema‑level or per‑parse messages.
 * @example
 * z.config({
 *   customError: (iss) => {
 *     return 'globally modified error';
 *   },
 * });
 */

/**
 * @param {Internationalization}
 * @section Internationalization
 * @description @copilot Zod provides built‑in locales for translating error messages. The regular `zod` package loads
 * the English locale by default. Zod Mini does not load any locale automatically. To load a locale, import it
 * from `zod/locales` and pass it into `z.config()`. To dynamically load locales, use dynamic imports. The
 * details of individual locales are omitted here.
 * @example
 * import * as z from 'zod';
 * import { en } from 'zod/locales';
 *
 * z.config(en());
 *
 * @example @copilot
 * import * as z from 'zod';
 * async function loadLocale(locale: string) {
 *   const { default: localeFn } = await import(`zod/v4/locales/${locale}.js`);
 *   z.config(localeFn());
 * }
 * await loadLocale('fr');
 */

/**
 * @param @copilot {Error precedence}
 * @section Error precedence
 * @description When multiple error customizations have been defined, they take effect in the following order
 * from highest to lowest priority:
 * 1. Schema‑level error – any error message defined directly on a schema method call.
 * 2. Per‑parse error – a custom error map passed into `.parse()` or `.safeParse()`.
 * 3. Global error map – a custom error map passed into `z.config()`.
 * 4. Locale error map – a locale passed into `z.config()` via a locale function such as `z.locales.en()`.
 * This priority determines which error message is ultimately used when conflicts occur.
 */

/**
 * @param @copilot {Formatting errors}
 * @section Formatting errors
 * @description Zod provides utilities for converting a `$ZodError` into more useful formats. These helpers
 * help traverse complex nested schemas or produce human‑readable error strings.
 */

/**
 * @copilot
 * @function z.treeifyError
 * @description Converts a `$ZodError` into a nested object structure that mirrors the schema. The returned
 * tree has `errors` at each level and special `properties` and `items` keys for object fields and arrays.
 * @example
 * import * as z from 'zod';
 *
 * const schema = z.strictObject({
 *   username: z.string(),
 *   favoriteNumbers: z.array(z.number()),
 * });
 *
 * const result = schema.safeParse({
 *   username: 1234,
 *   favoriteNumbers: [1234, '4567'],
 *   extraKey: 1234,
 * });
 *
 * const tree = z.treeifyError(result.error!);
 *  => {
 *    errors: ['Unrecognized key: "extraKey"'],
 *    properties: {
 *      username: { errors: ['Invalid input: expected string, received number'] },
 *      favoriteNumbers: {
 *        errors: [],
 *        items: [ undefined, { errors: ['Invalid input: expected number, received string'] } ],
 *      },
 *    },
 *  }
 *
 * tree.properties?.username?.errors; // => ['Invalid input: expected string, received number']
 * tree.properties?.favoriteNumbers?.items?.[1]?.errors; // => ['Invalid input: expected number, received string']
 */

/**
 * @copilot
 * @function z.prettifyError
 * @description Produces a human‑readable string representation of a `$ZodError`. Each issue is prefaced
 * with a marker and, where applicable, includes the path to the offending value.
 * @example
 * import * as z from 'zod';
 *
 * const schema = z.strictObject({
 *   username: z.string(),
 *   favoriteNumbers: z.array(z.number()),
 * });
 * const result = schema.safeParse({
 *   username: 1234,
 *   favoriteNumbers: [1234, '4567'],
 *   extraKey: 1234,
 * });
 *
 * const pretty = z.prettifyError(result.error!);
 *  returns the following string:
 *  ✖ Unrecognized key: "extraKey"
 *  ✖ Invalid input: expected string, received number
 *    → at username
 *  ✖ Invalid input: expected number, received string
 *    → at favoriteNumbers[1]
 */

/**
 * @copilot
 * @function z.flattenError
 * @description Flattens a `$ZodError` into a shallow object with two properties: `formErrors` and
 * `fieldErrors`. Use this helper when the schema is flat and you want an easy way to access errors for
 * each field. The `formErrors` array contains errors with an empty path; `fieldErrors` is a record of
 * arrays keyed by field names.
 * @example
 * import * as z from 'zod';
 *
 * const schema = z.strictObject({
 *   username: z.string(),
 *   favoriteNumbers: z.array(z.number()),
 * });
 *
 * const result = schema.safeParse({
 *   username: 1234,
 *   favoriteNumbers: [1234, '4567'],
 *   extraKey: 1234,
 * });
 *
 * const flattened = z.flattenError(result.error!);
 */
/**
 * @copilot
 * @note
 *  => {
 *    formErrors: ['Unrecognized key: "extraKey"'],
 *    fieldErrors: {
 *      username: ['Invalid input: expected string, received number'],
 *      favoriteNumbers: ['Invalid input: expected number, received string'],
 *    },
 *  }
 *
 * flattened.fieldErrors.username; // => ['Invalid input: expected string, received number']
 * flattened.fieldErrors.favoriteNumbers; // => ['Invalid input: expected number, received string']
 */

/**
 * @function Using ValidationError outside zod
 * @description You can throw your own `ValidationError` outside of Zod. This is useful for custom
 * validation logic. Pass a custom message and, optionally, the original cause.
 * @example
 * import { ValidationError } from 'zod-validation-error';
 * import { Buffer } from 'node:buffer';
 *
 * function parseBuffer(buf: unknown): Buffer {
 *   if (!Buffer.isBuffer(buf)) {
 *     throw new ValidationError('Invalid argument; expected buffer');
 *   }
 *   return buf;
 * }
 *
 * @example
 * import { ValidationError } from 'zod-validation-error';
 *
 * try {
 *   @note do something that throws an error
 * } catch (err) {
 *   throw new ValidationError('Something went deeply wrong', { cause: err });
 * }
 */

/**
 * @function Combining ValidationError with custom error map
 * @description Zod supports customizing error messages by providing a custom error map. You can combine
 * this with `zod-validation-error` to produce user‑friendly messages. If all you need is to produce
 * user‑friendly error messages, you may set the `customError` property on Zod's configuration.
 * @example
 * import { z as zod } from 'zod';
 * import { createErrorMap } from 'zod-validation-error';
 *
 * zod.config({
 *   customError: createErrorMap({
 *     includePath: true,
 *   }),
 * });
 * @note zod-validation-error will respect the customError property when it is set; no further configuration is needed
 */

/**
 * @section Error customization (Zod)
 * 
/**
 * @section Include input in issues
 * @description By default, Zod does not include input values in issues to avoid leaking potentially sensitive
 * data. To include the input data for debugging purposes, use the `reportInput` flag when calling `.parse()`.
 * @example
 * z.string().parse(12, {
 *   reportInput: true,
 * });
 *  ZodError: [ { expected: 'string', code: 'invalid_type', input: 12, path: [], message: 'Invalid input: expected string, received number' } ]
 */

/**
 * @section Error precedence
 * @description When multiple error customizations have been defined, they take effect in the following order
 * from highest to lowest priority:
 * 1. Schema‑level error – any error message defined directly on a schema method call.
 * 2. Per‑parse error – a custom error map passed into `.parse()` or `.safeParse()`.
 * 3. Global error map – a custom error map passed into `z.config()`.
 * 4. Locale error map – a locale passed into `z.config()` via a locale function such as `z.locales.en()`.
 * This priority determines which error message is ultimately used when conflicts occur.
 */
