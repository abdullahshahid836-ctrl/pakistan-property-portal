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
      "flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 lg:mb-10",
      align === 'center' && "sm:text-center sm:items-center mx-auto max-w-2xl",
      className
    )}>
      <div className={cn(
        "flex flex-col",
        align === 'center' && "items-center"
      )}>
        {eyebrow && (
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1E6BFF] mb-2">
            {eyebrow}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A2E] leading-tight">
          {heading}
        </h2>
        {sub && (
          <p className="text-sm text-[#9CA3AF] mt-2 max-w-xl leading-relaxed">
            {sub}
          </p>
        )}
      </div>
      {right && (
        <div className="mt-4 sm:mt-0">
          {right}
        </div>
      )}
    </div>
  )
}

export default SectionHeader
