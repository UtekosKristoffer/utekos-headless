// Path: src/lib/utils/either.ts
export class Left<L> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isLeft(): this is Left<L> {
    return true
  }

  isRight(): this is Right<never> {
    return false
  }
}

export class Right<R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isLeft(): this is Left<never> {
    return false
  }

  isRight(): this is Right<R> {
    return true
  }
}

/**
 * En union-type som enten er en Left (feil) eller en Right (suksess).
 */
export type Either<L, R> = Left<L> | Right<R>

/**
 * Hjelpefunksjon for å lage en Left-instans.
 */
export const left = <L>(value: L): Either<L, never> => new Left(value)

/**
 * Hjelpefunksjon for å lage en Right-instans.
 */
export const right = <R>(value: R): Either<never, R> => new Right(value)

/**
 * Kjører en funksjon som kan kaste en feil, og returnerer resultatet som en Either.
 * @param fn Funksjonen som skal prøves. Kan være sync eller async.
 * @param onError En funksjon som konverterer den fangede feilen til en Left-verdi.
 * @returns En Left med feilen, eller en Right med suksess-verdien.
 */
export const tryCatch = async <L, R>(
  fn: () => R | Promise<R>,
  onError: (_error: unknown) => L
): Promise<Either<L, R>> => {
  try {
    const result = await fn()
    return right(result)
  } catch (error) {
    return left(onError(error))
  }
}
