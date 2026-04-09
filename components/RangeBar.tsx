'use client'

import { fmtDate } from '@/lib/dateUtils'
import { motion, AnimatePresence } from 'framer-motion'

export default function RangeBar({ start, end, onClear, accent }: {
  start: Date | null
  end: Date | null
  onClear: () => void
  accent: string
}) {
  const daysCount = start && end ? Math.abs(Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))) + 1 : 1

  return (
    <div className="px-6 pb-2 min-h-[48px] flex justify-center">
      <AnimatePresence>
        {start && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-pill rounded-full pr-1.5 pl-5 py-1.5 flex items-center gap-4 shadow-lg origin-center"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 tracking-tight">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: accent }} />
                {fmtDate(start)}
              </span>
              {end && (
                <>
                  <span className="opacity-40">→</span>
                  <span>{fmtDate(end)}</span>
                  {start.getTime() !== end.getTime() && (
                    <span className="opacity-60 ml-1 text-xs px-2 py-0.5 rounded-full bg-white/10 dark:bg-black/20">({daysCount} days)</span>
                  )}
                </>
              )}
            </div>
            
            <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-600" />
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClear}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-red-500 hover:text-white transition-colors text-xs"
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}