// Path: src/lib/tracking/utils/normalizeCustomerData.ts

export const normalizeCustomerData = {
  email: (email: string | null | undefined): string | undefined => {
    if (!email) return undefined
    return email.trim().toLowerCase()
  },

  phone: (phone: string | null | undefined): string | undefined => {
    if (!phone) return undefined

    const clean = phone.replace(/[^0-9+]/g, '')

    if (clean.startsWith('00')) {
      return '+' + clean.substring(2)
    }
    return clean || undefined
  },

  city: (city: string | null | undefined): string | undefined => {
    if (!city) return undefined
    const clean = city.replace(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '')
    return clean.trim().toLowerCase()
  },

  state: (state: string | null | undefined): string | undefined => {
    if (!state) return undefined
    return state.trim().toLowerCase()
  },

  country: (country: string | null | undefined): string | undefined => {
    if (!country) return undefined
    const clean = country.trim().toLowerCase()
    if (clean.length === 2) {
      return clean
    }
    if (clean === 'norway' || clean === 'norge') return 'no'
    return clean.substring(0, 2) // Forsøk på å hente ISO-kode
  },

  zip: (zip: string | null | undefined): string | undefined => {
    if (!zip) return undefined
    return zip.replace(/\s+/g, '').toLowerCase()
  },

  gender: (gender: string | null | undefined): string | undefined => {
    if (!gender) return undefined
    const clean = gender.trim().toLowerCase()
    if (
      clean === 'female'
      || clean === 'kvinne'
      || clean.startsWith('f')
      || clean.startsWith('k')
    )
      return 'f'
    if (clean === 'male' || clean === 'mann' || clean.startsWith('m'))
      return 'm'
    return undefined
  },

  name: (name: string | null | undefined): string | undefined => {
    if (!name) return undefined
    return name.trim().toLowerCase()
  }
}
