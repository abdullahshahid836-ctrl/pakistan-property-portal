'use client'
import { ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface RevealWrapperProps {
  children: ReactNode
  animation?: 'fade-up' | 'fade-in' | 'fade-in-left' | 'fade-in-right' | 'scale-in'
  delay?: number
  duration?: number
  className?: string
}

export default function RevealWrapper({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = ''
}: RevealWrapperProps) {
  const { ref, isVisible } = useScrollReveal()

  const animationStyles = {
    'fade-up': isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
    'fade-in': isVisible ? 'opacity-100' : 'opacity-0',
    'fade-in-left': isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0',
    'fade-in-right': isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0',
    'scale-in': isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
  }

  return (
    <div
      ref={ref as any}
      className={`transition-all cubic-bezier(0.16, 1, 0.3, 1) ${animationStyles[animation]} ${className}`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
