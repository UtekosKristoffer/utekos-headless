// Path: src/lib/tracking/user-data/constructAddressRecord.ts
import type {
  AddressHashKey,
  AddressRecord,
  UserDataInput
} from '@types'
import { sanitizeAndHashAttribute } from '@/lib/tracking/user-data/sanitizeAndHashAttribute'

export function constructAddressRecord(
  input: UserDataInput
): AddressRecord | undefined {
  const address: AddressRecord = {}
  let isEmpty = true

  const hashFields: Array<[AddressHashKey, string | null | undefined]> = [
    ['sha256_first_name', input.firstName],
    ['sha256_last_name', input.lastName]
  ]

  for (const [key, value] of hashFields) {
    const hashedValue = sanitizeAndHashAttribute(value)
    if (hashedValue) {
      address[key] = hashedValue
      isEmpty = false
    }
  }

  if (input.city) {
    address.city = input.city.trim().toLowerCase()
    isEmpty = false
  }

  if (input.region) {
    address.region = input.region.trim().toLowerCase()
    isEmpty = false
  }

  if (input.postalCode) {
    address.postal_code = input.postalCode.trim()
    isEmpty = false
  }

  if (input.country) {
    address.country = input.country.trim().toUpperCase()
    isEmpty = false
  }

  return isEmpty ? undefined : address
}
