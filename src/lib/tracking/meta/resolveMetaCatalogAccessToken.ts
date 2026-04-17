import type { MetaCatalogAccessTokenSource } from './metaCatalogTypes'

type ResolvedMetaCatalogAccessToken = {
  token: string
  source: MetaCatalogAccessTokenSource
}

function normalizeEnvValue(value: string | undefined) {
  if (!value) return undefined

  const trimmedValue = value.trim()

  if (!trimmedValue) return undefined

  if (
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"'))
    || (trimmedValue.startsWith('\'') && trimmedValue.endsWith('\''))
  ) {
    const unwrappedValue = trimmedValue.slice(1, -1).trim()
    return unwrappedValue || undefined
  }

  return trimmedValue
}

export function resolveMetaCatalogAccessToken():
  | ResolvedMetaCatalogAccessToken
  | null {
  const tokenCandidates: Array<{
    source: MetaCatalogAccessTokenSource
    token: string | undefined
  }> = [
    {
      source: 'META_SYSTEM_USER_TOKEN',
      token: normalizeEnvValue(process.env.META_SYSTEM_USER_TOKEN)
    },
    {
      source: 'CATALOG_ACCESS_TOKEN',
      token: normalizeEnvValue(process.env.CATALOG_ACCESS_TOKEN)
    },
    {
      source: 'META_ACCESS_TOKEN',
      token: normalizeEnvValue(process.env.META_ACCESS_TOKEN)
    }
  ]

  for (const candidate of tokenCandidates) {
    if (candidate.token) {
      return candidate as ResolvedMetaCatalogAccessToken
    }
  }

  return null
}
