'use client'

import React from 'react'
import { motion } from 'framer-motion'

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-[3rem] overflow-hidden border border-[#DDD8CF] shadow-[0_8px_24px_rgba(0,0,0,0.02)] h-[600px] flex flex-col">
      <div className="relative h-64 bg-[#F5F0E8] overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </div>
      <div className="p-8 space-y-6 flex-1">
        <div className="h-8 bg-[#F5F0E8] rounded-xl w-3/4 relative overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        <div className="h-4 bg-[#F5F0E8] rounded-lg w-1/2 relative overflow-hidden">
           <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.4 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>
        <div className="h-20 bg-[#F5F0E8] rounded-3xl w-full relative overflow-hidden">
           <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.6 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>
        <div className="mt-auto pt-6 border-t border-[#F5F0E8] flex gap-4">
          <div className="h-10 bg-[#F5F0E8] rounded-xl flex-1 relative overflow-hidden" />
          <div className="h-10 bg-[#F5F0E8] rounded-xl flex-1 relative overflow-hidden" />
          <div className="h-10 bg-[#F5F0E8] rounded-xl flex-1 relative overflow-hidden" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
