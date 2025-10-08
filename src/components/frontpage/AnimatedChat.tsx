'use client'

import { ChatBubble } from '@/components/chat/ChatBubble'
import { NameCursor } from '@/components/chat/NameCursor'
import { SendIcon } from '@/components/icon/SendIcon'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export function AnimatedChat() {
  return (
    // ENDRING 1: Økt gap for å gi mer plass til animasjonen på mobil
    <div className='relative flex h-full flex-col mx-auto justify-center gap-8 p-4 pt-4'>
      {/* --- Melding 1: Hanne --- */}
      <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
        <ChatBubble side='left'>
          <p>
            Husk å pakke noe skikkelig varmt til kvelden på hytten, det blir
            fort kaldt 🥶
          </p>
        </ChatBubble>
      </AnimatedBlock>

      {/* --- Hannes peker (KUN FOR MOBIL) --- */}
      <AnimatedBlock
        className='flex justify-end pr-8 will-animate-fade-in-up md:hidden'
        delay='0.3s'
      >
        <NameCursor name='Hanne' side='left' color='#dc2626' />
      </AnimatedBlock>

      {/* --- Melding 2: Thomas --- */}
      <AnimatedBlock className='will-animate-fade-in-up' delay='0.4s'>
        <ChatBubble side='right'>
          <p>Slapp av, jeg tar med Utekosen min. Den er alt vi trenger.</p>
        </ChatBubble>
      </AnimatedBlock>

      {/* --- Thomas sin peker (KUN FOR MOBIL) --- */}
      <AnimatedBlock
        className='flex justify-start pl-8 will-animate-fade-in-up md:hidden'
        delay='0.5s'
      >
        <NameCursor name='Thomas' side='right' color='#2563eb' />
      </AnimatedBlock>

      {/* --- Melding 3: Hanne --- */}
      <AnimatedBlock className='will-animate-fade-in-up' delay='0.6s'>
        <ChatBubble side='left'>
          <p>Genialt! Da slipper vi å drasse med oss de gamle pleddene.</p>
        </ChatBubble>
      </AnimatedBlock>

      {/* --- Siste "usendt" melding --- */}
      <div className='flex justify-end mt-2'>
        <div className='relative max-w-[80%] rounded-lg border border-neutral-800 bg-sidebar-foreground p-3'>
          <div className='flex items-center gap-2'>
            <p className='flex items-center whitespace-nowrap text-base text-foreground/90'>
              <span>Nettopp. Mer plass til vinen 😉</span>
              <span className='ml-1 inline-block h-4 w-0.5 animate-blinking-cursor bg-foreground' />
            </p>
            <span
              className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-foreground text-background'
              aria-hidden
              title='Send'
            >
              <SendIcon className='h-3 w-3' />
            </span>
          </div>
        </div>
      </div>

      {/* --- PEKERE (KUN FOR DESKTOP) --- */}
      <div className='hidden md:block'>
        <NameCursor
          name='Hanne'
          side='left'
          color='#dc2626'
          className='absolute top-[22%] right-[15%]'
        />
        {/* ENDRING 2: Justert posisjon for Thomas på desktop */}
        <NameCursor
          name='Thomas'
          side='right'
          color='#2563eb'
          className='absolute top-[42%] left-[18%]'
        />
      </div>
    </div>
  )
}
