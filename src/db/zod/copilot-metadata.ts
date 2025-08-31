/**
 * @copilot
 */

/**
 * @fileoverview This file documents Zod's metadata and registry utilities, following the style used to
 * teach @copilot about APIs and patterns. It summarizes the API and usage for registries, metadata,
 * `.register()`, `.meta()`, `.describe()`, and custom registry patterns. Examples are reproduced from
 * the official Zod documentation.
 */

/**
 * @section Registries
 * @description Metadata in Zod is handled via registries. A registry is a collection of schemas, each
 * associated with strongly typed metadata. You can create a registry by calling `z.registry()` with a
 * generic specifying the metadata type. Schemas can be added, queried, and removed from a registry.
 * TypeScript enforces that the metadata provided matches the registry's metadata type. Registries treat
 * the `id` property specially—an error will be thrown if multiple schemas are registered with the same
 * `id` value. This applies to all registries, including the global registry.
 * @example
 * import * as z from 'zod';
 *
 * @note create a registry with metadata { description: string }
 * const myRegistry = z.registry<{ description: string }>();
 *
 * @note create a schema
 * const mySchema = z.string();
 *
 * @note add, check, retrieve, remove and clear metadata
 * myRegistry.add(mySchema, { description: 'A cool schema!' });
 * myRegistry.has(mySchema); // => true
 * myRegistry.get(mySchema); // => { description: 'A cool schema!' }
 * myRegistry.remove(mySchema);
 * myRegistry.clear();
 *
 * @note TypeScript type enforcement
 * myRegistry.add(mySchema, { description: 'A cool schema!' }); // ✅
 * @note myRegistry.add(mySchema, { description: 123 }); // ❌ compile‑time error
 */

/**
 * @function register
 * @description Schemas have a `.register()` method that conveniently adds the schema to a registry.
 * Unlike most Zod methods, `.register()` returns the original schema instead of a new schema instance.
 * This enables inline registration of nested properties. If you register the same schema multiple times
 * with different metadata, the later metadata will overwrite the previous entry. Because registries
 * enforce unique `id` values, attempting to register two schemas with the same `id` will throw an error.
 * @example
 * import * as z from 'zod';
 *
 * const myRegistry = z.registry<{ description: string }>();
 *
 * @note register a schema
 * const mySchema = z.string().register(myRegistry, { description: 'A cool schema!' });
 * @note => returns the original schema instance
 *
 * @note inline registration within an object schema
 * const userSchema = z.object({
 *   name: z.string().register(myRegistry, { description: "The user's name" }),
 *   age: z.number().register(myRegistry, { description: "The user's age" }),
 * });
 */

/**
 * @section Generic registries
 * @description If a registry is defined without a metadata type, it acts as a generic collection of
 * schemas. No metadata is required when adding schemas.
 * @example
 * import * as z from 'zod';
 *
 * const myRegistry = z.registry();
 *
 * @note add schemas without metadata
 * myRegistry.add(z.string());
 * myRegistry.add(z.number());
 */

/**
 * @section Metadata
 * @description Zod provides a global registry (`z.globalRegistry`) for storing metadata used in JSON
 * Schema generation and other purposes. The `GlobalMeta` interface defines the allowed fields (id,
 * title, description, deprecated, and arbitrary additional properties). To register metadata in the
 * global registry, call `.register()` on a schema with `z.globalRegistry` and a metadata object. You
 * can augment the `GlobalMeta` interface using TypeScript declaration merging to add custom fields.
 * @example
 * import * as z from 'zod';
 *
 * @note register metadata for an email schema in the global registry
 * const emailSchema = z.email().register(z.globalRegistry, {
 *   id: 'email_address',
 *   title: 'Email address',
 *   description: 'Your email address',
 *   examples: ['first.last@example.com'],
 * });
 *
 * @note augment GlobalMeta with custom fields
 * declare module 'zod' {
 *   interface GlobalMeta {
 *     examples?: unknown[];
 *   }
 * }
 */

/**
 * @function meta
 * @description The `.meta()` method registers a schema in `z.globalRegistry` with the given metadata and
 * returns a new schema instance. Calling `.meta()` without arguments retrieves the metadata associated
 * with that schema instance. Because Zod methods are immutable, metadata is tied to a specific schema
 * instance; creating a derived schema (e.g. via `.refine()`) will not inherit the metadata.
 * @example
 * import * as z from 'zod';
 *
 * @note register metadata using .meta()
 * const emailSchema = z.email().meta({
 *   id: 'email_address',
 *   title: 'Email address',
 *   description: 'Please enter a valid email address',
 * });
 *
 * @note retrieve metadata
 * emailSchema.meta(); // => { id: 'email_address', title: 'Email address', description: 'Please enter a valid email address' }
 *
 * @note metadata is bound to a specific schema instance
 * const A = z.string().meta({ description: 'A cool string' });
 * A.meta(); // returns the metadata object
 * const B = A.refine(() => true);
 * B.meta(); // => undefined (metadata is not propagated to derived schemas)
 */

/**
 * @function describe
 * @description The `.describe()` method is a shorthand for registering a schema in the global registry
 * with only a `description` field. It exists for compatibility with Zod 3, but `.meta()` is preferred
 * in Zod 4. It returns a new schema instance with the description stored in `z.globalRegistry`.
 * @example
 * import * as z from 'zod';
 *
 * const emailSchema = z.email();
 *
 * @note attach a description
 * emailSchema.describe('An email address');
 *
 * @note equivalent to
 * emailSchema.meta({ description: 'An email address' });
 */

/**
 * @section Custom registries
 * @description You can define custom metadata types and reference the inferred input or output type of a
 * schema using the special symbols `z.$input` and `z.$output`. Use these to create registries that
 * include examples or other type‑aware metadata. Additionally, you can constrain a registry to accept
 * only certain schema types by specifying a second generic parameter.
 * @example
 * import * as z from 'zod';
 *
 * @note reference the inferred output type using z.$output
 * type MyMeta = { examples: z.$output[] };
 * const myRegistry = z.registry<MyMeta>();
 * myRegistry.add(z.string(), { examples: ['hello', 'world'] });
 * myRegistry.add(z.number(), { examples: [1, 2, 3] });
 * @copilot z.$output refers to the inferred output type of the schema (same as z.infer<typeof schema>).
 * @copilot z.$input similarly refers to the input type.
 *
 * @copilot constrain a registry to accept only string schemas
 * const stringRegistry = z.registry<{ description: string }, z.ZodString>();
 * stringRegistry.add(z.string(), { description: 'A number' }); // ✅
 * @copilot stringRegistry.add(z.number(), { description: 'A number' }); // ❌ TypeScript error: ZodNumber not assignable to ZodString
 */
