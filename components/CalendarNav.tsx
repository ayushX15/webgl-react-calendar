'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 60 }, (_, i) => CURRENT_YEAR - 30 + i)

export default function CalendarNav({
  label, onPrev, onNext, accent, month, year, setMonth, setYear
}: {
  label: string
  onPrev: () => void
  onNext: () => void
  accent: string
  month?: number
  year?: number
  setMonth?: (m: number) => void
  setYear?: (y: number) => void
}) {
  const [showPicker, setShowPicker] = useState(false)
  const monthRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)

  const audioCtx = useRef<AudioContext | null>(null)
  const initializedTicks = useRef(false)
  const lastMonthTick = useRef(-1)
  const lastYearTick = useRef(-1)

  const playTick = () => {
    try {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      const ctx = audioCtx.current
      if (ctx.state === 'suspended') ctx.resume()
      
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      
      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      
      osc.type = 'sine'
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)
      
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.02)
      
      gain.gain.setValueAtTime(0.8, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02)
      
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.02)
    } catch(e) {}
  }

  const handleMonthScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!initializedTicks.current) return
    const idx = Math.round(e.currentTarget.scrollTop / 40)
    if (idx !== lastMonthTick.current && lastMonthTick.current !== -1) playTick()
    lastMonthTick.current = idx
  }

  const handleYearScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!initializedTicks.current) return
    const idx = Math.round(e.currentTarget.scrollTop / 40)
    if (idx !== lastYearTick.current && lastYearTick.current !== -1) playTick()
    lastYearTick.current = idx
  }

  // Scroll to active items when opened
  useEffect(() => {
    if (showPicker && month !== undefined && year !== undefined) {
      initializedTicks.current = false // pause ticks during auto-scroll
      if (monthRef.current) monthRef.current.scrollTop = month * 40
      if (yearRef.current) {
        const yIndex = YEARS.indexOf(year)
        if (yIndex !== -1) yearRef.current.scrollTop = yIndex * 40
      }
      // Resume ticking capabilities shortly after snap
      setTimeout(() => {
        if (monthRef.current) lastMonthTick.current = Math.round(monthRef.current.scrollTop / 40)
        if (yearRef.current) lastYearTick.current = Math.round(yearRef.current.scrollTop / 40)
        initializedTicks.current = true
      }, 100)
    }
  }, [showPicker, month, year])

  return (
    <div className="flex items-center justify-between px-6 py-4 relative z-50">
      <motion.button 
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 dark:bg-black/30 backdrop-blur-md shadow-sm border border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/20 transition-colors z-20"
      >
        <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
      </motion.button>
      
      <div className="relative flex items-center justify-center">
        <h2 
          className="text-xl md:text-2xl font-bold tracking-tight cursor-pointer hover:opacity-70 transition-opacity z-20 relative select-none"
          style={{ color: accent }}
          onClick={() => setShowPicker(!showPicker)}
          title="Click to jump to a specific date"
        >
          {label}
        </h2>

        <AnimatePresence>
          {showPicker && setMonth && setYear && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowPicker(false)} 
              />
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a] rounded-3xl p-4 flex gap-2 shadow-2xl backdrop-blur-3xl border border-white/5"
                style={{ height: '200px' }}
              >
                {/* Months Scroller */}
                <div 
                  ref={monthRef}
                  onScroll={handleMonthScroll}
                  className="w-24 overflow-y-auto snap-y snap-mandatory glass-panel rounded-2xl relative scrollbar-none"
                  style={{ maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)' }}
                >
                  <div className="h-[80px]" /> {/* Top padding */}
                  {MONTHS.map((m, i) => (
                    <div 
                      key={m} 
                      className={`h-[40px] flex items-center justify-center snap-center cursor-pointer font-medium transition-colors ${
                        i === month ? 'text-lg scale-110 drop-shadow-md' : 'text-sm opacity-40 hover:opacity-100'
                      }`}
                      style={i === month ? { color: accent, fontWeight: 'bold' } : {}}
                      onClick={() => setMonth(i)}
                    >
                      {m}
                    </div>
                  ))}
                  <div className="h-[80px]" /> {/* Bottom padding */}
                </div>

                {/* Years Scroller */}
                <div 
                  ref={yearRef}
                  onScroll={handleYearScroll}
                  className="w-24 overflow-y-auto snap-y snap-mandatory glass-panel rounded-2xl relative scrollbar-none"
                  style={{ maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)' }}
                >
                  <div className="h-[80px]" /> {/* Top padding */}
                  {YEARS.map((y) => (
                    <div 
                      key={y} 
                      className={`h-[40px] flex items-center justify-center snap-center cursor-pointer font-medium transition-colors ${
                        y === year ? 'text-lg scale-110 drop-shadow-md' : 'text-sm opacity-40 hover:opacity-100'
                      }`}
                      style={y === year ? { color: accent, fontWeight: 'bold' } : {}}
                      onClick={() => setYear(y)}
                    >
                      {y}
                    </div>
                  ))}
                  <div className="h-[80px]" /> {/* Bottom padding */}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.button 
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 dark:bg-black/30 backdrop-blur-md shadow-sm border border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/20 transition-colors z-20"
      >
        <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
      </motion.button>
    </div>
  )
}