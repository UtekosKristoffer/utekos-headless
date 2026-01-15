# COPILOT INSTRUCTIONS

These comments are meant to guide GitHub Copilot in generating code that adheres to specific requirements or standards. They provide context about the desired functionality, coding style, and any particular libraries or frameworks that should be used. The comments also indicate which parts of the code should be ignored by Copilot to avoid generating unwanted or deprecated patterns.

## The JS Doc Usage Of @copilot tag at the top of files

- The `@copilot` tag is used to signal that the comments in the file are intended to guide Copilot's code generation.
- This does not mean that files or sections without this tag should be ignored by Copilot, but rather that these comments are specifically for Copilot's benefit.

## Frameworks and Libraries

- The codebase uses Next.js 16 with the App Router, and React 19 with Server Actions as a core feature.

## Coding Standards

- Follow best practices for TypeScript, aim for world-class.

## Architecture

- The codebase practices Functional Programming as a paradigm.
- The codebase follows a modular architecture, separating concerns into different files and functions.

### Pure Functions

- Functions should be pure wherever possible, meaning they do not cause side effects and always produce the same output for the same input.

### Declarative Style

- The code should be written in a declarative style, focusing on what to do rather than how to do it.

### Immutability

- Data structures should be treated as immutable, avoiding direct mutations.

### Error Handling

- Utilize Zod for schema validation and error handling.
- Use `zod-validation-error` for formatting and handling validation errors.
- Use structured error handling with custom error classes where appropriate.

### Reusability

- Functions and modules should be designed for reusability, avoiding duplication of code.

## Functions

- Main rules for functions:
  - Functions should do one thing and do it well.
  - The statements in our function are all at the same level of abstraction.
  - Functions should be small and focused, ideally fitting within a single screen without scrolling.
  - Functions should have descriptive names that clearly indicate their purpose.
  - Functions should avoid side effects, especially when they are expected to be pure.
  - Functions should have a single level of abstraction, meaning they should not mix high-level logic with low-level details.
  - Error handling is one thing, and the main logic of the function is another.
  - Functions should be organized in a way that allows for easy reading from top to bottom, following the "Stepdown Rule".

## Names

- Use clear and descriptive names for variables, functions, and classes.
- The name of a variable, function, or class should answer all the big questions: why does it exist, what does it do, and how is it used? If a name requires a comment, it doesn't reveal its intent well enough.
- Be consistent in your names. Use the same phrases, nouns, and verbs in the function names you choose for your modules. For example, consider the names includeSetupAndTeardownPages, includeSetupPages, includeSuiteSetupPage, and includeSetupPage. The similar wording in these names allows the sequence to tell a story.
- Don't be afraid to make a long name. A long, descriptive name is better than a short, cryptic name. A long, descriptive name is better than a long, descriptive comment
- Never use names that have established meaning in another context.
- Choose one word for one abstract concept and stick to it. For example, it is confusing to have `fetch`, `retrieve`, and `get` as equivalent methods in different classes. How do you remember which method name belongs to which class? Unfortunately, you often have to remember which company, group, or individual wrote the library or class in order to remember which term was used.
- The function names must stand on their own feet, and they must be consistent so that you can choose the right method without further exploration.
