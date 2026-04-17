import { getMerchantCenterConfig } from './config'
import { MerchantCenterApiError } from './merchantApiRequest'

const MERCHANT_REGISTER_GCP_GUIDE_URL =
  'https://developers.google.com/merchant/api/guides/quickstart/direct-api-calls#step_1_register_as_a_developer'
const MERCHANT_REGISTER_GCP_METHOD_URL =
  'https://developers.google.com/merchant/api/reference/rest/accounts_v1/accounts.developerRegistration/registerGcp'
const MERCHANT_VERIFY_API_ACCESS_URL =
  'https://developers.google.com/merchant/api/guides/accounts/verify-api-access'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function collectReasonValues(value: unknown): string[] {
  if (typeof value === 'string') {
    return []
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectReasonValues)
  }

  if (!isRecord(value)) {
    return []
  }

  return Object.entries(value).flatMap(([key, nestedValue]) => {
    if (
      (key === 'reason' || key === 'REASON') &&
      typeof nestedValue === 'string'
    ) {
      return [nestedValue]
    }

    return collectReasonValues(nestedValue)
  })
}

function extractMerchantApiErrorCode(error: MerchantCenterApiError) {
  const reasonValues = collectReasonValues(error.responseBody)
  return reasonValues.find(value => value === 'GCP_NOT_REGISTERED') ?? reasonValues[0]
}

export function getMerchantApiDiagnostic(error: unknown) {
  if (!(error instanceof MerchantCenterApiError)) {
    return {
      message:
        error instanceof Error ? error.message : 'Unexpected Merchant API error'
    }
  }

  const config = getMerchantCenterConfig()
  const code = extractMerchantApiErrorCode(error)

  if (code === 'GCP_NOT_REGISTERED') {
    return {
      code,
      message: error.message,
      status: error.status,
      responseBody: error.responseBody,
      remediation: {
        kind: 'developer_registration_required',
        docs: {
          guideUrl: MERCHANT_REGISTER_GCP_GUIDE_URL,
          methodUrl: MERCHANT_REGISTER_GCP_METHOD_URL,
          verifyUrl: MERCHANT_VERIFY_API_ACCESS_URL
        },
        merchantAccountId: config.accountId,
        gcpProjectId: config.serviceAccount.projectId ?? config.quotaProject,
        serviceAccountEmail: config.serviceAccount.clientEmail,
        requiredActor:
          'A human Google account with Admin access to the Merchant Center account',
        steps: [
          'Register the Google Cloud project used by this app with accounts.developerRegistration.registerGcp.',
          'Run the registration call with a human Google account that has Admin access in Merchant Center.',
          'Use a human developer email in the registerGcp request body, not a service account email.',
          'Keep the service account added as a Merchant Center user for runtime API access after registration.'
        ]
      }
    }
  }

  return {
    ...(code ? { code } : {}),
    message: error.message,
    status: error.status,
    responseBody: error.responseBody
  }
}
