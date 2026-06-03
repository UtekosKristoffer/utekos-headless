/////////////////////////////
/// src/lib/onRouterTransitionStart.ts
/////////////////////////////

/**
 * The **`StorageEvent`** interface is implemented by the Window/storage_event event, which is sent to a window when a storage area the window has access to is changed within the context of another document.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/StorageEvent)
 */

const startTime = performance.now()

const observer = new PerformanceObserver((list: PerformanceObserverEntryList) => {
  for (const entry of list.getEntries()) {
    if (entry instanceof PerformanceNavigationTiming) {
      console.log('Time to Interactive:', entry.loadEventEnd - startTime)
    }
  }
})

observer.observe({ entryTypes: ['navigation'] })

export function onRouterTransitionStart(url: string) {
  performance.mark(`nav-start-${url}`)
}
