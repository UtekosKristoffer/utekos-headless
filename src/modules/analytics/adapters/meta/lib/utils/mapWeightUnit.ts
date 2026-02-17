// Path: src/modules/analytics/adapters/meta/lib/utils/mapWeightUnit.ts

export function mapWeightUnit(unit: string): string {
  switch (unit) {
    case 'KILOGRAMS':
      return 'kg'
    case 'GRAMS':
      return 'g'
    case 'POUNDS':
      return 'lb'
    case 'OUNCES':
      return 'oz'
    default:
      return 'kg'
  }
}
