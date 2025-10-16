import Link from 'next/link'
import HyttekosFlow from './HyttekosFlow'
import { ArrowRight } from 'lucide-react'

export function HyttekosSection() {
  return (
    <section className='py-16 px-4'>
      {/* Intro */}
      <div className='max-w-3xl mx-auto text-center mb-12'></div>

      {/* Diagrammet */}
      <div className='max-w-5xl mx-auto'>
        <HyttekosFlow />
      </div>
    </section>
  )
}
