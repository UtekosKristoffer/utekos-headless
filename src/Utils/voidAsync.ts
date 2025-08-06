// src/Utils/voidAsync.ts

function voidAsync<T = unknown>(fn: () => Promise<T>): void {
  void fn();
}

export default voidAsync;
