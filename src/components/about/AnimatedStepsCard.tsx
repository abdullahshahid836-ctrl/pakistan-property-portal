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
  const [currentStep, setCurrentStep] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(true)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timers: ReturnType<typeof setTimeout>[] = []

    steps.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, index])
        setCurrentStep(index)
      }, index * 900)
      timers.push(timer)
    })

    const resetTimer = setTimeout(() => {
      setVisibleSteps([])
      setCurrentStep(0)
      setKey((prev) => prev + 1)
    }, steps.length * 900 + 2000)
    timers.push(resetTimer)

    return () => timers.forEach(clearTimeout)
  }, [key, isPlaying])

  const handleRestart = () => {
    setVisibleSteps([])
    setCurrentStep(0)
    setIsPlaying(true)
    setKey((prev) => prev + 1)
  }

  return (
    <div className="relative z-10 flex items-center justify-center h-full p-8">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-[0_24px_64px_rgba(0,0,0,0.3)]">

        {/* Card header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[10px] text-[#C8F55A] font-bold uppercase tracking-[0.15em] font-syne mb-1">
              How It Works
            </div>
            <h3 className="font-syne font-bold text-white text-lg">
              Pakistan Property Portal
            </h3>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= currentStep && visibleSteps.length > 0
                    ? 'bg-[#C8F55A] w-5'
                    : 'bg-white/20 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Steps list */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-500 ${
                visibleSteps.includes(index)
                  ? 'opacity-100 translate-y-0 bg-white/[0.08]'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon circle */}
              <div
                className={`w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl transition-all duration-400 ${
                  visibleSteps.includes(index)
                    ? 'bg-[#C8F55A] scale-100'
                    : 'bg-white/10 scale-90'
                }`}
              >
                {step.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="font-syne font-bold text-white text-sm leading-tight">
                  {step.label}
                </div>
                <div className="font-inter text-white/60 text-xs mt-0.5 leading-relaxed">
                  {step.description}
                </div>
              </div>

              {/* Checkmark */}
              <div
                className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                  visibleSteps.includes(index)
                    ? 'bg-[#C8F55A] scale-100 opacity-100'
                    : 'scale-0 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="#004737"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={visibleSteps.includes(index) ? 'animate-draw-check' : ''}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Restart button */}
        <button
          onClick={handleRestart}
          className="mt-5 w-full py-2.5 rounded-2xl border border-white/20 text-white/70 text-xs font-syne font-bold uppercase tracking-[0.1em] hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M10 6A4 4 0 1 1 6 2V0L9 3L6 6V4A2 2 0 1 0 8 6H10Z" />
          </svg>
          Restart
        </button>
      </div>
    </div>
  )
}
