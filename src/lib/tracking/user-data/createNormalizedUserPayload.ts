// Path: src/lib/tracking/user-data/createNormalizedUserPayload.ts
import type { NormalizedUserData, UserDataInput } from 'types/user-data.types'
import { sanitizeAndHashAttribute } from '@/lib/tracking/user-data/sanitizeAndHashAttribute'
import { constructAddressRecord } from '@/lib/tracking/user-data/constructAddressRecord'
import { INVALID_PHONE_CHARS_PATTERN } from '@/constants/invalid-phone-chars-pattern'

export function createNormalizedUserPayload(
  input: UserDataInput
): NormalizedUserData {
  const userData: NormalizedUserData = {}

  const emailHash = sanitizeAndHashAttribute(input.email)
  if (emailHash) {
    userData.sha256_email_address = emailHash
  }

  if (input.phone) {
    const sanitizedPhone = input.phone.replace(INVALID_PHONE_CHARS_PATTERN, '')
    const phoneHash = sanitizeAndHashAttribute(sanitizedPhone)
    if (phoneHash) {
      userData.sha256_phone_number = phoneHash
    }
  }

  const addressRecord = constructAddressRecord(input)
  if (addressRecord) {
    userData.address = [addressRecord]
  }

  return userData
}
