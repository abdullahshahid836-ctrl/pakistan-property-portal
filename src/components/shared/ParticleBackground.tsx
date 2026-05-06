'use client'

import React, { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    const particleCount = 40

    class Particle {
      x: number
      y: number
      size: number
      speedY: number
      color: string

      constructor() {
        const w = canvas?.width || 1920
        const h = canvas?.height || 1080
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.size = Math.random() * 2 + 1
        this.speedY = -(Math.random() * 0.5 + 0.2) // Slow upward drift
        this.color = Math.random() > 0.5 ? '#ffffff' : '#93C5FD'
      }

      update() {
        const h = canvas?.height || 1080
        const w = canvas?.width || 1920
        this.y += this.speedY
        if (this.y < 0) {
          this.y = h
          this.x = Math.random() * w
        }
      }

      draw() {
        const context = canvas?.getContext('2d')
        if (!context) return
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.globalAlpha = 0.25
        context.fill()
      }
    }

    const init = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || 600
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || 600
    }

    init()
    animate()
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
