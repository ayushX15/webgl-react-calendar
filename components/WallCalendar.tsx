'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useCalendar } from '@/hooks/useCalendar'
import { useRangeSelect } from '@/hooks/useRangeSelect'
import { useNotes } from '@/hooks/useNotes'
import { THEMES } from '@/lib/themes'
import { HOLIDAYS } from '@/lib/holidays'

import SpiralBinding from './SpiralBinding'
import CalendarNav from './CalendarNav'
import CalendarGrid from './CalendarGrid'
import CalendarHero from './CalendarHero'
import RangeBar from './RangeBar'
import NotesPanel from './NotesPanel'

export default function WallCalendar() {
  const { month, year, nextMonth, prevMonth, setMonth, setYear } = useCalendar()

  const {
    start,
    end,
    hover,
    setHover,
    handleClick,
    clearRange,
  } = useRangeSelect()

  const { notes, addNote, deleteNote } = useNotes()

  const [direction, setDirection] = useState(1)

  const handleNext = () => {
    setDirection(1)
    nextMonth()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevMonth()
  }

  const theme = THEMES?.[month] ?? THEMES[0]
  const label = `${theme.label} ${year}`

  const currentMonthStr = String(month + 1).padStart(2, '0')
  const monthHolidays = Object.entries(HOLIDAYS).filter(([dateKey]) => dateKey.startsWith(currentMonthStr)).sort((a, b) => a[0].localeCompare(b[0]))

  const activeNotes = notes.filter(n => {
    const nStart = new Date(n.start)
    const nEnd = n.end ? new Date(n.end) : nStart
    const calStart = new Date(year, month, 1)
    const calEnd = new Date(year, month + 1, 0, 23, 59, 59)
    return nStart <= calEnd && nEnd >= calStart
  })

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      {/* 🔥 MAIN CARD LAYOUT */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl relative">

        <div className="flex flex-wrap lg:flex-nowrap relative z-10">

          {/* LEFT: HERO & HOLIDAYS */}
          <div className="w-full md:w-1/2 p-4 flex flex-col h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={month}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CalendarHero theme={theme} year={year} />
              </motion.div>
            </AnimatePresence>

            {/* Holidays Tracker */}
            {monthHolidays.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-pill rounded-2xl p-5 mt-4 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: theme.accent }} />
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3 ml-2">National Holidays</h3>
                <ul className="space-y-3 ml-2">
                  {monthHolidays.map(([dateKey, name]) => {
                    const [, day] = dateKey.split('-')
                    return (
                      <li key={dateKey} className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-200">
                        <span className="w-2.5 h-2.5 rounded-full mr-3 shadow-md animate-pulse" style={{ backgroundColor: theme.accent, boxShadow: `0 0 10px ${theme.accent}88` }} />
                        <span className="w-7 font-bold opacity-60 text-xs">{day}</span> 
                        <span>{name}</span>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            )}
          </div>

          {/* RIGHT: CALENDAR */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center relative">

            <SpiralBinding color={theme.accent} />

            <CalendarNav
              label={label}
              onPrev={handlePrev}
              onNext={handleNext}
              accent={theme.accent}
              month={month}
              year={year}
              setMonth={setMonth}
              setYear={setYear}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={month}
                custom={direction}
                initial={{ x: direction * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -60, opacity: 0 }}
                transition={{
                  duration: 0.25,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <CalendarGrid
                  year={year}
                  month={month}
                  selStart={start}
                  selEnd={end}
                  hoverDate={hover}
                  onClick={handleClick}
                  onHover={setHover}
                  accent={theme.accent}
                  notes={activeNotes}
                />
              </motion.div>
            </AnimatePresence>

            <RangeBar
              start={start}
              end={end}
              onClear={clearRange}
              accent={theme.accent}
            />

            {/* Floating 'Today' Return Button */}
            <AnimatePresence>
              {!(month === new Date().getMonth() && year === new Date().getFullYear()) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setMonth(new Date().getMonth())
                    setYear(new Date().getFullYear())
                  }}
                  className="absolute bottom-16 right-8 w-14 h-14 flex flex-col items-center justify-center rounded-full glass-panel shadow-2xl border border-white/20 z-40 transition-all hover:bg-white/10"
                  title="Return to Today"
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-0.5">Today</span>
                  <span className="text-lg font-black leading-none drop-shadow-sm" style={{ color: theme.accent }}>
                    {new Date().getDate()}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* 🔥 NOTES (FULL WIDTH BUT CONTROLLED) */}
        <div className="border-t border-white/30 dark:border-white/10 p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md relative z-10">
          <NotesPanel
            notes={activeNotes}
            onAdd={addNote}
            onDelete={deleteNote}
            selStart={start}
            selEnd={end}
            accent={theme.accent}
          />
        </div>

      </div>
    </div>
  )
}