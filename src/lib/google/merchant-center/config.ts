import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { z } from 'zod'

const EXPECTED_SERVICE_ACCOUNT_EMAIL =
  'tag-manager-service-account@nifty-structure-490519-u6.iam.gserviceaccount.com'
const LOCAL_DEV_MERCHANT_SERVICE_ACCOUNT_PATH =
  'src/api/lib/cloud-credentials/tag-manager-credentials.json'

const merchantEnvSchema = z.object({
  GOOGLE_MERCHANT_ACCOUNT_ID: z.string().regex(/^\d+$/),
  GOOGLE_MERCHANT_SERVICE_ACCOUNT_JSON: z.string().min(1).optional(),
  GOOGLE_MERCHANT_QUOTA_PROJECT: z.string().min(1),
  GOOGLE_MERCHANT_DATA_SOURCE_ID: z
    .string()
    .regex(/^\d+$/)
    .optional()
})

const merchantServiceAccountSchema = z
  .object({
    type: z.string().optional(),
    project_id: z.string().optional(),
    private_key: z.string().min(1),
    client_email: z.string().email()
  })
  .superRefine((serviceAccount, context) => {
    if (serviceAccount.client_email !== EXPECTED_SERVICE_ACCOUNT_EMAIL) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Expected Merchant service account ${EXPECTED_SERVICE_ACCOUNT_EMAIL}, received ${serviceAccount.client_email}`
      })
    }
  })

export const MERCHANT_CENTER_CONTENT_SCOPE =
  'https://www.googleapis.com/auth/content'

export const MERCHANT_CENTER_DEFAULTS = {
  contentLanguage: 'no',
  feedLabel: 'NO',
  currencyCode: 'NOK',
  countryCode: 'NO'
} as const

export const MERCHANT_CENTER_PRIMARY_DATA_SOURCE_DISPLAY_NAME =
  'Utekos API Primary Product Source (NO-no)'

export type MerchantCenterConfig = {
  accountId: string
  accountName: string
  quotaProject: string
  primaryDataSourceDisplayName: string
  defaults: typeof MERCHANT_CENTER_DEFAULTS
  dataSourceId?: string
  serviceAccount: {
    clientEmail: string
    privateKey: string
    projectId?: string
  }
}

let cachedConfig: MerchantCenterConfig | null = null

function normalizeOptionalEnvValue(value: string | undefined) {
  const trimmedValue = value?.trim()
  return trimmedValue ? trimmedValue : undefined
}

function readLocalMerchantServiceAccount() {
  if (process.env.NODE_ENV === 'production') {
    return undefined
  }

  const credentialsPath = path.join(
    process.cwd(),
    LOCAL_DEV_MERCHANT_SERVICE_ACCOUNT_PATH
  )

  if (!existsSync(credentialsPath)) {
    return undefined
  }

  return readFileSync(credentialsPath, 'utf8')
}

function parseMerchantServiceAccount(rawValue?: string) {
  const candidateValues = [
    normalizeOptionalEnvValue(rawValue),
    readLocalMerchantServiceAccount()
  ].filter((value): value is string => Boolean(value))
  let lastError: unknown = null

  for (const candidateValue of candidateValues) {
    try {
      const parsedJson = JSON.parse(candidateValue) as unknown
      const serviceAccount = merchantServiceAccountSchema.parse(parsedJson)

      return {
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
        ...(serviceAccount.project_id
          ? { projectId: serviceAccount.project_id }
          : {})
      }
    } catch (error) {
      lastError = error
    }
  }

  if (lastError instanceof Error) {
    throw lastError
  }

  throw new Error(
    'Missing Merchant service account credentials. Set GOOGLE_MERCHANT_SERVICE_ACCOUNT_JSON or provide the local credential file.'
  )
}

export function getMerchantCenterConfig(): MerchantCenterConfig {
  if (cachedConfig) {
    return cachedConfig
  }

  const parsedEnv = merchantEnvSchema.parse({
    GOOGLE_MERCHANT_ACCOUNT_ID: process.env.GOOGLE_MERCHANT_ACCOUNT_ID,
    GOOGLE_MERCHANT_SERVICE_ACCOUNT_JSON: normalizeOptionalEnvValue(
      process.env.GOOGLE_MERCHANT_SERVICE_ACCOUNT_JSON
    ),
    GOOGLE_MERCHANT_QUOTA_PROJECT: process.env.GOOGLE_MERCHANT_QUOTA_PROJECT,
    GOOGLE_MERCHANT_DATA_SOURCE_ID: normalizeOptionalEnvValue(
      process.env.GOOGLE_MERCHANT_DATA_SOURCE_ID
    )
  })

  const config: MerchantCenterConfig = {
    accountId: parsedEnv.GOOGLE_MERCHANT_ACCOUNT_ID,
    accountName: `accounts/${parsedEnv.GOOGLE_MERCHANT_ACCOUNT_ID}`,
    quotaProject: parsedEnv.GOOGLE_MERCHANT_QUOTA_PROJECT,
    primaryDataSourceDisplayName:
      MERCHANT_CENTER_PRIMARY_DATA_SOURCE_DISPLAY_NAME,
    defaults: MERCHANT_CENTER_DEFAULTS,
    ...(parsedEnv.GOOGLE_MERCHANT_DATA_SOURCE_ID
      ? { dataSourceId: parsedEnv.GOOGLE_MERCHANT_DATA_SOURCE_ID }
      : {}),
    serviceAccount: parseMerchantServiceAccount(
      parsedEnv.GOOGLE_MERCHANT_SERVICE_ACCOUNT_JSON
    )
  }

  cachedConfig = config

  return config
}
