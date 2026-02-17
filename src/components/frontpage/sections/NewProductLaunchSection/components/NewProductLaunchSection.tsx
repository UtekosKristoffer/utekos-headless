// Path: src/components/frontpage/components/NewProductLaunchSection/NewProductLaunchSection.tsx
'use client'

import { useState, Activity } from 'react'
import { QuickViewModal } from '@/modules/cart/components/AddToCart/components/QuickViewModal'
import { productHandle } from '@/constants'
import { useNewProductLaunchAnimations } from '@/hooks/useNewProductLaunchAnimations'
import { useLaunchSectionTracking } from '@/hooks/useLaunchSectionTracking'
import { NewProductLaunchSectionView } from './NewProductLaunchSectionView'

type NewProductLaunchSectionProps = {
  variantId: string
}

export function NewProductLaunchSection({
  variantId
}: NewProductLaunchSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useNewProductLaunchAnimations()
  const { trackEvent } = useLaunchSectionTracking(variantId)

  const handleDiscoverClick = () => trackEvent('Discover', 'HeroInteract')

  const handleQuickViewClick = () => {
    setIsModalOpen(true)
    trackEvent('QuickView', 'OpenQuickView')
  }

  return (
    <>
      <NewProductLaunchSectionView
        ref={containerRef}
        onDiscoverClick={handleDiscoverClick}
        onQuickViewClick={handleQuickViewClick}
      />

      <Activity mode={isModalOpen ? 'visible' : 'hidden'}>
        <QuickViewModal
          productHandle={productHandle}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </Activity>
    </>
  )
}
