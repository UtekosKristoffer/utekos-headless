import type { GraphQLErrorResponse, GraphQLSuccessResponse } from '@types'
export function isGraphQLErrorResponse(
  response: unknown
): response is GraphQLErrorResponse {
  return (
    typeof response === 'object'
    && response !== null
    && 'errors' in response
    && Array.isArray((response as { errors: unknown }).errors)
    && (response as { errors: unknown[] }).errors.length > 0
  )
}

export function isGraphQLSuccessResponse<T>(
  response: unknown
): response is GraphQLSuccessResponse<T> {
  return (
    typeof response === 'object'
    && response !== null
    && 'data' in response
    && !(
      'errors' in response
      && Array.isArray((response as { errors?: unknown }).errors)
      && ((response as { errors?: unknown[] }).errors?.length ?? 0) > 0
    )
  )
}
