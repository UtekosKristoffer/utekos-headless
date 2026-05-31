// Path: src/components/klarna/components/KlarnaCreditPromotionAutoSize.tsx

type KlarnaCreditPromotionAutoSizeProps = {
  id?: string
  purchaseAmount?: number | string
}

export function KlarnaCreditPromotionAutoSize({
  id,
  purchaseAmount = ''
}: KlarnaCreditPromotionAutoSizeProps) {
  return (
    <klarna-placement
      id={id}
      data-key='credit-promotion-auto-size'
      data-locale='no-NO'
      data-purchase-amount={purchaseAmount}
    ></klarna-placement>
  )
}

/** Original code from Klarna documentation */

/* ```html
 <klarna-placement
      data-key="credit-promotion-auto-size"
      data-locale="no-NO"
  data-purchase-amount=""
    ></klarna-placement>
    ``` */
