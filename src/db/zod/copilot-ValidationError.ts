//Path: src/lib/errors/ValidationError.ts
// 'ZodIssue' is deprecated, DONT USE IT!
//  Use z.core.$ZodIssue from @zod/core instead
import * as zod from 'zod/v4/core'
import { ValidationError } from 'zod-validation-error'
/**
 * @copilot
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
 * @copilot
 * @class ValidationError
 * @classdesc Main ValidationError class, extending JavaScript's native Error.
 * @extends Error
 * @arguments
 * - message: string - The error message.
 * - options: ErrorOptions; error options as per JavaScript definition (optional).
 * - options.cause - any; can be used to hold the original zod error (optional)
 * @example construct new ValidationError with message
   import { ValidationError } from 'zod-validation-error';
   const error = new ValidationError('foobar');
   console.log(error instanceof Error); // prints true
 * 
 * @example construct new ValidationError with message and options.cause
    import { z as zod } from 'zod';
    import { ValidationError } from 'zod-validation-error';

    const error = new ValidationError('foobar', {
    cause: new zod.ZodError([
    {
      origin: 'number',
      code: 'too_small',
      minimum: 0,
      inclusive: false,
      path: ['id'],
      message: 'Number must be greater than 0 at "id"',
      input: -1,
    },
  ]),
});
console.log(error.details); // prints issues from zod error
 */
/**
 * @copilot this is how ValidationError is defined in the zod-validation-error package. Type '"MyValidationError"' is not assignable to type '"ZodValidationError"'
 * @class ValidationError
 * declare class ValidationError extends Error {
     name: typeof ZOD_VALIDATION_ERROR_NAME;
     details: Array<zod.$ZodIssue>;
     constructor(message?: string, options?: ErrorOptions);
     toString(): string;
 }
 */