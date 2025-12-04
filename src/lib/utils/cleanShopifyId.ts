// src/lib/utils/cleanShopifyId.ts
export function cleanShopifyId(
  id: string | number | undefined | null
): string | undefined {
  if (!id) return undefined
  const stringId = String(id)
  // Fjerner alt før siste skråstrek hvis det er en URL/GID
  return stringId.split('/').pop()?.split('?')[0]
}
