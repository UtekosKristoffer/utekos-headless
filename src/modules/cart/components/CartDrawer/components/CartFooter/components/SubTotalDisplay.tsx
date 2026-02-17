// Path: src/components/cart/CartFooter/SubTotalDisplay.tsx
export const SubtotalDisplay = ({
  subtotal
}: {
  subtotal: string
}): React.JSX.Element => (
  <div className='flex justify-between font-semibold'>
    <span>Delsum</span>
    <span>{subtotal}</span>
  </div>
)
