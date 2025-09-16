// Path: src/lib/utils/reshapeMetaobject.ts

import type { MetaobjectField, RawField } from '@types'
import { toCamelCase } from './toCamelCase'

/**
 * Reshapes raw metaobject fields into a typed structure
 * @why Transforms Shopify's key-value metaobject structure into camelCase TypeScript object
 * @param fields Raw metaobject fields from Shopify API
 * @returns Typed metaobject with camelCase keys
 */
export function reshapeMetaobject(
  fields: RawField[] | undefined | null
): Record<string, MetaobjectField | MetaobjectField['value'][]> {
  if (!fields) {
    return {}
  }

  return fields.reduce<
    Record<string, MetaobjectField | MetaobjectField['value'][]>
  >((acc, field) => {
    const camelKey = toCamelCase(field.key)

    if (field.references?.nodes) {
      acc[camelKey] = field.references.nodes.map(node => node.image)
    } else {
      acc[camelKey] = { value: field.value }
    }
    return acc
  }, {})
}
