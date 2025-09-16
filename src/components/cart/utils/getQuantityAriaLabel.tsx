export const getQuantityAriaLabel = (
  action: 'increase' | 'decrease',
  itemTitle: string
): string =>
  action === 'increase' ?
    `Øk antall for ${itemTitle}`
  : `Reduser antall for ${itemTitle}`
