'use client'

import { useState } from 'react'
import { useChat, Chat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send } from 'lucide-react'

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')

  // Opprett Chat instans med DefaultChatTransport fra 'ai' pakken
  const [chat] = useState(
    () =>
      new Chat({
        messages: [],
        transport: new DefaultChatTransport({
          api: '/api/chat'
        })
      })
  )

  const { messages, sendMessage, status, error } = useChat({ chat })

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
      {/* Chat-knapp */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 z-50'
          aria-label='Åpne chat'
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat-vindu */}
      {isOpen && (
        <div className='fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200'>
          {/* Header */}
          <div className='bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center'>
            <div>
              <h3 className='font-semibold text-lg'>Utekos Hjelper</h3>
              <p className='text-sm text-blue-100'>
                Hvordan kan jeg hjelpe deg?
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='hover:bg-blue-700 rounded-full p-1 transition-colors'
              aria-label='Lukk chat'
            >
              <X size={20} />
            </button>
          </div>

          {/* Meldinger */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.length === 0 && (
              <div className='text-center text-gray-500 mt-8'>
                <p>👋 Hei! Jeg er her for å hjelpe deg.</p>
                <p className='text-sm mt-2'>
                  Still meg gjerne spørsmål om produkter eller levering!
                </p>
              </div>
            )}

            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' ?
                      'bg-blue-600 text-white'
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
                className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800'
                disabled={isLoading}
              />
              <button
                type='submit'
                disabled={isLoading || !input.trim()}
                className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors'
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
