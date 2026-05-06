import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  sub?: string
  align?: 'left' | 'center'
  right?: React.ReactNode
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  eyebrow, 
  heading, 
  sub, 
  align = 'center', 
  right,
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 lg:mb-16",
      align === 'center' && "sm:text-center sm:items-center mx-auto max-w-3xl",
      className
    )}>
      <div className={cn(
        "flex flex-col",
        align === 'center' && "items-center"
      )}>
        {eyebrow && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-[1px] bg-flecto-lime" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-flecto-green font-inter">
              {eyebrow}
            </span>
            <div className="w-8 h-[1px] bg-flecto-lime" />
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-flecto-green leading-[1.2] font-syne tracking-tight">
          {heading}
        </h2>
        {sub && (
          <p className="text-base text-flecto-text-2 mt-4 max-w-2xl leading-relaxed font-inter">
            {sub}
          </p>
        )}
      </div>
      {right && (
        <div className="mt-6 sm:mt-0">
          {right}
        </div>
      )}
    </div>
  )
}

export default SectionHeader
