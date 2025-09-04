// Path: src/lib/utils/voidAsync.ts
/**
 * Utility to call an async function and explicitly ignore its result.
 * Useful for fire-and-forget async operations where the result is not needed.
 *
 * @module utils/voidAsync
 * @param fn - An async function returning a Promise
 */

export function voidAsync<T = unknown>(fn: () => Promise<T>): void {
  void fn()
}
