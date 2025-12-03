// Path: src/components/analytics/MetaPixel/getOrSetExternalId.ts

import { getCookie } from './getCookie'
import { setCookie } from './setCookie'

export function getOrSetExternalId(): string {
  let extId = getCookie('ute_ext_id')
  if (!extId) {
    extId = `user_${Math.random().toString(36).slice(2)}_${Date.now()}`
    setCookie('ute_ext_id', extId, 730)
  }
  return extId
}
