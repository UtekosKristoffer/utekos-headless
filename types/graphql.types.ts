// Path: types/graphql.types.ts

export type GraphQLErrorLocation = {
  line: number
  column: number
}

export type GraphQLResponse<T> =
  | GraphQLErrorResponse
  | GraphQLSuccessResponse<T>

export type GraphQLError = {
  message: string
  extensions?: {
    code?: string
    [key: string]: unknown
  }
  locations?: Array<{
    line: number
    column: number
  }>
  path?: Array<string | number>
}

export type GraphQLErrorResponse = {
  errors: GraphQLError[]
  data?: null
}

export type GraphQLSuccessResponse<T> = {
  data: T
  errors?: undefined
}
