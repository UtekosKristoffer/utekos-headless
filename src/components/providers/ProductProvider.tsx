'use client'

import { ProductContext } from '@/lib/context/ProductContext'
import type { ProductState } from '@types'
import { useSearchParams } from 'next/navigation'
import React, { useMemo, useOptimistic } from 'react'

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()

  const getInitialState = () => {
    const params: ProductState = {}
    for (const [key, value] of searchParams.entries()) {
      params[key] = value
    }
    return params
  }

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update
    })
  )

  const updateOption = (name: string, value: string) => {
    const newState = { [name]: value }
    setOptimisticState(newState)
    return { ...state, ...newState }
  }

  const updateImage = (index: string) => {
    const newState = { image: index }
    setOptimisticState(newState)
    return { ...state, ...newState }
  }

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage
    }),
    [state]
  )

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}
