// File: ./src/lib/meta/metaClient.ts

import { FacebookAdsApi, AdAccount } from 'facebook-nodejs-business-sdk'

/**
 * Initialiserer Meta Business SDK-klient (Marketing/Insights APIs).
 * Krever at følgende miljøvariabler er satt:
 *   META_SYSTEM_USER_TOKEN – access token for system user
 *   META_AD_ACCOUNT_ID     – ad account ID, f.eks. "act_1234567890"
 */

const ACCESS_TOKEN = process.env.META_SYSTEM_USER_TOKEN
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID

if (!ACCESS_TOKEN) {
  throw new Error('Missing required env var: META_SYSTEM_USER_TOKEN')
}
if (!AD_ACCOUNT_ID) {
  throw new Error('Missing required env var: META_AD_ACCOUNT_ID')
}

// Initialiser API-klienten
FacebookAdsApi.init(ACCESS_TOKEN)

/**
 * Hent AdAccount-instans for bruk i API-kall.
 */
export function getAdAccount(): AdAccount {
  return new AdAccount(AD_ACCOUNT_ID)
}
