'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const frameCount = 192
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = []
    let loadedCount = 0

    const preload = async () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        img.src = `/animation/frame_${i}_delay-0.04s.webp`
        img.onload = () => {
          loadedCount++
          if (loadedCount === frameCount) {
            setImages(loadedImages)
            setIsLoaded(true)
            render(0, loadedImages)
          }
        }
        loadedImages[i] = img
      }
    }
    preload()
  }, [])

  const render = (progress: number, imgs: HTMLImageElement[]) => {
    const canvas = canvasRef.current
    if (!canvas || imgs.length !== frameCount) return

    const context = canvas.getContext('2d')
    if (!context) return

    const currentFrameIdx = Math.floor(progress * (frameCount - 1))
    const nextFrameIdx = Math.min(currentFrameIdx + 1, frameCount - 1)
    const weight = (progress * (frameCount - 1)) % 1

    const img1 = imgs[currentFrameIdx]
    const img2 = imgs[nextFrameIdx]

    if (!img1 || !img2) return

    const draw = (img: HTMLImageElement, alpha: number) => {
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const imgWidth = img.width
      const imgHeight = img.height
      
      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
      const newWidth = imgWidth * ratio
      const newHeight = imgHeight * ratio
      const x = (canvasWidth - newWidth) / 2
      const y = (canvasHeight - newHeight) / 2

      context.globalAlpha = alpha
      context.drawImage(img, x, y, newWidth, newHeight)
    }

    context.clearRect(0, 0, canvas.width, canvas.height)
    draw(img1, 1)
    if (weight > 0) {
      draw(img2, weight)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / scrollHeight))
      requestAnimationFrame(() => render(scrollFraction, images))
    }

    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1
        canvasRef.current.width = window.innerWidth * dpr
        canvasRef.current.height = window.innerHeight * dpr
        const context = canvasRef.current.getContext('2d')
        if (context) context.scale(dpr, dpr)
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollTop = window.scrollY
        render(Math.max(0, Math.min(1, scrollTop / scrollHeight)), images)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [images])

  return (
    <div className={cn(
      "fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000",
      isLoaded ? "opacity-40" : "opacity-0"
    )}>
      <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }} />
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
