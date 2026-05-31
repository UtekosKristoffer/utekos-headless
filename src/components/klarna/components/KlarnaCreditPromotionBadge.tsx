// Path: src/components/klarna/components/KlarnaCreditPromotionBadge.tsx

/* TODO: Add type. Reuse or expand existing types if possible.
 See @src/components/klarna/types/index.ts and
 "types/global.d.ts".
*/

export function KlarnaCreditPromotionBadge() {
  return (
    <klarna-placement
      data-key='credit-promotion-badge'
      data-locale='no-NO'
      data-purchase-amount=''
    ></klarna-placement>
  )
}

/** Original code from Klarna documentation */

/* ```html
 <klarna-placement
      data-key="credit-promotion-badge"
      data-locale="no-NO"
  data-purchase-amount=""
    ></klarna-placement>
    ``` */

/** Dark theme Original code from Klarna documentation */
/* ```html
<klarna-placement
  data-key="credit-promotion-badge"
  data-locale="no-NO"
  data-purchase-amount=""
  data-theme="dark"
></klarna-placement>
``` */
