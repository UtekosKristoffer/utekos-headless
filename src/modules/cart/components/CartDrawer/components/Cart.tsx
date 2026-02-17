// Path: src/modules/cart/components/CartDrawer/components/Cart.tsx
'use client'

import { useEffect, useState } from 'react'
import { CartDrawer } from './CartDrawer'

export function Cart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <CartDrawer />
}
