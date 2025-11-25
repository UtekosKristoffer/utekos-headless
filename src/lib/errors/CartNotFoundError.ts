export class CartNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CartNotFoundError'
  }
}
