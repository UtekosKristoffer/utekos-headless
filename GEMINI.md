# Gemini Assistant Instructions

## Architecture

### Framework

- **Next.js**: 16.1.0
- **React**: 19.2

## TypeScript

Always ensure to follow `exactOptionalPropertyTypes: true` and
`noUncheckedIndexedAccess: true` when writing code.

## Project Rules

> **Never write code suggestions based on an assumption.**

1. Never edit any files without asking or having permission
2. Never use comments when writing code in my codebase
3. Remove all comments you see in files inside `src/` - except line 1, where
   `// Path: {filename}` is mentioned
4. The first line in every file inside `src/` or `/Users/Hjelmeland/my-app/src`
   shall have `// Path: {filename}` on the first line
5. Never edit any files outside `src/` or `/Users/Hjelmeland/my-app/src`
6. You are allowed to READ inside `/Users/Hjelmeland/my-app/docs`
7. **One function per file.** Code splitting shall be practiced to the highest
   degree. Rule of thumb #1 is that each function or constant should live in its
   own file, not defining multiple in the same file when it's not necessary.

## Code Rules

1. Functions and modules should be designed for reusability, avoiding
   duplication of code
2. Always evaluate if the code could be written better and if it adheres to
   updated framework and documentation
3. Always ensure to follow `exactOptionalPropertyTypes: true` and
   `noUncheckedIndexedAccess: true` when writing code
4. Visit `/Users/Hjelmeland/my-app/types/` or `/types` to find TypeScript types
   that you need to use

## Tasks | Inside `src/` and `/Users/Hjelmeland/my-app/src`

1. Always look for functions, constants, components or files that are not being
   used - then send a list with these findings - do not adjust before
   permission. Not only upon request, but always.
2. Always look for functions, constants, components or files that can be written
   or defined in a more performance-optimized way. Upon finding this, an
   explanation of why and a solution proposal shall be sent - do not adjust
   without permission.
3. `.gemini/docs/` or `/Users/Hjelmeland/my-app/.gemini` contains a selected
   collection of documentation. This documentation is meant for you to use in
   connection with evaluating if any existing code in the project's files could
   benefit from following this better, and generally in your work when you
   evaluate the code I ask you to provide solution proposals for.
4. `docs/` or `/Users/Hjelmeland/my-app/docs` also contains a very large amount
   of documentation that you are encouraged to use actively.
5. Always look for files that contain functions, types and constants which, with
   respect to project rule number 7, can be defined/placed in a separate and
   dedicated file. Then give me a list of the files this occurs in, and which
   functions or constants it concerns.

## File Locations

### Types

- Most types are defined in the folder `/Users/Hjelmeland/my-app/types` or
  `/types`

### Configuration Files

- **`/Users/Hjelmeland/my-app/tsconfig.json`** or **`tsconfig.json`**: To ensure
  that you follow the TypeScript rules in the project, visit this file to become
  familiar with these
- **`/Users/Hjelmeland/my-app/package.json`** or **`package.json`**: To see
  which packages are installed in the project, and their versions
- **`/Users/Hjelmeland/my-app/next.config.ts`** or **`next.config.ts`**: See
  this file for which rules are set up here

### Important Application Files

- **`/Users/Hjelmeland/my-app/src/proxy.ts`** or **`src/proxy.ts`**: A file that
  represents important logic in connection with tracking. This represents what
  had the title `middleware.ts` before Next.js 16 - i.e. in Next.js 15 and
  earlier versions
- **`route.ts` files in `/Users/Hjelmeland/my-app/src/app/api`** or
  **`src/app/api`**: Important in connection with tracking and other API-related
  logic
