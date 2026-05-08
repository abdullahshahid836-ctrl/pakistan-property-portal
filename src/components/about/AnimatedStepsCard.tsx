'use client'

import { useState, useEffect } from 'react'

const steps = [
  {
    id: 1,
    icon: '🏠',
    label: 'Property Listed',
    description: 'Owner lists property with photos and details',
  },
  {
    id: 2,
    icon: '🔍',
    label: 'Tenant Found',
    description: 'Verified tenants browse and inquire instantly',
  },
  {
    id: 3,
    icon: '🤝',
    label: 'Deal Closed',
    description: 'Secure transaction completed successfully',
  },
]

export default function AnimatedStepsCard() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    setVisibleSteps([])

    const timers: ReturnType<typeof setTimeout>[] = []

    // Show step 0 after 800ms
    timers.push(setTimeout(() => setVisibleSteps([0]), 800))
    // Show step 1 after 1600ms
    timers.push(setTimeout(() => setVisibleSteps([0, 1]), 1600))
    // Show step 2 after 2400ms
    timers.push(setTimeout(() => setVisibleSteps([0, 1, 2]), 2400))
    // Auto-restart after 5500ms
    timers.push(
      setTimeout(() => {
        setVisibleSteps([])
        setAnimKey((k) => k + 1)
      }, 5500)
    )

    return () => timers.forEach(clearTimeout)
  }, [animKey])

  const handleRestart = () => {
    setVisibleSteps([])
    setAnimKey((k) => k + 1)
  }

  return (
    /* Floating steps — NO card box, positioned absolute bottom-right */
    <div
      style={{
        position: 'absolute',
        bottom: '80px',
        right: '60px',
        width: '340px',
        zIndex: 10,
      }}
    >
      {/* Header row: label + progress dots */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontFamily: 'var(--font-syne, sans-serif)',
            fontWeight: 700,
          }}
        >
          How It Works
        </span>

        {/* FIX 5 — Progress dots that expand + fill */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: visibleSteps.includes(i) ? '28px' : '8px',
                height: '4px',
                borderRadius: '2px',
                background: visibleSteps.includes(i)
                  ? '#C8F55A'
                  : 'rgba(255,255,255,0.2)',
                transition: 'all 500ms cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* FIX 3 — Steps appear one by one */}
      <div>
        {steps.map((step, index) => {
          const isVisible = visibleSteps.includes(index)
          const isLast = index === steps.length - 1

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0',
                borderBottom: isLast
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 600ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  background: isVisible
                    ? '#C8F55A'
                    : 'rgba(255,255,255,0.10)',
                  transition: 'background 500ms cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                {step.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-syne, sans-serif)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    fontSize: '14px',
                    lineHeight: 1.3,
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '12px',
                    marginTop: '2px',
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-inter, sans-serif)',
                  }}
                >
                  {step.description}
                </div>
              </div>

              {/* FIX 4 — Checkmark draws in 400ms after step appears */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#C8F55A',
                  transform: isVisible ? 'scale(1)' : 'scale(0)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  transitionDelay: isVisible ? '400ms' : '0ms',
                }}
              >
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1.5 5L4.5 8L10.5 2"
                    stroke="#004737"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )
        })}
      </div>

      {/* Restart button — pill style */}
      <button
        onClick={handleRestart}
        style={{
          marginTop: '24px',
          width: '100%',
          padding: '10px 24px',
          borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'transparent',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '12px',
          fontFamily: 'var(--font-syne, sans-serif)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all 200ms ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
          e.currentTarget.style.color = '#ffffff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M10 6A4 4 0 1 1 6 2V0L9 3L6 6V4A2 2 0 1 0 8 6H10Z" />
        </svg>
        Restart
      </button>
    </div>
  )
}
