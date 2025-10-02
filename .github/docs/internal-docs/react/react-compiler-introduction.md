# Introduction

React Compiler is a new build-time tool that automatically optimizes your React
app. It works with plain JavaScript, and understands the Rules of React, so you
don’t need to rewrite any code to use it.

---

## You will learn

- What React Compiler does
- Getting started with the compiler
- Incremental adoption strategies
- Debugging and troubleshooting when things go wrong
- Using the compiler on your React library

---

> **Note**  
> React Compiler is currently in Release Candidate (RC). We now recommend
> everyone to try the compiler and provide feedback. The latest RC release can
> be found with the `@rc` tag.

---

## What does React Compiler do?

React Compiler automatically optimizes your React application at build time.
React is often fast enough without optimization, but sometimes you need to
manually memoize components and values to keep your app responsive. This manual
memoization is tedious, easy to get wrong, and adds extra code to maintain.
React Compiler does this optimization automatically for you, freeing you from
this mental burden so you can focus on building features.

---

### Before React Compiler

Without the compiler, you need to manually memoize components and values to
optimize re-renders:

```javascript
import { useMemo, useCallback, memo } from 'react'

const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data)
  }, [data])

  const handleClick = useCallback(
    item => {
      onClick(item.id)
    },
    [onClick]
  )

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  )
})
```

> **Note**  
> This manual memoization has a subtle bug that breaks memoization:
>
> ```jsx
> <Item key={item.id} onClick={() => handleClick(item)} />
> ```
>
> Even though `handleClick` is wrapped in `useCallback`, the arrow function
> `() => handleClick(item)` creates a new function every time the component
> renders. This means that `Item` will always receive a new `onClick` prop,
> breaking memoization.

React Compiler is able to optimize this correctly with or without the arrow
function, ensuring that `Item` only re-renders when `props.onClick` changes.

---

### After React Compiler

With React Compiler, you write the same code without manual memoization:

```javascript
function ExpensiveComponent({ data, onClick }) {
  const processedData = expensiveProcessing(data)

  const handleClick = item => {
    onClick(item.id)
  }

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  )
}
```

See this example in the React Compiler Playground.

React Compiler automatically applies the optimal memoization, ensuring your app
only re-renders when necessary.

---

## Deep Dive

### What kind of memoization does React Compiler add?

<details>
<summary>Hide Details</summary>

React Compiler’s automatic memoization is primarily focused on improving update
performance (re-rendering existing components), so it focuses on these two use
cases:

- **Skipping cascading re-rendering of components**  
   Re-rendering `<Parent />` causes many components in its component tree to
  re-render, even though only `<Parent />` has changed.

- **Skipping expensive calculations from outside of React**  
   For example, calling `expensivelyProcessAReallyLargeArrayOfObjects()` inside
  of your component or hook that needs that data.

</details>

---

### Optimizing Re-renders

React lets you express your UI as a function of their current state (more
concretely: their props, state, and context). In its current implementation,
when a component’s state changes, React will re-render that component and all of
its children — unless you have applied some form of manual memoization with
`useMemo()`, `useCallback()`, or `React.memo()`. For example, in the following
example, `<MessageButton>` will re-render whenever `<FriendList>`’s state
changes:

```javascript
function FriendList({ friends }) {
  const onlineCount = useFriendOnlineCount()
  if (friends.length === 0) {
    return <NoFriends />
  }
  return (
    <div>
      <span>{onlineCount} online</span>
      {friends.map(friend => (
        <FriendListCard key={friend.id} friend={friend} />
      ))}
      <MessageButton />
    </div>
  )
}
```

See this example in the React Compiler Playground.

React Compiler automatically applies the equivalent of manual memoization,
ensuring that only the relevant parts of an app re-render as state changes,
which is sometimes referred to as “fine-grained reactivity”. In the above
example, React Compiler determines that the return value of `<FriendListCard />`
can be reused even as `friends` changes, and can avoid recreating this JSX and
avoid re-rendering `<MessageButton>` as the count changes.

---

### Expensive calculations also get memoized

React Compiler can also automatically memoize expensive calculations used during
rendering:

```javascript
// **Not** memoized by React Compiler, since this is not a component or hook
function expensivelyProcessAReallyLargeArrayOfObjects() {
  /* ... */
}

// Memoized by React Compiler since this is a component
function TableContainer({ items }) {
  // This function call would be memoized:
  const data = expensivelyProcessAReallyLargeArrayOfObjects(items)
  // ...
}
```

See this example in the React Compiler Playground.

However, if `expensivelyProcessAReallyLargeArrayOfObjects` is truly an expensive
function, you may want to consider implementing its own memoization outside of
React, because:

- React Compiler only memoizes React components and hooks, not every function
- React Compiler’s memoization is not shared across multiple components or hooks

So if `expensivelyProcessAReallyLargeArrayOfObjects` was used in many different
components, even if the same exact items were passed down, that expensive
calculation would be run repeatedly. We recommend profiling first to see if it
really is that expensive before making code more complicated.

---

## Should I try out the compiler?

We encourage everyone to start using React Compiler. While the compiler is still
an optional addition to React today, in the future some features may require the
compiler in order to fully work.

---

## Is it safe to use?

React Compiler is now in RC and has been tested extensively in production. While
it has been used in production at companies like Meta, rolling out the compiler
to production for your app will depend on the health of your codebase and how
well you’ve followed the Rules of React.

---

## What build tools are supported?

React Compiler can be installed across several build tools such as Babel, Vite,
Metro, and Rsbuild.

React Compiler is primarily a light Babel plugin wrapper around the core
compiler, which was designed to be decoupled from Babel itself. While the
initial stable version of the compiler will remain primarily a Babel plugin, we
are working with the swc and oxc teams to build first class support for React
Compiler so you won’t have to add Babel back to your build pipelines in the
future.

Next.js users can enable the swc-invoked React Compiler by using v15.3.1 and up.

---

## What should I do about useMemo, useCallback, and React.memo?

React Compiler adds automatic memoization more precisely and granularly than is
possible with `useMemo`, `useCallback`, and `React.memo`. If you choose to keep
manual memoization, React Compiler will analyze them and determine if your
manual memoization matches its automatically inferred memoization. If there
isn’t a match, the compiler will choose to bail out of optimizing that
component.

This is done out of caution as a common anti-pattern with manual memoization is
using it for correctness. This means your app depends on specific values being
memoized to work properly. For example, in order to prevent an infinite loop,
you may have memoized some values to stop a `useEffect` call from firing. This
breaks the Rules of React, but since it can potentially be dangerous for the
compiler to automatically remove manual memoization, the compiler will just bail
out instead. You should manually remove your handwritten memoization and verify
that your app still works as expected.

---

## Try React Compiler

This section will help you get started with React Compiler and understand how to
use it effectively in your projects.

- **Installation** - Install React Compiler and configure it for your build
  tools
- **React Version Compatibility** - Support for React 17, 18, and 19
- **Configuration** - Customize the compiler for your specific needs
- **Incremental Adoption** - Strategies for gradually rolling out the compiler
  in existing codebases
- **Debugging and Troubleshooting** - Identify and fix issues when using the
  compiler
- **Compiling Libraries** - Best practices for shipping compiled code
- **API Reference** - Detailed documentation of all configuration options

---

## Additional resources

In addition to these docs, we recommend checking the React Compiler Working
Group for additional information and discussion about the compiler.
