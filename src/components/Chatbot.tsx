'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { getMessages } from '@/lib/getMessages'
import { config } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { ChatState } from '@/lib/types'
import { getInitialMessage, processUserInput } from '@/lib/chatbot'
import { analytics } from '@/lib/analytics'

export function Chatbot({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<ChatState>({ messages: [], step: 'initial', isTyping: false })
  const endRef = useRef<HTMLDivElement>(null)
  const t = getMessages(locale).chatbot

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [state.messages])

  useEffect(() => {
    if (isOpen && state.messages.length === 0) {
      setState((prev) => ({ ...prev, isTyping: true }))
      setTimeout(() => {
        setState((prev) => ({ ...prev, isTyping: false, messages: [...prev.messages, { id: Date.now().toString(), text: getInitialMessage(locale), sender: 'bot' }] }))
      }, 800)
    }
  }, [isOpen])

  const addBotMessage = (text: string) => {
    setState((prev) => ({ ...prev, isTyping: true }))
    setTimeout(() => {
      setState((prev) => ({ ...prev, isTyping: false, messages: [...prev.messages, { id: Date.now().toString(), text, sender: 'bot' }] }))
    }, 600)
  }

  const handleQuickReply = (reply: string, key: 'diagnostic' | 'meeting' | 'whatsapp') => {
    analytics.chatbot.quickReply(key)
    setState((prev) => ({ ...prev, messages: [...prev.messages, { id: Date.now().toString(), text: reply, sender: 'user' }] }))
    if (key === 'diagnostic') addBotMessage(t.responses.diagnostic)
    else if (key === 'meeting') addBotMessage(t.responses.meeting)
    else if (key === 'whatsapp') addBotMessage(t.responses.whatsapp)
    else addBotMessage(t.responses.default)
  }

  const getWhatsAppLink = () => `${config.WHATSAPP_LINK}?text=${encodeURIComponent(t.whatsappMessage)}`

  return (
    <>
      <button type="button" onClick={() => { const next = !isOpen; setIsOpen(next); next ? analytics.chatbot.open() : analytics.chatbot.close() }} className={cn('fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-violet text-white shadow-lg hover:bg-violet-600 transition-all flex items-center justify-center', isOpen && 'rotate-90')} aria-label={isOpen ? 'Fermer' : 'Ouvrir'}>
        {isOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
      </button>
      <div className={cn('fixed bottom-36 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300', isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none')}>
        <div className="bg-violet p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">🤖</div>
            <div><h3 className="font-semibold text-white">{t.title}</h3><p className="text-sm text-white/80">{t.subtitle}</p></div>
          </div>
        </div>
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {state.messages.map((m) => (
            <div key={m.id} className={cn('flex', m.sender === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[80%] px-4 py-2 rounded-2xl', m.sender === 'user' ? 'bg-violet text-white rounded-br-md' : 'bg-gray-100 text-anthracite rounded-bl-md')}><p className="text-sm">{m.text}</p></div>
            </div>
          ))}
          {state.isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md"><div className="flex gap-1"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div className="p-4 border-t border-gray-100 space-y-2">
          {state.step === 'initial' && (
            <>
              <button type="button" onClick={() => handleQuickReply(t.quickReplies.diagnostic, 'diagnostic')} className="w-full text-left px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">{t.quickReplies.diagnostic}</button>
              <button type="button" onClick={() => handleQuickReply(t.quickReplies.meeting, 'meeting')} className="w-full text-left px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">{t.quickReplies.meeting}</button>
              <button type="button" onClick={() => handleQuickReply(t.quickReplies.whatsapp, 'whatsapp')} className="w-full text-left px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">{t.quickReplies.whatsapp}</button>
            </>
          )}
          {state.messages.length >= 2 && (
            <>
              <Link href={`/${locale}/diagnostic`} onClick={() => analytics.chatbot.ctaClick('diagnostic')}><Button variant="primary" size="sm" className="w-full">{t.buttons.startDiagnostic}</Button></Link>
              <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={() => { analytics.chatbot.ctaClick('calendly'); analytics.calendly.click('chatbot') }}><Button variant="secondary" size="sm" className="w-full">{t.buttons.bookMeeting}</Button></a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" onClick={() => { analytics.chatbot.ctaClick('whatsapp'); analytics.whatsapp.click('chatbot') }}><Button variant="primary" size="sm" className="w-full flex items-center justify-center gap-2">💬 {t.buttons.continueWhatsApp}</Button></a>
              <button type="button" onClick={() => setState({ messages: [], step: 'initial', isTyping: false })} className="w-full text-center text-sm text-gray-500 py-2">{t.buttons.restart}</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
