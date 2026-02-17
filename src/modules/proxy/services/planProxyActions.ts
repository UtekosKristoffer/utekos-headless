// Path: src/lib/middleware/services/planProxyActions.ts

import { generateCookieConfig } from '@/modules/proxy/services/generateCookieConfig'
import type {
  DetectedAdInteraction,
  ProxyCookieConfig,
  ProxyActionPlan
} from '@/modules/proxy/types'

export function planProxyActions(
  interactions: DetectedAdInteraction[],
  isProduction: boolean
): ProxyActionPlan {
  const cookiesToSet: ProxyCookieConfig[] = []
  const logsToDispatch: DetectedAdInteraction['logData'][] = []

  for (const interaction of interactions) {
    if (interaction.cookieName) {
      const config = generateCookieConfig(
        interaction.cookieName,
        interaction.paramValue,
        isProduction
      )
      cookiesToSet.push(config)
    }

    logsToDispatch.push(interaction.logData)
  }

  return { cookiesToSet, logsToDispatch }
}
