# Separating Events from Effects

## Overview

Event handlers only re-run when you perform the same interaction again. Unlike
event handlers, Effects re-synchronize if some value they read, like a prop or a
state variable, is different from what it was during the last render. Sometimes,
you also want a mix of both behaviors: an Effect that re-runs in response to
some values but not others.

## Learning Objectives

- How to choose between an event handler and an Effect
- Why Effects are reactive, and event handlers are not
- What to do when you want a part of your Effect's code to not be reactive
- What Effect Events are, and how to extract them from your Effects
- How to read the latest props and state from Effects using Effect Events

## Choosing Between Event Handlers and Effects

### Event Handlers Run in Response to Specific Interactions

From the user's perspective, sending a message should happen because the
particular "Send" button was clicked. The user will get rather upset if you send
their message at any other time or for any other reason. This is why sending a
message should be an event handler.

**Example:**

```tsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('')

  function handleSendClick() {
    sendMessage(message)
  }

  return (
    <>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </>
  )
}
```

With an event handler, you can be sure that `sendMessage(message)` will only run
if the user presses the button.

### Effects Run Whenever Synchronization is Needed

The reason to run this code is not some particular interaction. It doesn't
matter why or how the user navigated to the chat room screen. Now that they're
looking at it and could interact with it, the component needs to stay connected
to the selected chat server. Even if the chat room component was the initial
screen of your app, and the user has not performed any interactions at all, you
would still need to connect. This is why it's an Effect:

**Example:**

```tsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.connect()
    return () => {
      connection.disconnect()
    }
  }, [roomId])
}
```

With this code, you can be sure that there is always an active connection to the
currently selected chat server, regardless of the specific interactions
performed by the user.

### Complete Example: Chat Room Component

**App.js:**

```tsx
import { useState, useEffect } from 'react'
import { createConnection, sendMessage } from './chat.js'

const serverUrl = 'https://localhost:1234'

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.connect()
    return () => connection.disconnect()
  }, [roomId])

  function handleSendClick() {
    sendMessage(message)
  }

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </>
  )
}

export default function App() {
  const [roomId, setRoomId] = useState('general')
  const [show, setShow] = useState(false)

  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value='general'>general</option>
          <option value='travel'>travel</option>
          <option value='music'>music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  )
}
```

**chat.js:**

```javascript
export function sendMessage(message) {
  console.log('🔵 You sent: ' + message)
}

export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log(
        '✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...'
      )
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl)
    }
  }
}
```

## Reactive Values and Reactive Logic

### Understanding Reactive Values

Props, state, and variables declared inside your component's body are called
**reactive values**. In this example, `serverUrl` is not a reactive value, but
`roomId` and `message` are. They participate in the rendering data flow:

```tsx
const serverUrl = 'https://localhost:1234'

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('')
  // ...
}
```

Reactive values like these can change due to a re-render.

### How Event Handlers and Effects Respond to Changes

- **Logic inside event handlers is not reactive.** It will not run again unless
  the user performs the same interaction (e.g. a click) again. Event handlers
  can read reactive values without "reacting" to their changes.
- **Logic inside Effects is reactive.** If your Effect reads a reactive value,
  you have to specify it as a dependency. Then, if a re-render causes that value
  to change, React will re-run your Effect's logic with the new value.

### Logic Inside Event Handlers is Not Reactive

Take a look at this line of code:

```tsx
sendMessage(message)
```

From the user's perspective, a change to the `message` does not mean that they
want to send a message. It only means that the user is typing. In other words,
the logic that sends a message should not be reactive. It should not run again
only because the reactive value has changed. That's why it belongs in the event
handler:

```tsx
function handleSendClick() {
  sendMessage(message)
}
```

Event handlers aren't reactive, so `sendMessage(message)` will only run when the
user clicks the Send button.

### Logic Inside Effects is Reactive

From the user's perspective, a change to the `roomId` does mean that they want
to connect to a different room. In other words, the logic for connecting to the
room should be reactive. You want these lines of code to "keep up" with the
reactive value, and to run again if that value is different. That's why it
belongs in an Effect:

```tsx
useEffect(() => {
  const connection = createConnection(serverUrl, roomId)
  connection.connect()
  return () => {
    connection.disconnect()
  }
}, [roomId])
```

Effects are reactive, so `createConnection(serverUrl, roomId)` and
`connection.connect()` will run for every distinct value of `roomId`. Your
Effect keeps the chat connection synchronized to the currently selected room.

## Extracting Non-Reactive Logic Out of Effects

