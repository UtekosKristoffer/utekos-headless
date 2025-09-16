import type { RawField } from '@/types/metaobject';
import { toCamelCase } from './toCamelCase';

export function reshapeMetaobject(
  fields: RawField[] | undefined | null
) {
  if (!fields) {
    return {};
  }

  return fields.reduce((acc, field) => {
    const camelKey = toCamelCase(field.key);
    
    if (field.references?.nodes) {
      // For bilder, henter vi ut image-objektet
      acc[camelKey] = field.references.nodes.map(node => node.image);
    } else {
      acc[camelKey] = { value: field.value };
    }
    return acc;
  }, {} as any); // Bruker 'any' for å forenkle, siden strukturen nå er mer kompleks
}