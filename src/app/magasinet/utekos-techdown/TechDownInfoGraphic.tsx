'use client'

import { useState } from 'react'
import { Cloud, Droplets, Thermometer, Shield } from 'lucide-react'

export function TechDownInfographic() {
  const [activeFeature, setActiveFeature] = useState<
    'cloudweave' | 'lumea' | null
  >(null)

  return (
    <section className='mt-12 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-light mb-4'>
            Teknologien bak Utekos TechDown™
          </h2>
          <p className='text-gray-400'>Klikk på kortene for å lære mer</p>
        </div>

        {/* Technology Cards Grid - Simplified and Professional */}
        <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {/* CloudWeave Card */}
          <button
            onClick={() =>
              setActiveFeature(
                activeFeature === 'cloudweave' ? null : 'cloudweave'
              )
            }
            className={`text-left transition-all duration-300 ${
              activeFeature === 'cloudweave' ? 'transform scale-105'
              : activeFeature === 'lumea' ? 'opacity-50 transform scale-95'
              : 'hover:transform hover:scale-102'
            }`}
          >
            <div
              className={`bg-gradient-to-br from-blue-900/30 to-blue-900/10 
                          border rounded-xl p-8 transition-all duration-300 ${
                            activeFeature === 'cloudweave' ?
                              'border-blue-400 shadow-2xl shadow-blue-500/20'
                            : 'border-blue-800/50 hover:border-blue-600'
                          }`}
            >
              <div className='flex items-center gap-4 mb-6'>
                <div className='p-3 bg-blue-500/10 rounded-lg'>
                  <Cloud className='w-8 h-8 text-blue-400' />
                </div>
                <h3 className='text-2xl font-light'>CloudWeave™</h3>
              </div>

              <div
                className={`space-y-3 transition-all duration-500 ${
                  activeFeature === 'cloudweave' ? 'max-h-96' : (
                    'max-h-20 overflow-hidden'
                  )
                }`}
              >
                <p className='text-gray-300'>
                  Revolusjonerende syntetisk isolasjon som kombinerer det beste
                  fra to verdener.
                </p>

                {activeFeature === 'cloudweave' && (
                  <ul className='space-y-3 text-gray-300 pt-4 border-t border-blue-800/30'>
                    <li className='flex items-start gap-3'>
                      <span className='text-blue-400 mt-1'>•</span>
                      <span>Mikrofibre som etterligner dunens struktur</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='text-blue-400 mt-1'>•</span>
                      <span>Fanger luft for overlegen isolasjon</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='text-blue-400 mt-1'>•</span>
                      <span>Vannresistent - kollapser ikke i fukt</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='text-blue-400 mt-1'>•</span>
                      <span>Vekt-til-varme ratio på nivå med premium dun</span>
                    </li>
                  </ul>
                )}
              </div>

              {!activeFeature && (
                <p className='text-sm text-blue-400 mt-4'>
                  Klikk for detaljer →
                </p>
              )}
            </div>
          </button>

          {/* Luméa Card */}
          <button
            onClick={() =>
              setActiveFeature(activeFeature === 'lumea' ? null : 'lumea')
            }
            className={`text-left transition-all duration-300 ${
              activeFeature === 'lumea' ? 'transform scale-105'
              : activeFeature === 'cloudweave' ? 'opacity-50 transform scale-95'
              : 'hover:transform hover:scale-102'
            }`}
          >
            <div
              className={`bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 
                          border rounded-xl p-8 transition-all duration-300 ${
                            activeFeature === 'lumea' ?
                              'border-yellow-400 shadow-2xl shadow-yellow-500/20'
                            : 'border-yellow-800/50 hover:border-yellow-600'
                          }`}
            >
              <div className='flex items-center gap-4 mb-6'>
                <div className='p-3 bg-yellow-500/10 rounded-lg'>
                  <Droplets className='w-8 h-8 text-yellow-400' />
                </div>
                <h3 className='text-2xl font-light'>Luméa™</h3>
              </div>

              <div
                className={`space-y-3 transition-all duration-500 ${
                  activeFeature === 'lumea' ? 'max-h-96' : (
                    'max-h-20 overflow-hidden'
                  )
                }`}
              >
                <p className='text-gray-300'>
                  Premium ytterstoff som tåler norsk kystklima med stil.
                </p>

                {activeFeature === 'lumea' && (
                  <ul className='space-y-3 text-gray-300 pt-4 border-t border-yellow-800/30'>
                    <li className='flex items-start gap-3'>
                      <span className='text-yellow-400 mt-1'>•</span>
                      <span>Tettvevd nylon med matt, elegant finish</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='text-yellow-400 mt-1'>•</span>
                      <span>Vårt mest eksklusive og slitesterke stoff</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='text-yellow-400 mt-1'>•</span>
                      <span>Vindtett for bedre varmeisolasjon</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='text-yellow-400 mt-1'>•</span>
                      <span>Myk og behagelig mot huden</span>
                    </li>
                  </ul>
                )}
              </div>

              {!activeFeature && (
                <p className='text-sm text-yellow-400 mt-4'>
                  Klikk for detaljer →
                </p>
              )}
            </div>
          </button>
        </div>

        {/* Bottom Stats with Icons */}
        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto'>
          <div className='text-center'>
            <div
              className='inline-flex items-center justify-center w-16 h-16 
                          bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 
                          rounded-full mb-4'
            >
              <Cloud className='w-8 h-8 text-yellow-400' />
            </div>
            <div className='text-3xl font-light text-yellow-400 mb-2'>30%</div>
            <div className='text-sm text-gray-500'>
              Lettere enn tradisjonell syntetisk isolasjon
            </div>
          </div>

          <div className='text-center'>
            <div
              className='inline-flex items-center justify-center w-16 h-16 
                          bg-gradient-to-br from-blue-500/10 to-blue-500/5 
                          rounded-full mb-4'
            >
              <Shield className='w-8 h-8 text-blue-400' />
            </div>
            <div className='text-3xl font-light text-blue-400 mb-2'>100%</div>
            <div className='text-sm text-gray-500'>Fuktighetsmotstand</div>
          </div>

          <div className='text-center'>
            <div
              className='inline-flex items-center justify-center w-16 h-16 
                          bg-gradient-to-br from-green-500/10 to-green-500/5 
                          rounded-full mb-4'
            >
              <Thermometer className='w-8 h-8 text-green-400' />
            </div>
            <div className='text-3xl font-light text-green-400 mb-2'>3:1</div>
            <div className='text-sm text-gray-500'>Varme-til-vekt ratio</div>
          </div>
        </div>
      </div>
    </section>
  )
}