### The Problem: Mixing Reactive and Non-Reactive Logic

Things get more tricky when you want to mix reactive logic with non-reactive
logic.

For example, imagine that you want to show a notification when the user connects
to the chat. You read the current theme (dark or light) from the props so that
you can show the notification in the correct color:

```tsx
function ChatRoom({ roomId, theme }) {
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.on('connected', () => {
            showNotification('Connected!', theme);
        });
        connection.connect();
        // ...
```

However, `theme` is a reactive value (it can change as a result of
re-rendering), and every reactive value read by an Effect must be declared as
its dependency. Now you have to specify `theme` as a dependency of your Effect:

```tsx
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.on('connected', () => {
      showNotification('Connected!', theme)
    })
    connection.connect()
    return () => {
      connection.disconnect()
    }
  }, [roomId, theme]) // ✅ All dependencies declared
  // ...
}
```

### The User Experience Problem

**Example with problematic behavior:**

**App.js:**

```tsx
import { useState, useEffect } from 'react'
import { createConnection, sendMessage } from './chat.js'
import { showNotification } from './notifications.js'

const serverUrl = 'https://localhost:1234'

function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.on('connected', () => {
      showNotification('Connected!', theme)
    })
    connection.connect()
    return () => connection.disconnect()
  }, [roomId, theme])

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general')
  const [isDark, setIsDark] = useState(false)

  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value='general'>general</option>
          <option value='travel'>travel</option>
          <option value='music'>music</option>
        </select>
      </label>
      <label>
        <input
          type='checkbox'
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom roomId={roomId} theme={isDark ? 'dark' : 'light'} />
    </>
  )
}
```

**chat.js:**

```javascript
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback
  let timeout

  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback()
        }
      }, 100)
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.')
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.')
      }
      connectedCallback = callback
    },
    disconnect() {
      clearTimeout(timeout)
    }
  }
}
```

**notifications.js:**

```javascript
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export function showNotification(message, theme) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black'
    }
  }).showToast()
}
```

When the `roomId` changes, the chat re-connects as you would expect. But since
`theme` is also a dependency, the chat also re-connects every time you switch
between the dark and the light theme. That's not great!

In other words, you don't want this line to be reactive, even though it is
inside an Effect (which is reactive):

```tsx
showNotification('Connected!', theme)
```

You need a way to separate this non-reactive logic from the reactive Effect
around it.

## Declaring an Effect Event

### Using useEffectEvent Hook

Use a special Hook called `useEffectEvent` to extract this non-reactive logic
out of your Effect:

```tsx
import { useEffect, useEffectEvent } from 'react'

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme)
  })
  // ...
}
```

Here, `onConnected` is called an **Effect Event**. It's a part of your Effect
logic, but it behaves a lot more like an event handler. The logic inside it is
not reactive, and it always "sees" the latest values of your props and state.

### Calling Effect Events from Effects

Now you can call the `onConnected` Effect Event from inside your Effect:

```tsx
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme)
  })

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.on('connected', () => {
      onConnected()
    })
    connection.connect()
    return () => connection.disconnect()
  }, [roomId]) // ✅ All dependencies declared
  // ...
}
```

This solves the problem. Note that you had to remove `theme` from the list of
your Effect's dependencies, because it's no longer used in the Effect. You also
don't need to add `onConnected` to it, because Effect Events are not reactive
and must be omitted from dependencies.

### Complete Working Example

**App.js:**

```tsx
import { useState, useEffect } from 'react'
import { useEffectEvent } from 'react'
import { createConnection, sendMessage } from './chat.js'
import { showNotification } from './notifications.js'

const serverUrl = 'https://localhost:1234'

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme)
  })

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.on('connected', () => {
      onConnected()
    })
    connection.connect()
    return () => connection.disconnect()
  }, [roomId])

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general')
  const [isDark, setIsDark] = useState(false)

  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value='general'>general</option>
          <option value='travel'>travel</option>
          <option value='music'>music</option>
        </select>
      </label>
      <label>
        <input
          type='checkbox'
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom roomId={roomId} theme={isDark ? 'dark' : 'light'} />
    </>
  )
}
```

**chat.js:**

```javascript
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback
  let timeout

  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback()
        }
      }, 100)
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.')
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.')
      }
      connectedCallback = callback
    },
    disconnect() {
      clearTimeout(timeout)
    }
  }
}
```

