// Path: src/lib/utils/formatPrice.ts
import type { Money } from '@types'

/**
 * Formaterer et Money-objekt til en lesbar streng.
 * @param {Money} money - Money-objektet som skal formateres.
 * @returns {string} En formatert pris-streng (f.eks. "kr 1 234,56").
 */
export const formatPrice = (money: Money): string => {
  const amount = parseFloat(money.amount)
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: 2
  }).format(amount)
}

export default formatPrice
