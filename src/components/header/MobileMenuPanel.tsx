'use client'

import { MobileMenuItem } from '@/components/header/MobileMenuItem'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { motion, AnimatePresence } from 'framer-motion'
import type { MenuItem } from '@types'
import { Sparkles } from 'lucide-react'
import { HeaderLogo } from './HeaderLogo'
export function MobileMenuPanel({
  menu = [],
  isOpen,
  onOpenChange
}: {
  menu?: MenuItem[]
  isOpen: boolean
  onOpenChange: (_open: boolean) => void
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className='hidden'>Åpne mobilmeny</button>
      </SheetTrigger>

      <SheetContent
        side='left'
        className='w-full max-w-sm p-0 md:hidden bg-neutral-950 border-neutral-800'
      >
        {/* Ambient background glow */}
        <div className='absolute inset-0 -z-10 opacity-20 pointer-events-none'>
          <div
            className='absolute left-0 top-1/4 h-[300px] w-[300px] blur-3xl'
            style={{
              background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
            }}
          />
          <div
            className='absolute right-0 bottom-1/4 h-[300px] w-[300px] blur-3xl'
            style={{
              background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
            }}
          />
        </div>

        <SheetHeader className='relative p-6 border-b border-neutral-800'>
          {/* Gradient accent line */}
          <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent' />

          <div className='flex items-center gap-2 mb-2'>
            <HeaderLogo />
            <SheetTitle className='text-xl ml-2 font-bold text-foreground'>
              Meny
            </SheetTitle>
          </div>
          <p className='text-sm text-muted-foreground'>
            Utforsk vår kolleksjon
          </p>
        </SheetHeader>

        <nav className='relative flex-grow overflow-y-auto p-4'>
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='flex flex-col gap-2'
              >
                {menu.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <MobileMenuItem item={item} />
                  </motion.div>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenuPanel
