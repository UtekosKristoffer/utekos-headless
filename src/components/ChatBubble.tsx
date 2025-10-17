'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat, Chat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { X, Send, Headset } from 'lucide-react'

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const chatWindowRef = useRef<HTMLDivElement>(null)

  const welcomeMessage =
    'Hei! 👋 Jeg er Kaya fra Utekos. Jeg hjelper deg gjerne med spørsmål om våre produkter, størrelser, levering eller hva som helst annet du lurer på. Hva kan jeg hjelpe deg med i dag? 😊'

  // Opprett Chat instans med velkomstmelding
  const [chat] = useState(
    () =>
      new Chat({
        messages: [
          {
            id: 'welcome',
            role: 'assistant',
            parts: [
              {
                type: 'text',
                text: welcomeMessage
              }
            ]
          }
        ],
        transport: new DefaultChatTransport({
          api: '/api/chat'
        })
      })
  )

  const { messages, sendMessage, status, error } = useChat({ chat })

  // Effekt for å låse scrolling av bakgrunnen når chatten er åpen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // NY LOGIKK: Effekt for å lytte etter klikk utenfor chat-vinduet
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        chatWindowRef.current
        && !chatWindowRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    // Legg til lytteren kun når vinduet er åpent
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Rydd opp lytteren når komponenten lukkes eller fjernes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen]) // Denne effekten er avhengig av 'isOpen'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === 'submitted' || status === 'streaming')
      return

    sendMessage({ text: input })
    setInput('')
  }

  const isLoading = status === 'submitted' || status === 'streaming'

  return (
    <>
      {/* Chat-knapp - Med Headset ikon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='fixed bottom-6 right-6 bg-sky-800 hover:bg-sky-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 z-50'
          aria-label='Chat med Kaya'
        >
          <Headset size={24} />
        </button>
      )}

      {/* Chat-vindu */}
      {isOpen && (
        <div
          ref={chatWindowRef} // Legger til referansen her
          className='fixed bottom-0 left-0 right-0 w-full h-[85vh] rounded-t-lg 
                     sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 sm:h-[600px] sm:rounded-lg 
                     bg-white shadow-2xl flex flex-col z-50 border border-gray-200'
        >
          <div className='bg-sky-800 text-white p-4 rounded-t-lg flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <div className='bg-emerald-700 p-2 rounded-full'>
                <Headset size={20} />
              </div>

              <div>
                <h3 className='font-semibold text-lg'>Kaya</h3>
                <p className='text-sm text-blue-100'>
                  Utekos kundeservice-chatbot
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className='hover:bg-sky-700rounded-full p-1 transition-colors'
              aria-label='Lukk chat'
            >
              <X size={20} />
            </button>
          </div>

          {/* Meldinger */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  (message.role as string) === 'user' ?
                    'justify-end'
                  : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    (message.role as string) === 'user' ?
                      'bg-sky-800 text-white'
                    : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.parts.map((part, i) => {
                    if (part.type === 'text') {
                      return (
                        <p key={i} className='text-sm whitespace-pre-wrap'>
                          {part.text}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className='flex justify-start'>
                <div className='bg-gray-100 rounded-lg p-3'>
                  <div className='flex space-x-2'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                <p className='text-sm text-red-600'>
                  En feil oppstod. Prøv igjen senere.
                </p>
              </div>
            )}
          </div>

          {/* Input-felt */}
          <form
            onSubmit={handleSubmit}
            className='p-4 border-t border-gray-200'
          >
            <div className='flex space-x-2'>
              <input
                type='text'
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder='Skriv din melding...'
                className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-800 text-gray-800'
                disabled={isLoading}
              />
              <button
                type='submit'
                disabled={isLoading || !input.trim()}
                className='bg-sky-700 hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors'
                aria-label='Send melding'
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