You can think of Effect Events as being very similar to event handlers. The main
difference is that event handlers run in response to a user interactions,
whereas Effect Events are triggered by you from Effects. Effect Events let you
"break the chain" between the reactivity of Effects and code that should not be
reactive.

## Reading Latest Props and State with Effect Events

Effect Events let you fix many patterns where you might be tempted to suppress
the dependency linter.

### Example: Logging Page Visits

For example, say you have an Effect to log the page visits:

```tsx
function Page() {
  useEffect(() => {
    logVisit()
  }, [])
  // ...
}
```

Later, you add multiple routes to your site. Now your `Page` component receives
a `url` prop with the current path. You want to pass the `url` as a part of your
`logVisit` call, but the dependency linter complains:

```tsx
function Page({ url }) {
  useEffect(() => {
    logVisit(url)
  }, []) // 🔴 React Hook useEffect has a missing dependency: 'url'
  // ...
}
```

Think about what you want the code to do. You want to log a separate visit for
different URLs since each URL represents a different page. In other words, this
`logVisit` call should be reactive with respect to the `url`. This is why, in
this case, it makes sense to follow the dependency linter, and add `url` as a
dependency:

```tsx
function Page({ url }) {
  useEffect(() => {
    logVisit(url)
  }, [url]) // ✅ All dependencies declared
  // ...
}
```

### Adding Shopping Cart Context

Now let's say you want to include the number of items in the shopping cart
together with every page visit:

```tsx
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext)
  const numberOfItems = items.length

  useEffect(() => {
    logVisit(url, numberOfItems)
  }, [url]) // 🔴 React Hook useEffect has a missing dependency: 'numberOfItems'
  // ...
}
```

You used `numberOfItems` inside the Effect, so the linter asks you to add it as
a dependency. However, you don't want the `logVisit` call to be reactive with
respect to `numberOfItems`. If the user puts something into the shopping cart,
and the `numberOfItems` changes, this does not mean that the user visited the
page again. In other words, visiting the page is, in some sense, an "event". It
happens at a precise moment in time.

### Solution: Split the Code

Split the code in two parts:

```tsx
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext)
  const numberOfItems = items.length

  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems)
  })

  useEffect(() => {
    onVisit(url)
  }, [url]) // ✅ All dependencies declared
  // ...
}
```

Here, `onVisit` is an Effect Event. The code inside it isn't reactive. This is
why you can use `numberOfItems` (or any other reactive value!) without worrying
that it will cause the surrounding code to re-execute on changes.

On the other hand, the Effect itself remains reactive. Code inside the Effect
uses the `url` prop, so the Effect will re-run after every re-render with a
different `url`. This, in turn, will call the `onVisit` Effect Event.

As a result, you will call `logVisit` for every change to the `url`, and always
read the latest `numberOfItems`. However, if `numberOfItems` changes on its own,
this will not cause any of the code to re-run.

### Best Practice: Pass Arguments Explicitly

You might be wondering if you could call `onVisit()` with no arguments, and read
the `url` inside it:

```tsx
const onVisit = useEffectEvent(() => {
  logVisit(url, numberOfItems)
})

useEffect(() => {
  onVisit()
}, [url])
```

This would work, but it's better to pass this `url` to the Effect Event
explicitly. By passing `url` as an argument to your Effect Event, you are saying
that visiting a page with a different `url` constitutes a separate "event" from
the user's perspective. The `visitedUrl` is a part of the "event" that happened:

```tsx
const onVisit = useEffectEvent(visitedUrl => {
  logVisit(visitedUrl, numberOfItems)
})

useEffect(() => {
  onVisit(url)
}, [url])
```

