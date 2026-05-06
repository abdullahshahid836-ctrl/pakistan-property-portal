'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const frameCount = 192
  
  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.src = `/animation/frame_${i}_delay-0.04s.webp`
      img.onload = () => {
        loadedCount++
        if (loadedCount === frameCount) {
          setImages(loadedImages)
          renderFrame(0, loadedImages)
        }
      }
      loadedImages[i] = img
    }
  }, [])

  const renderFrame = (index: number, imgs: HTMLImageElement[]) => {
    const canvas = canvasRef.current
    if (!canvas || !imgs[index]) return

    const context = canvas.getContext('2d')
    if (!context) return

    const img = imgs[index]
    
    // Cover the canvas like background-size: cover
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const imgWidth = img.width
    const imgHeight = img.height
    
    const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
    const newWidth = imgWidth * ratio
    const newHeight = imgHeight * ratio
    const x = (canvasWidth - newWidth) / 2
    const y = (canvasHeight - newHeight) / 2

    context.clearRect(0, 0, canvasWidth, canvasHeight)
    context.drawImage(img, x, y, newWidth, newHeight)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / scrollHeight))
      
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      )

      if (images.length === frameCount) {
        requestAnimationFrame(() => renderFrame(frameIndex, images))
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
        if (images.length === frameCount) {
          renderFrame(0, images)
        }
      }
    })

    // Set initial size
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', () => {})
    }
  }, [images])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
      <canvas 
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-[#F8F9FA]/40" />
    </div>
  )
}
