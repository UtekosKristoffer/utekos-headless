// Path: src/lib/tracking/capi/getOrSetExternalId.ts

import { getCookie } from '@/lib/tracking/utils/getCookie'
import { setCookie } from '@/lib/tracking/utils/setCookie'
export function getOrSetExternalId(): string {
  let extId = getCookie('ute_ext_id')

  if (!extId) {
    const randomPart =
      typeof crypto !== 'undefined' && crypto.randomUUID ?
        crypto.randomUUID()
      : Math.random().toString(36).slice(2)

    extId = `user_${Date.now()}_${randomPart}`

    setCookie('ute_ext_id', extId, 730)
  }

  return extId
}
