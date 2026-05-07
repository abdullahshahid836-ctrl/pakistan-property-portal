'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation, Variant } from 'framer-motion'

interface Props {
  children: React.ReactNode
  width?: 'fit-content' | '100%'
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  delay?: number
  duration?: number
  className?: string
  staggerChildren?: boolean
}

const Reveal = ({ 
  children, 
  width = 'fit-content', 
  direction = 'up', 
  delay = 0.2, 
  duration = 0.5,
  className,
  staggerChildren = false
}: Props) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView, mainControls])

  const getVariants = () => {
    const hidden: Variant = {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      scale: direction === 'scale' ? 0.9 : 1,
    }

    const visible: Variant = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as any, // Custom cubic bezier for Flecto-style smoothness
        staggerChildren: staggerChildren ? 0.1 : 0
      },
    }

    return { hidden, visible }
  }

  return (
    <div 
      ref={ref} 
      style={{ 
        position: 'relative', 
        width, 
        overflow: 'visible',
        willChange: 'transform, opacity' 
      }} 
      className={className}
    >
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Reveal
