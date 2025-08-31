// Path: src/components/ProductClientView.tsx (Eksempel)
'use client'

import { useState } from 'react'
import type { Product, ProductVariant } from '@/types'
import { AddToCartForm } from '@/components/AddToBag'

interface ProductClientViewProps {
  product: Product // Antar en produkttype med varianter
  variants: ProductVariant[]
}

export function ProductClientView({ product, variants }: ProductClientViewProps) {
  // Lokal state for å håndtere hvilken variant som er valgt
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(variants[0])

  return (
    <div>
      {/* Her ville du hatt UI for å velge farge/størrelse */}
      {/* For eksempel knapper som kaller setSelectedVariant */}
      
      {variants.map(variant => (
        <button key={variant.id} onClick={() => setSelectedVariant(variant)}>
          {variant.title}
        </button>
      ))}

      <hr className='my-4' />

      {/* Vår nye, robuste skjemakomponent */}
      <AddToCartForm selectedVariant={selectedVariant} />

      {!selectedVariant && <p className='mt-2 text-sm text-destructive'>Vennligst velg en variant for å legge i handlekurven.</p>}
    </div>
  )
}