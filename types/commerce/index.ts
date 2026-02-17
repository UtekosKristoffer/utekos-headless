// Path: src/types/commerce/index.ts

export interface Money {
  amount: string
  currencyCode: string
}

export type CurrencyCode = 'USD' | 'EUR' | 'NOK'