Since your Effect Event explicitly "asks" for the `visitedUrl`, now you can't
accidentally remove `url` from the Effect's dependencies. If you remove the
`url` dependency (causing distinct page visits to be counted as one), the linter
will warn you about it. You want `onVisit` to be reactive with regards to the
`url`, so instead of reading the `url` inside (where it wouldn't be reactive),
you pass it from your Effect.

### Importance with Asynchronous Logic

This becomes especially important if there is some asynchronous logic inside the
Effect:

```tsx
const onVisit = useEffectEvent(visitedUrl => {
  logVisit(visitedUrl, numberOfItems)
})

useEffect(() => {
  setTimeout(() => {
    onVisit(url)
  }, 5000) // Delay logging visits
}, [url])
```

Here, `url` inside `onVisit` corresponds to the latest `url` (which could have
already changed), but `visitedUrl` corresponds to the `url` that originally
caused this Effect (and this `onVisit` call) to run.

## Deep Dive: Dependency Linter Suppression

### Is it Okay to Suppress the Dependency Linter?

In the existing codebases, you may sometimes see the lint rule suppressed like
this:

```tsx
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext)
  const numberOfItems = items.length

  useEffect(() => {
    logVisit(url, numberOfItems)
    // 🔴 Avoid suppressing the linter like this:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])
  // ...
}
```

**We recommend never suppressing the linter.**

### Downsides of Suppressing the Linter

The first downside of suppressing the rule is that React will no longer warn you
when your Effect needs to "react" to a new reactive dependency you've introduced
to your code. In the earlier example, you added `url` to the dependencies
because React reminded you to do it. You will no longer get such reminders for
any future edits to that Effect if you disable the linter. This leads to bugs.

### Example Bug: Stale Values

Here is an example of a confusing bug caused by suppressing the linter. In this
example, the `handleMove` function is supposed to read the current `canMove`
state variable value in order to decide whether the dot should follow the
cursor. However, `canMove` is always `true` inside `handleMove`.

**App.js:**

```tsx
import { useState, useEffect } from 'react'

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [canMove, setCanMove] = useState(true)

  function handleMove(e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY })
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <label>
        <input
          type='checkbox'
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)}
        />
        The dot is allowed to move
      </label>
      <hr />
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'pink',
          borderRadius: '50%',
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40
        }}
      />
    </>
  )
}
```

The problem with this code is in suppressing the dependency linter. If you
remove the suppression, you'll see that this Effect should depend on the
`handleMove` function. This makes sense: `handleMove` is declared inside the
component body, which makes it a reactive value. Every reactive value must be
specified as a dependency, or it can potentially get stale over time!

The author of the original code has "lied" to React by saying that the Effect
does not depend (`[]`) on any reactive values. This is why React did not
re-synchronize the Effect after `canMove` has changed (and `handleMove` with
it). Because React did not re-synchronize the Effect, the `handleMove` attached
as a listener is the `handleMove` function created during the initial render.
During the initial render, `canMove` was `true`, which is why `handleMove` from
the initial render will forever see that value.

If you never suppress the linter, you will never see problems with stale values.

### Solution: Using useEffectEvent

With `useEffectEvent`, there is no need to "lie" to the linter, and the code
works as you would expect:

```tsx
import { useState, useEffect } from 'react'
import { useEffectEvent } from 'react'

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [canMove, setCanMove] = useState(true)

  const onMove = useEffectEvent(e => {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY })
    }
  })

  useEffect(() => {
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <>
      <label>
        <input
          type='checkbox'
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)}
        />
        The dot is allowed to move
      </label>
      <hr />
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'pink',
          borderRadius: '50%',
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40
        }}
      />
    </>
  )
}
```

This doesn't mean that `useEffectEvent` is always the correct solution. You
should only apply it to the lines of code that you don't want to be reactive. In
the above sandbox, you didn't want the Effect's code to be reactive with regards
to `canMove`. That's why it made sense to extract an Effect Event.

Read [Removing Effect Dependencies](#) for other correct alternatives to
suppressing the linter.

## Limitations of Effect Events

Effect Events are very limited in how you can use them:

### Rule 1: Only Call from Inside Effects

Only call them from inside Effects.

### Rule 2: Never Pass to Other Components or Hooks

Never pass them to other components or Hooks.

**Example of incorrect usage:**

```tsx
function Timer() {
  const [count, setCount] = useState(0)

  const onTick = useEffectEvent(() => {
    setCount(count + 1)
  })

  useTimer(onTick, 1000) // 🔴 Avoid: Passing Effect Events

  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  useEffect(() => {
    const id = setInterval(() => {
      callback()
    }, delay)
    return () => {
      clearInterval(id)
    }
  }, [delay, callback]) // Need to specify "callback" in dependencies
}
```

**Correct approach:**

Instead, always declare Effect Events directly next to the Effects that use
them:

```tsx
function Timer() {
  const [count, setCount] = useState(0)

  useTimer(() => {
    setCount(count + 1)
  }, 1000)

  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  const onTick = useEffectEvent(() => {
    callback()
  })

  useEffect(() => {
    const id = setInterval(() => {
      onTick() // ✅ Good: Only called locally inside an Effect
    }, delay)
    return () => {
      clearInterval(id)
    }
  }, [delay]) // No need to specify "onTick" (an Effect Event) as a dependency
}
```

Effect Events are non-reactive "pieces" of your Effect code. They should be next
to the Effect using them.
