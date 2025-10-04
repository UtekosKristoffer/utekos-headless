/* eslint-disable capitalized-comments */
'use client'

import { ChatBubble } from '@/components/chat/ChatBubble'
import { NameCursor } from '@/components/chat/NameCursor'
import { SendIcon } from '@/components/icon/SendIcon'
import { useEffect, useState } from 'react'

export function AnimatedChat() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const animationProps = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
    viewport: { once: true, amount: 0.8 }
  })

  return (
    <div className='flex h-full flex-col mx-auto justify-center gap-6 p-4'>
      <ChatBubble
        side='left'
        {...(isMounted ? animationProps(0.2) : {})}
        nameCursor={
          <NameCursor
            name='Hanne'
            side='left'
            color='#dc2626' // rød
            className='top-1/2 right-2 md:-right-8 -translate-y-1/2 translate-x-full'
          />
        }
      >
        <p>
          Husk å pakke noe skikkelig varmt til kvelden på hytten, det blir fort
          kaldt 🥶
        </p>
      </ChatBubble>

      <ChatBubble
        side='right'
        {...(isMounted ? animationProps(0.4) : {})}
        nameCursor={
          <NameCursor
            name='Thomas'
            side='right'
            color='#2563eb' // blå
            className='md:bottom-[-8px] bottom-[-14px] md:-left-6 left-5 -translate-x-full'
          />
        }
      >
        <p>Slapp av, jeg tar med Utekos-dressen min. Den er alt vi trenger.</p>
      </ChatBubble>

      <ChatBubble side='left' {...(isMounted ? animationProps(0.6) : {})}>
        <p>Genialt! Da slipper vi å drasse med oss de gamle pleddene.</p>
      </ChatBubble>

      {/* Siste “usendt” – Thomas (høyre) */}
      <div className='flex justify-end'>
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
    </div>
  )
}
