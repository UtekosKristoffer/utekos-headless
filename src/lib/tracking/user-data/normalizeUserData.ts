import type { UserDataInput, NormalizedUserData } from '@types'
import { sha256 } from '@/lib/tracking//hash/sha256'

export function normalizeUserData(input: UserDataInput): NormalizedUserData {
  const userData: NormalizedUserData = {}
  const address: any = {}
  let hasAddress = false

  if (input.email) {
    const normalizedEmail = input.email.trim().toLowerCase()
    userData.sha256_email_address = [sha256(normalizedEmail)]
  }

  if (input.phone) {
    const normalizedPhone = input.phone.replace(/[^\d+]/g, '')
    userData.sha256_phone_number = [sha256(normalizedPhone)]
  }

  if (input.firstName) {
    address.sha256_first_name = [sha256(input.firstName.trim().toLowerCase())]
    hasAddress = true
  }

  if (input.lastName) {
    address.sha256_last_name = [sha256(input.lastName.trim().toLowerCase())]
    hasAddress = true
  }

  if (input.city) {
    address.city = input.city.trim().toLowerCase()
    hasAddress = true
  }

  if (input.region) {
    address.region = input.region.trim().toLowerCase()
    hasAddress = true
  }

  if (input.postalCode) {
    address.postal_code = input.postalCode.trim()
    hasAddress = true
  }

  if (input.country) {
    address.country = input.country.trim().toUpperCase()
    hasAddress = true
  }

  if (hasAddress) {
    userData.address = [address]
  }

  return userData
}
