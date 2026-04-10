'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SUGGESTIONS = [
  'A booking app for my hair salon',
  'An internal tool for delivery drivers',
  'A workout tracker with streaks',
  'A menu and ordering app for my restaurant',
]

export function Hero() {
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  const handleSubmit = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    router.push(`/build?prompt=${encodeURIComponent(trimmed)}`)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid-bg fade-bottom" />

      {/* Cyan glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgb(var(--accent) / 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full animate-fade-up">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
          AI-powered app builder
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05] mb-6">
          What will you{' '}
          <span className="gradient-text">build</span>{' '}
          today?
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-ink-2 max-w-xl mb-10 leading-relaxed">
          Create apps and websites by chatting with AI.{' '}
          <span className="text-ink">No code required.</span>
        </p>

        {/* Prompt input */}
        <div className={`w-full max-w-2xl rounded-xl border bg-card glow-border transition-all duration-200 ${
          focused ? 'border-accent/50' : 'border-edge/15'
        }`}>
          <div className="flex items-end gap-2 p-3 pl-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(input)
                }
              }}
              placeholder="Describe your app or website..."
              rows={2}
              className="flex-1 bg-transparent text-ink placeholder:text-ink-3 text-sm resize-none outline-none leading-relaxed"
            />
            <button
              onClick={() => handleSubmit(input)}
              disabled={!input.trim()}
              className="shrink-0 px-4 py-2 rounded-lg bg-accent text-black text-sm font-semibold glow-btn disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              Build →
            </button>
          </div>

          {/* Secondary actions */}
          <div className="px-4 pb-3 flex items-center gap-3 text-xs text-ink-3">
            <span>or import from</span>
            <button className="hover:text-ink-2 transition-colors">Figma</button>
            <span>·</span>
            <button className="hover:text-ink-2 transition-colors">GitHub</button>
          </div>
        </div>

        {/* Suggestion pills */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setInput(s)
                handleSubmit(s)
              }}
              className="text-xs px-3 py-1.5 rounded-full border border-edge/15 bg-card text-ink-2 hover:text-ink hover:border-accent/30 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink-3 text-xs animate-bounce">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
