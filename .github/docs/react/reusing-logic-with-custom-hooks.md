# Reusing Logic with Custom Hooks

---

## Overview

React comes with several built-in Hooks like `useState`, `useContext`, and
`useEffect`. Sometimes, you’ll wish that there was a Hook for some more specific
purpose: for example, to fetch data, to keep track of whether the user is
online, or to connect to a chat room. You might not find these Hooks in React,
but you can create your own Hooks for your application’s needs.

---

## You will learn

- What custom Hooks are, and how to write your own
- How to reuse logic between components
- How to name and structure your custom Hooks
- When and why to extract custom Hooks

---

## Custom Hooks: Sharing logic between components

Imagine you’re developing an app that heavily relies on the network (as most
apps do). You want to warn the user if their network connection has accidentally
gone off while they were using your app. How would you go about it? It seems
like you’ll need two things in your component:

1. A piece of state that tracks whether the network is online.
2. An Effect that subscribes to the global online and offline events, and
   updates that state.

This will keep your component synchronized with the network status. You might
start with something like this:

```jsx
// App.js
import { useState, useEffect } from 'react'

export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
}
```

Try turning your network on and off, and notice how this StatusBar updates in
response to your actions.

---

## Reusing Logic in Multiple Components

Now imagine you also want to use the same logic in a different component. You
want to implement a Save button that will become disabled and show
“Reconnecting…” instead of “Save” while the network is off.

```jsx
import { useState, useEffect } from 'react'

export default function SaveButton() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  function handleSaveClick() {
    console.log('✅ Progress saved')
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  )
}
```

Verify that, if you turn off the network, the button will change its appearance.

---

## Extracting your own custom Hook from a component

Imagine for a moment that, similar to `useState` and `useEffect`, there was a
built-in `useOnlineStatus` Hook. Then both of these components could be
simplified and you could remove the duplication between them:

```jsx
function StatusBar() {
  const isOnline = useOnlineStatus()
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
}

function SaveButton() {
  const isOnline = useOnlineStatus()

  function handleSaveClick() {
    console.log('✅ Progress saved')
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  )
}
```

Although there is no such built-in Hook, you can write it yourself. Declare a
function called `useOnlineStatus` and move all the duplicated code into it from
the components you wrote earlier:

```jsx
// app.js
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  return isOnline
}
```

At the end of the function, return `isOnline`. This lets your components read
that value:

```jsx
import { useOnlineStatus } from './useOnlineStatus.js'

function StatusBar() {
  const isOnline = useOnlineStatus()
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
}

function SaveButton() {
  const isOnline = useOnlineStatus()

  function handleSaveClick() {
    console.log('✅ Progress saved')
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  )
}
```

---

## Custom Hooks: Implementation Example

**useOnlineStatus.js**

```jsx
import { useState, useEffect } from 'react'

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  return isOnline
}
```

**App.js**

```jsx
import { useOnlineStatus } from './useOnlineStatus.js'

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  )
}
```

---

## Hook names always start with use

React applications are built from components. Components are built from Hooks,
whether built-in or custom. You’ll likely often use custom Hooks created by
others, but occasionally you might write one yourself!

You must follow these naming conventions:

- React component names must start with a capital letter, like `StatusBar` and
  `SaveButton`. React components also need to return something that React knows
  how to display, like a piece of JSX.
- Hook names must start with `use` followed by a capital letter, like `useState`
  (built-in) or `useOnlineStatus` (custom, like earlier on the page). Hooks may
  return arbitrary values.

This convention guarantees that you can always look at a component and know
where its state, Effects, and other React features might “hide”.

---

## Deep Dive: Should all functions called during rendering start with the use prefix?

No. Functions that don’t call Hooks don’t need to be Hooks.

If your function doesn’t call any Hooks, avoid the use prefix. Instead, write it
as a regular function without the use prefix. For example, `useSorted` below
doesn’t call Hooks, so call it `getSorted` instead:

```jsx
// 🔴 Avoid: A Hook that doesn't use Hooks
function useSorted(items) {
  return items.slice().sort()
}

// ✅ Good: A regular function that doesn't use Hooks
function getSorted(items) {
  return items.slice().sort()
}
```

You should give `use` prefix to a function (and thus make it a Hook) if it uses
at least one Hook inside of it:

```jsx
// ✅ Good: A Hook that uses other Hooks
function useAuth() {
  return useContext(Auth)
}
```

---

## Custom Hooks let you share stateful logic, not state itself

In the earlier example, when you turned the network on and off, both components
updated together. However, it’s wrong to think that a single `isOnline` state
variable is shared between them.

Each call to a Hook is completely independent from every other call to the same
Hook.

---

## Passing reactive values between Hooks

The code inside your custom Hooks will re-run during every re-render of your
component. This is why, like components, custom Hooks need to be pure. Think of
custom Hooks’ code as part of your component’s body!

---

## Passing event handlers to custom Hooks

As you start using `useChatRoom` in more components, you might want to let
components customize its behavior. For example, currently, the logic for what to
do when a message arrives is hardcoded inside the Hook.

To make this work, change your custom Hook to take `onReceiveMessage` as one of
its named options:

```jsx
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    }
    const connection = createConnection(options)
    connection.connect()
    connection.on('message', msg => {
      onReceiveMessage(msg)
    })
    return () => connection.disconnect()
  }, [roomId, serverUrl, onReceiveMessage])
}
```

Wrap this event handler into an Effect Event to remove it from the dependencies:

```jsx
import { useEffect, useEffectEvent } from 'react'

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  const onMessage = useEffectEvent(onReceiveMessage)

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    }
    const connection = createConnection(options)
    connection.connect()
    connection.on('message', msg => {
      onMessage(msg)
    })
    return () => connection.disconnect()
  }, [roomId, serverUrl])
}
```

---

## When to use custom Hooks

You don’t need to extract a custom Hook for every little duplicated bit of code.
Some duplication is fine. For example, extracting a `useFormInput` Hook to wrap
a single `useState` call like earlier is probably unnecessary.

However, whenever you write an Effect, consider whether it would be clearer to
also wrap it in a custom Hook.

---

## Deep Dive: Keep your custom Hooks focused on concrete high-level use cases

Start by choosing your custom Hook’s name. If you struggle to pick a clear name,
it might mean that your Effect is too coupled to the rest of your component’s
logic, and is not yet ready to be extracted.

Ideally, your custom Hook’s name should be clear enough that even a person who
doesn’t write code often could have a good guess about what your custom Hook
does, what it takes, and what it returns:

- ✅ `useData(url)`
- ✅ `useImpressionLog(eventName, extraData)`
- ✅ `useChatRoom(options)`

Avoid creating and using custom “lifecycle” Hooks that act as alternatives and
convenience wrappers for the `useEffect` API itself:

- 🔴 `useMount(fn)`
- 🔴 `useEffectOnce(fn)`
- 🔴 `useUpdateEffect(fn)`

---

## Custom Hooks help you migrate to better patterns

Effects are an “escape hatch”: you use them when you need to “step outside
React” and when there is no better built-in solution for your use case. With
time, the React team’s goal is to reduce the number of the Effects in your app
to the minimum by providing more specific solutions to more specific problems.
Wrapping your Effects in custom Hooks makes it easier to upgrade your code when
these solutions become available.

---

## Recap

- Custom Hooks let you share logic between components.
- Custom Hooks must be named starting with `use` followed by a capital letter.
- Custom Hooks only share stateful logic, not state itself.
- You can pass reactive values from one Hook to another, and they stay
  up-to-date.
- All Hooks re-run every time your component re-renders.
- The code of your custom Hooks should be pure, like your component’s code.
- Wrap event handlers received by custom Hooks into Effect Events.
- Don’t create custom Hooks like `useMount`. Keep their purpose specific.
- It’s up to you how and where to choose the boundaries of your code.

---
