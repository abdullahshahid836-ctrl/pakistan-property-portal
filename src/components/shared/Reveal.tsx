'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation, Variant, useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  width?: 'fit-content' | '100%'
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'clip'
  delay?: number
  duration?: number
  className?: string
  staggerChildren?: boolean
  threshold?: number
}

const Reveal = ({ 
  children, 
  width = 'fit-content', 
  direction = 'up', 
  delay = 0.2, 
  duration = 0.8,
  className,
  staggerChildren = false,
  threshold = 0.1
}: Props) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const mainControls = useAnimation()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView, mainControls])

  const getVariants = () => {
    if (shouldReduceMotion) return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } }
    }

    const variants: Record<string, Variant> = {
      hidden: {
        opacity: 0,
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        scale: direction === 'scale' ? 0.95 : 1,
        clipPath: direction === 'clip' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 0)',
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        clipPath: 'inset(0 0% 0 0)',
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1] as any,
          staggerChildren: staggerChildren ? 0.1 : 0
        },
      },
    }

    return variants
  }

  return (
    <div 
      ref={ref} 
      style={{ 
        position: 'relative', 
        width, 
        overflow: direction === 'clip' ? 'hidden' : 'visible'
      }} 
      className={className}
    >
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={mainControls}
        style={{ willChange: isInView ? 'auto' : 'transform, opacity, clip-path' }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Reveal
