// Path: src/lib/constants/CartErrorCode.ts

/**
 * @fileoverview Centralized error codes using Zod v4 enum pattern.
 *
 * This module consolidates all cart error codes into a single source of truth
 * that provides both runtime validation and compile-time type safety.
 * The Zod enum pattern enables runtime validation of error codes in API responses
 * while maintaining perfect TypeScript integration.
 */

import { CartErrorCodeSchema } from '@/db/zod/schemas/CartErrorCodeSchema'

/**
 * Constant object for dot-notation access to error codes.
 * This provides the ergonomic CartErrorCode.VALIDATION_ERROR syntax
 * while maintaining runtime validation capabilities through the schema.
 */
export const CartErrorCode = CartErrorCodeSchema.enum
