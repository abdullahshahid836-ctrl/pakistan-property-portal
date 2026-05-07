'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

interface RevealWrapperProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right' | 'scale'
  delay?: number
}

export function RevealWrapper({
  children,
  className,
  direction = 'up',
  delay = 0,
}: RevealWrapperProps) {
  const { ref, isVisible } = useScrollReveal()

  const base = 'transition-all duration-700'
  const hidden = {
    up:    'opacity-0 translate-y-8',
    left:  'opacity-0 -translate-x-8',
    right: 'opacity-0 translate-x-8',
    scale: 'opacity-0 scale-95',
  }
  const visible = 'opacity-100 translate-y-0 translate-x-0 scale-100'

  return (
    <div
      ref={ref as any}
      className={cn(base, isVisible ? visible : hidden[direction], className)}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  )
}
