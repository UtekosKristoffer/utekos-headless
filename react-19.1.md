# What’s New in React 19.1.0

React 19.1.0 introduces major improvements across debugging, Suspense, Server
Components, and overall performance. This release ships with React Native 0.80,
bringing the latest stable React features to both web and native platforms.

---

## Highlights

- **Owner Stack:** Improved debugging experience with new owner stack API.
- **Suspense:** Expanded support and optimizations for async rendering.
- **React Server Components:** Enhanced streaming, error handling, and edge
  compatibility.
- **React DOM:** Refined attribute handling and rendering optimizations.
- **React Native:** Faster iOS builds and smaller Android APKs.

---

## Owner Stack: Improved Debugging

> Owner Stack is a development-only feature that helps you identify which
> component is responsible for a specific error.

- **API:**

  ```js
  import { captureOwnerStack } from 'react'

  function MyComponent() {
    if (process.env.NODE_ENV !== 'production') {
      const ownerStack = captureOwnerStack()
      console.log('Component rendering hierarchy:', ownerStack)
    }
    // Regular component code...
  }
  ```

- **Note:** Not working as expected in React Native with
  `@babel/plugin-transform-function-name`. A fix is coming in a future release.

---

## Experimental: Prebuilt React Native iOS Dependencies

- **Goal:** Reduce initial iOS build times by prebuilding 3rd party dependencies
  (e.g., Folly, GLog).
- **Benchmarks:** ~12% faster builds on M4 machines.
- **How to enable:**
  ```sh
  RCT_USE_RN_DEP=1 bundle exec pod install
  ```
  Or add to your Podfile:
  ```ruby
  +ENV['RCT_USE_RN_DEP'] = '1'
  ```
- **Feedback:** Report issues in the official discussion.

---

## Android: Smaller APK Size

- **Interprocedural Optimization (IPO):** Enabled for React Native and Hermes
  builds.
- **Result:** ~1MB APK size reduction in React Native 0.80.

---

## New App Screen Redesign

- **Community CLI & Template:**
  - New App Screen moved to its own package.
  - Improved experience for larger screens.
  - Reduced boilerplate for new apps.

---

## JSC Community Support Notice

- **React Native 0.80:** Last version with first-party JSC support.
- **Future:** Use `@react-native-community/javascriptcore` for JSC.

---

## Breaking Changes

### JS

- **eslint-plugin-react-hooks:** Upgraded from v4.6.0 to v5.2.0.
- **Exports field:** Added to `package.json` for JS Stable API.
  - May affect module resolution under Metro and Jest.

### Android

- **Kotlin:** Upgraded to v2.1.20.
- **StandardCharsets:** Deprecated class removed.
- **Internal Classes:** Several classes made internal.
- **Java to Kotlin Migration:** Some classes migrated, check for
  nullability/type changes.

### iOS

- **RCTFloorPixelValue:** Removed from `RCTUtils.h`.

---

## React 19.1.0 Feature Overview

### Owner Stack

- **Purpose:** Captures the stack of components involved in rendering, aiding
  debugging.
- **Usage:** Only available in development mode.

### Suspense Improvements

- **Expanded boundaries:** Client, server, and hydration phases.
- **Optimized hydration scheduling:** Reduces unnecessary client-side rendering.
- **Priority:** Increased for client-rendered Suspense boundaries.
- **Bug fixes:** Frozen fallback states, garbage collection pressure, key
  warnings, passive effect logs.
- **Dev warnings:** For null/undefined dependencies in hooks.
- **Hydration:** More consistent between server and client.

### React DOM

- **Double warnings:** Fixed for empty `href`.
- **getHoistableRoot:** Improved for Document containers.
- **HTML comments:** No longer supported as DOM containers.
- **<select> enhancements:** Allows `<script>` and `<template>` tags.
- **Responsive image preloading:** Optimized for HTML loading.

### React Server Components

- **unstable_prerender:** Experimental API for prerendering on the server.
- **Streaming:** Improved for edge/serverless environments.
- **Wire format:** Optimized, unnecessary IDs removed.
- **registerServerReference:** Exposed in client builds.
- **Parcel integration:** Added `react-server-dom-parcel` package.

---

## Example: Suspense Throttling Workaround

> Default suspense throttling remains at 300ms. Use `useTransition` to mitigate:

```jsx
import { useTransition, Suspense } from 'react'

function MyComponent() {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      setResourceId(newId)
    })
  }

  return (
    <>
      {isPending && <p>Loading...</p>}
      <button onClick={handleClick}>Load Resource</button>
      <Suspense fallback={<p>Loading resource...</p>}>
        <ResourceComponent id={resourceId} />
      </Suspense>
    </>
  )
}
```

---

## Conclusion

React 19.1.0 is a significant step forward, refining state management, error
handling, and async rendering. These updates streamline development workflows,
enhance debugging, and provide greater flexibility for building scalable,
maintainable applications.

For more details, refer to the official
[React 19.1.0 release notes](https://react.dev/blog/2025/03/28/react-19-1).
