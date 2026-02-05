import React from 'react'
import { ComfyrobeHeroSection } from './components/ComfyrobeHeroSection'
import { ProblemSolutionSection } from './components/ProblemSolutionSection'
import { AnatomySection } from './components/AnatomySection'
import { ComfyrobeCommerceFlow } from './components/ComfyrobeCommerceFlow'
export default function ComfyrobeLandingPage() {
  const productImagePath = '/webp/comfy-1500-2000.webp'
  const backgroundImagePath = '/webp/comfy-inner-logo-1920-1080.webp'

  return (
    <main className='min-h-screen bg-[#0a0a0a]'>
      {/* Statiske / Isolerte Server/Client komponenter */}
      <ComfyrobeHeroSection
        productImageSrc={productImagePath}
        backgroundImageSrc={backgroundImagePath}
      />
      <ProblemSolutionSection />
      <AnatomySection />

      {/* Orkestratoren som håndterer state mellom SizeSelector og Offer */}
      <ComfyrobeCommerceFlow productImageSrc={productImagePath} />
    </main>
  )
}
