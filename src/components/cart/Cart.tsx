// Path: src/components/cart/Cart.tsx
'use client'

import { useEffect, useState } from 'react'
import { CartDrawer } from './CartDrawer/CartDrawer'

export function Cart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Returner ingenting på serveren
  }

  return <CartDrawer />
}
