'use client'

import { motion } from 'framer-motion'
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  inRange,
  isSameDay,
} from '@/lib/dateUtils'
import { HOLIDAYS } from '@/lib/holidays'

export default function CalendarGrid({
  year,
  month,
  selStart,
  selEnd,
  hoverDate,
  onClick,
  onHover,
  accent,
  notes,
}: {
  year: number
  month: number
  selStart: Date | null
  selEnd: Date | null
  hoverDate: Date | null
  onClick: (d: Date) => void
  onHover: (d: Date | null) => void
  accent: string
  notes?: any[]
}) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const cells: (Date | null)[] = []

  // Padding before first day
  for (let i = 0; i < firstDay; i++) {
    cells.push(null)
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }

  return (
    <div className="p-4 relative">
      
      {/* Weekday Header */}
      <div className="grid grid-cols-7 mb-6 text-sm font-bold tracking-widest text-center text-gray-800 dark:text-gray-200 uppercase glass-panel py-3 rounded-2xl shadow-sm border border-white/10 mx-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="opacity-90 drop-shadow-sm">{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2 relative z-10">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />

          const isStart = selStart && isSameDay(date, selStart)
          const isEnd = selEnd && isSameDay(date, selEnd)

          const rangeEnd = selEnd
          const isBetween =
            selStart && rangeEnd && inRange(date, selStart, rangeEnd)

          const key = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(
            date.getDate()
          ).padStart(2, '0')}`

          const isHoliday = HOLIDAYS[key]
          
          const hasNote = notes?.some(n => 
            isSameDay(date, new Date(n.start)) || 
            (n.end && isSameDay(date, new Date(n.end))) || 
            (n.end && inRange(date, new Date(n.start), new Date(n.end)))
          )

          const isToday = isSameDay(date, new Date())

          // Compute pill border radii for contiguous liquid look
          let radiiClass = "rounded-xl"
          if (isStart && isBetween && !isEnd) radiiClass = "rounded-l-xl rounded-r-none"
          if (isEnd && isBetween && !isStart) radiiClass = "rounded-r-xl rounded-l-none"
          if (isBetween && !isStart && !isEnd) radiiClass = "rounded-none"

          return (
            <div 
               key={i} 
               className={`relative h-12 flex items-center justify-center ${isBetween ? 'z-0' : 'z-10'}`}
               onMouseEnter={() => onHover(date)}
            >
              {isBetween && (
                <div 
                  className={`absolute inset-0 top-1 bottom-1 ${radiiClass}`} 
                  style={{ background: `${accent}33`, backdropFilter: 'blur(8px)' }}
                />
              )}

              <motion.div
                whileHover={{ scale: 1.15, zIndex: 50, rotate: isBetween ? 0 : 3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => onClick(date)}
                className={`relative w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-sm font-medium z-10 ${
                  isStart || isEnd ? 'shadow-lg text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-white/20 dark:hover:bg-white/10'
                }`}
                style={
                  isStart || isEnd
                    ? {
                        background: accent,
                        boxShadow: `0 4px 20px ${accent}88`
                      }
                    : {}
                }
              >
                {isToday && !isStart && !isEnd && (
                  <motion.div 
                    animate={{
                      borderRadius: ["50% 50% 50% 50%", "43% 57% 65% 35%", "58% 42% 33% 67%", "50% 50% 50% 50%"],
                      rotate: [0, 90, 180, 360]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 backdrop-blur-md border-[1.5px] border-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-0"
                    style={{ background: `${accent}33` }}
                  />
                )}
                
                <span className="relative z-10">{date.getDate()}</span>

                {/* Markers Container */}
                <div className="absolute bottom-1.5 flex gap-1 items-center justify-center pointer-events-none">
                  {isHoliday && (
                    <span 
                      className="w-1.5 h-1.5 rounded-full shadow-sm"
                      style={{ backgroundColor: isStart || isEnd ? 'white' : '#ef4444' }} 
                    />
                  )}
                  {hasNote && (
                    <span 
                      className="w-1.5 h-1.5 rounded-full shadow-sm"
                      style={{ backgroundColor: isStart || isEnd ? 'white' : '#3b82f6' }} 
                    />
                  )}
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}