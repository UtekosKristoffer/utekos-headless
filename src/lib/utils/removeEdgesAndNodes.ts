import type { Connection } from '@/api/shopify/types/types'

export const removeEdgesAndNodes = <T>(array: Connection<T>): T[] =>
  array.edges.map(edge => edge?.node)
