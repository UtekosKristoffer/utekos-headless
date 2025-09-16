export const OPTION_NAMES = {
  SIZE: 'Størrelse',
  COLOR: 'Farge'
} as const

export const OPTION_ORDER = [OPTION_NAMES.COLOR, OPTION_NAMES.SIZE]

export function optionNames() {}

export const optionNamesWithUpperCase = Object.values(OPTION_NAMES).map(name =>
  name.toUpperCase()
)

export const optionNamesWithLowerCase = Object.values(OPTION_NAMES).map(name =>
  name.toLowerCase()
)

export const sizeOptionName = OPTION_NAMES.SIZE
export const sizeOptionNameToLowerCase = sizeOptionName.toLowerCase()
export const colorOptionName = OPTION_NAMES.COLOR
export const colorOptionNameLowerCase = colorOptionName.toLowerCase()
export const productOptionNames = Object.values(OPTION_NAMES)
export const productOptionNamesToLowerCase = productOptionNames.map(name =>
  name.toLowerCase()
)

export type OptionNames =
  | 'Størrelse'
  | 'Farge'
  | 'størrelse'
  | 'farge'
  | 'SIZE'
  | 'COLOR'
  | 'size'
  | 'color'
// Example usage of arrow functions to maintain 'this' context
export class ProductOptionNames {
  sizeOptionName: string = OPTION_NAMES.SIZE
  colorOptionName: string = OPTION_NAMES.COLOR
  value: OptionNames | undefined
  constructor(initialValue?: OptionNames) {
    this.value = initialValue
  }
  setValue(newValue: OptionNames) {
    this.value = newValue
  }
}
export type OptionName = (typeof OPTION_NAMES)[keyof typeof OPTION_NAMES]

export type ProductOption = {
  name: OptionName // Må være en av verdiene fra OPTION_NAMES
  value: string // Kan være hvilken som helst streng ('L', 'Blå', '42', osv.)
}

/**
 * Finds a specific option from an array of product options, ignoring case.
 * @param options - An array of available product options, e.g., [{ name: 'Farge', value: 'Blå' }].
 * @param targetOptionName - The canonical name of the option to find (e.g., 'Farge' or 'Størrelse').
 * @returns The found product option object or `undefined` if not found.
 */

export const findSelectedOptionStrict = (
  options: ProductOption[],
  targetOptionName: OptionName
): ProductOption | undefined =>
  options.find(option => option.name === targetOptionName)
