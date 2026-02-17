// Path: src/lib/middleware/config/ad-platforms.ts

import type { AdPlatformConfig } from '@types'

export const AD_PLATFORMS: AdPlatformConfig[] = [
  {
    id: 'snapchat',
    param: 'ScCid',
    cookieName: 'ute_sc_cid',
    logConfig: {
      eventName: 'Snapchat Ad Click Detected',
      emoji: '👻'
    }
  },
  {
    id: 'meta',
    param: 'fbclid',
    cookieName: undefined,
    logConfig: {
      eventName: 'Meta Ad Click Detected',
      emoji: '💙'
    }
  },
  {
    id: 'pinterest',
    param: 'epik',
    cookieName: '_epik',
    logConfig: {
      eventName: 'Pinterest Ad Click Detected',
      emoji: '📌'
    }
  },
  {
    id: 'tiktok',
    param: 'ttclid',
    cookieName: 'ute_ttclid',
    logConfig: {
      eventName: 'TikTok Ad Click Detected',
      emoji: '🎵'
    }
  }
]
