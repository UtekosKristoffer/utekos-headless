'use client'
import { Cloud, Droplet, ShieldCheck, Settings2 } from 'lucide-react'

interface Feature {
  icon: any
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Cloud />,
    title: 'CloudWeave™',
    description:
      'Isolasjon med dunlignende letthet for bekymringsfri ytelse. Varmer selv når det blir fuktig.'
  },
  {
    icon: <Droplet />,
    title: 'Luméa™',
    description:
      'Elegant, matt finish som tåler norsk kystklima. Vannavvisende og slitesterkt.'
  },
  {
    icon: <Settings2 />,
    title: '3-i-1 Funksjon',
    description:
      'Fra parkas til varmepose på sekunder. Tilpass komforten etter behov.'
  },
  {
    icon: <ShieldCheck />,
    title: 'Varig kvalitet',
    description:
      'Beholder formen og varmen år etter år. En investering i langvarig komfort.'
  }
]

export function TechDawnFeatures() {
  return (
    <>
      <div className='container mx-auto px-4'>
        <div className='relative pb-10 sm:pb-24'>
          <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
          >
            <div className='w-[85%] mx-auto border-t border-neutral-800' />
          </div>
        </div>
      </div>
      <section className='max-w-6xl mx-auto px-6 pt-8 pb-20'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-light mb-4'>
            Hemmeligheten bak komforten
          </h2>
          <p className='text-gray-400 max-w-2xl mx-auto'>
            Etter måneder med testing har vi utviklet en teknologi som vi er
            stolte av.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 
                     border border-gray-800 hover:border-gray-700 transition-all duration-300'
            >
              {/* Icon */}
              <div className='text-4xl mb-4'>{feature.icon}</div>

              {/* Content */}
              <h3 className='text-xl font-semibold mb-3 text-white'>
                {feature.title}
              </h3>
              <p className='text-gray-400 leading-relaxed'>
                {feature.description}
              </p>

              {/* Hover effect */}
              <div
                className='absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                          rounded-lg pointer-events-none'
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
