// Path: src/lib/helpers/cart/getCheckoutAriaLabel.ts
export const getCheckoutAriaLabel = (
  subtotal: string,
  isPending: boolean
): string =>
  isPending ?
    'Behandler bestilling...'
  : `Gå til kassen med subtotal ${subtotal}`
