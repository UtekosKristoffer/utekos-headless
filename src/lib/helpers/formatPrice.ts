// Path: src/lib/helpers/formatPrice.ts
// Hjelpefunksjon for å formatere pris med norsk format

export function formatPrice(amount: string | number, currencyCode: string = 'NOK'): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  if (isNaN(numericAmount)) {
    return '0,00 kr'
  }

  // Norsk format: 1 790,00 kr
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount)
}