// Path: src/lib/hooks/useCartMutation.ts
'use client'

/**
 * @fileoverview Generic React Query hook for cart mutations with Zod v4 error integration.
 *
 * This hook abstracts the useMutation logic for handling success and error states
 * returned by server actions. It integrates with the centralized error mapping
 * system and zod-validation-error to provide consistent Norwegian error messages
 * across all cart mutations.
 *
 * @module lib/hooks/useCartMutation
 */

import { useMutation } from '@tanstack/react-query'
import { getCartErrorMessage } from '@/lib/errors'
import type { CartActionsResult, CartMutationFn, CartMutationInput } from '@/types'

/**
 * A generic React Query hook for performing any cart mutation.
 *
 * This hook integrates with the centralized error mapping system established
 * in mapThrownErrorToActionResult and provides consistent error handling
 * across all cart mutations. It automatically categorizes errors and provides
 * appropriate Norwegian error messages through zod-validation-error integration.
 *
 * @template TInput - The specific input type for the mutation, inferred from the mutationFn
 * @param mutationFn - The specific Server Action to execute (e.g., addLineAction)
 * @returns The state and methods from React Query's useMutation with enhanced error handling
 */
export const useCartMutation = <TInput extends CartMutationInput>(mutationFn: CartMutationFn<TInput>) => {
  const mutation = useMutation<CartActionsResult, Error, TInput>({
    mutationFn,
    onSuccess: data => {
      if (data.success) {
        console.log('Cart mutation successful:', data.message)
      } else {
        // Server action returned an error result
        console.error('Cart mutation failed:', data.message, `(Error Code: ${data.error})`)
      }
    },
    onError: (error, variables, context) => {
      const errorMessage = getCartErrorMessage(error)

      console.error('Cart mutation error occurred:', {
        message: errorMessage,
        variables,
        context,
        error
      })

      // Integration ready for global error reporting
      // errorReportingService.captureException(error, { variables, context })
    }
  })

  return mutation
}
