# 'use server'

## React Server Components

**'use server'** is for use with React Server Components.

- `'use server'` marks server-side functions that can be called from client-side
  code.

---

## Reference

- `'use server'`
- Security considerations
- Serializable arguments and return values
- Usage
  - Server Functions in forms
  - Calling a Server Function outside of `<form>`

---

## Usage

### Marking Server Functions

Add `'use server'` at the top of an async function body to mark the function as
callable by the client. These functions are called **Server Functions**.

```js
async function addToCart(data) {
  'use server'
  // ...
}
```

When calling a Server Function on the client, it will make a network request to
the server that includes a serialized copy of any arguments passed. If the
Server Function returns a value, that value will be serialized and returned to
the client.

Instead of individually marking functions with `'use server'`, you can add the
directive to the top of a file to mark all exports within that file as Server
Functions that can be used anywhere, including imported in client code.

---

## Caveats

- `'use server'` must be at the very beginning of their function or module;
  above any other code including imports (comments above directives are OK).
- Must be written with single or double quotes, not backticks.
- Can only be used in server-side files.
- The resulting Server Functions can be passed to Client Components through
  props. See supported types for serialization.
- To import a Server Function from client code, the directive must be used on a
  module level.
- Because the underlying network calls are always asynchronous, `'use server'`
  can only be used on async functions.
- Always treat arguments to Server Functions as untrusted input and authorize
  any mutations. See security considerations.
- Server Functions should be called in a Transition. Server Functions passed to
  `<form action>` or `formAction` will automatically be called in a transition.
- Server Functions are designed for mutations that update server-side state;
  they are not recommended for data fetching. Frameworks implementing Server
  Functions typically process one action at a time and do not have a way to
  cache the return value.

---

## Security Considerations

Arguments to Server Functions are fully client-controlled. For security, always
treat them as untrusted input, and make sure to validate and escape arguments as
appropriate.

In any Server Function, make sure to validate that the logged-in user is allowed
to perform that action.

**Under Construction:**  
To prevent sending sensitive data from a Server Function, there are experimental
taint APIs to prevent unique values and objects from being passed to client
code.

See `experimental_taintUniqueValue` and `experimental_taintObjectReference`.

---

## Serializable Arguments and Return Values

Since client code calls the Server Function over the network, any arguments
passed will need to be serializable.

### Supported Types for Server Function Arguments

- **Primitives:**
  - `string`
  - `number`
  - `bigint`
  - `boolean`
  - `undefined`
  - `null`
  - `symbol` (only symbols registered in the global Symbol registry via
    `Symbol.for`)
- **Iterables containing serializable values:**
  - `String`
  - `Array`
  - `Map`
  - `Set`
  - `TypedArray` and `ArrayBuffer`
  - `Date`
  - `FormData` instances
- **Plain objects:**
  - Those created with object initializers, with serializable properties
- **Functions that are Server Functions**
- **Promises**

**Not Supported:**

- React elements, or JSX
- Functions, including component functions or any other function that is not a
  Server Function
- Classes
- Objects that are instances of any class (other than the built-ins mentioned)
  or objects with a null prototype
- Symbols not registered globally, ex. `Symbol('my new symbol')`
- Events from event handlers

Supported serializable return values are the same as serializable props for a
boundary Client Component.

---

## Usage Examples

### Server Functions in Forms

The most common use case of Server Functions will be calling functions that
mutate data. On the browser, the HTML form element is the traditional approach
for a user to submit a mutation. With React Server Components, React introduces
first-class support for Server Functions as Actions in forms.

#### Example: Request Username

```js
// App.js

async function requestUsername(formData) {
  'use server'
  const username = formData.get('username')
  // ...
}

export default function App() {
  return (
    <form action={requestUsername}>
      <input type='text' name='username' />
      <button type='submit'>Request</button>
    </form>
  )
}
```

In this example, `requestUsername` is a Server Function passed to a `<form>`.
When a user submits this form, there is a network request to the server function
`requestUsername`. When calling a Server Function in a form, React will supply
the form’s `FormData` as the first argument to the Server Function.

By passing a Server Function to the form action, React can progressively enhance
the form. This means that forms can be submitted before the JavaScript bundle is
loaded.

---

### Handling Return Values in Forms

In the username request form, there might be the chance that a username is not
available. `requestUsername` should tell us if it fails or not.

To update the UI based on the result of a Server Function while supporting
progressive enhancement, use `useActionState`.

```js
// requestUsername.js
'use server'

export default async function requestUsername(formData) {
  const username = formData.get('username')
  if (canRequest(username)) {
    // ...
    return 'successful'
  }
  return 'failed'
}

// UsernameForm.js
;('use client')

import { useActionState } from 'react'
import requestUsername from './requestUsername'

function UsernameForm() {
  const [state, action] = useActionState(requestUsername, null, 'n/a')

  return (
    <>
      <form action={action}>
        <input type='text' name='username' />
        <button type='submit'>Request</button>
      </form>
      <p>Last submission request returned: {state}</p>
    </>
  )
}
```

Note: Like most Hooks, `useActionState` can only be called in client code.

---

### Calling a Server Function Outside of `<form>`

Server Functions are exposed server endpoints and can be called anywhere in
client code.

When using a Server Function outside a form, call the Server Function in a
Transition, which allows you to display a loading indicator, show optimistic
state updates, and handle unexpected errors. Forms will automatically wrap
Server Functions in transitions.

```js
import incrementLike from './actions'
import { useState, useTransition } from 'react'

function LikeButton() {
  const [isPending, startTransition] = useTransition()
  const [likeCount, setLikeCount] = useState(0)

  const onClick = () => {
    startTransition(async () => {
      const currentCount = await incrementLike()
      setLikeCount(currentCount)
    })
  }

  return (
    <>
      <p>Total Likes: {likeCount}</p>
      <button onClick={onClick} disabled={isPending}>
        Like
      </button>
    </>
  )
}

// actions.js
;('use server')

let likeCount = 0
export default async function incrementLike() {
  likeCount++
  return likeCount
}
```

To read a Server Function return value, you’ll need to await the promise
returned.
