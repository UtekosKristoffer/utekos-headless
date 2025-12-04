// Path: src/lib/meta/normalization.ts

/**
 * Normaliseringslogikk for Meta Conversions API (CAPI).
 * Formålet er å vaske data før de sendes til Meta Business SDK eller hashes,
 * for å maksimere Event Match Quality.
 *
 * Basert på:
 * - Parameter Builder Library logic
 * - Best Practices for Conversions API
 */

export const normalize = {
  /**
   * E-post: Trimmes og gjøres om til små bokstaver.
   *
   */
  email: (email: string | null | undefined): string | undefined => {
    if (!email) return undefined
    return email.trim().toLowerCase()
  },

  /**
   * Telefonnummer: Fjerner alle symboler, mellomrom og parenteser.
   * Beholder ledende '+' hvis tilgjengelig, eller normaliserer basert på landskode hvis nødvendig.
   * Meta krever format uten symboler for best matching.
   *
   */
  phone: (phone: string | null | undefined): string | undefined => {
    if (!phone) return undefined
    // Fjerner alt som ikke er tall eller +
    const clean = phone.replace(/[^0-9+]/g, '')
    // Fjerner ledende 00 og erstatter med +
    if (clean.startsWith('00')) {
      return '+' + clean.substring(2)
    }
    return clean || undefined
  },

  /**
   * By: Små bokstaver, ingen symboler/tall.
   *
   */
  city: (city: string | null | undefined): string | undefined => {
    if (!city) return undefined
    // Fjerner tall og vanlige symboler som kan forstyrre matching
    const clean = city.replace(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '')
    return clean.trim().toLowerCase()
  },

  /**
   * Stat/Fylke: 2-bokstavs ANSI forkortelse i små bokstaver.
   *
   */
  state: (state: string | null | undefined): string | undefined => {
    if (!state) return undefined
    // Her bør man ideelt sett mappe fulle navn til koder (eks: "Oslo" -> "os"),
    // men som et minimum trimmer vi og lowercaser.
    return state.trim().toLowerCase()
  },

  /**
   * Land: ISO 3166-1 alpha-2 kode (2 bokstaver) i små bokstaver.
   *
   */
  country: (country: string | null | undefined): string | undefined => {
    if (!country) return undefined
    const clean = country.trim().toLowerCase()
    // Enkel sjekk for å sikre at vi sender 2-bokstavs kode (f.eks 'no', ikke 'norway')
    if (clean.length === 2) {
      return clean
    }
    // Fallback: Hvis vi mottar 'norway', returner 'no' (kan utvides ved behov)
    if (clean === 'norway' || clean === 'norge') return 'no'
    return clean.substring(0, 2) // Forsøk på å hente ISO-kode
  },

  /**
   * Postnummer: Fjerner mellomrom (viktig for internasjonale koder).
   *
   */
  zip: (zip: string | null | undefined): string | undefined => {
    if (!zip) return undefined
    return zip.replace(/\s+/g, '').toLowerCase() // UK postcodes kan ha mellomrom som bør fjernes/normaliseres
  },

  /**
   * Kjønn: Kun 'f' eller 'm'.
   *
   */
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

  /**
   * Fornavn/Etternavn: Små bokstaver.
   *
   */
  name: (name: string | null | undefined): string | undefined => {
    if (!name) return undefined
    return name.trim().toLowerCase()
  }
}
