'use client'

import { useState, Activity } from 'react'
import { QuickViewModal } from '@/components/products/QuickViewModal'
import { productHandle } from '@/api/constants'
import { useNewProductLaunchAnimations } from '@/hooks/useNewProductLaunchAnimations'
import { useLaunchSectionTracking } from '@/hooks/useLaunchSectionTracking'
import { NewProductLaunchSectionView } from './NewProductLaunchSectionView'

interface NewProductLaunchSectionProps {
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
