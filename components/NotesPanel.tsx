'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fmtDate } from '@/lib/dateUtils'

type Note = {
  id: string
  text: string
  start: Date
  end: Date
}

export default function NotesPanel({
  notes,
  onAdd,
  onDelete,
  selStart,
  selEnd,
  accent,
}: {
  notes: Note[]
  onAdd: (t: string, s: Date, e: Date) => void
  onDelete: (id: string) => void
  selStart: Date | null
  selEnd: Date | null
  accent: string
}) {
  const [text, setText] = useState('')
  const canAdd = selStart && text.trim()

  return (
    <div className="p-4 w-full flex flex-col lg:flex-row gap-8">
      {/* LEFT: ADD NOTE AREA */}
      <div className="relative w-full lg:w-1/2 shrink-0">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a descriptive note for the selected date or range…"
          className="w-full glass-input rounded-2xl p-4 text-sm resize-none pb-14 min-h-[120px]"
          rows={3}
        />

        <motion.button
          whileHover={canAdd ? { scale: 1.05 } : {}}
          whileTap={canAdd ? { scale: 0.95 } : {}}
          disabled={!canAdd}
          onClick={() => {
            if (canAdd) {
              onAdd(text, selStart, selEnd || selStart)
              setText('')
            }
          }}
          style={canAdd ? { 
            background: accent, 
            boxShadow: `0 4px 15px ${accent}66` 
          } : {
            background: 'rgba(150, 150, 150, 0.2)'
          }}
          className={`absolute bottom-3 right-3 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            canAdd ? 'text-white cursor-pointer' : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          Add Note
        </motion.button>
      </div>

      {/* RIGHT: SECURE NOTES BOARD */}
      <div className="relative w-full lg:w-1/2 flex flex-col h-[120px] lg:h-auto">
        {notes.length === 0 ? (
          <div className="h-full min-h-[120px] flex items-center justify-center border-2 border-dashed border-gray-400/20 rounded-2xl text-gray-500 text-sm opacity-60">
            No secure notes recorded yet.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-webkit snap-y text-left">
            <div className="flex flex-col gap-3 pb-2 pt-1">
              <AnimatePresence>
                {notes.map((note) => (
                  <motion.div 
                    key={note.id} 
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                    className="glass-pill rounded-xl p-4 text-sm w-full snap-start relative group shadow-sm flex flex-col"
                  >
                    <div 
                      className="w-2 h-2 rounded-full absolute top-5 left-3 shadow-sm"
                      style={{ backgroundColor: '#3b82f6' }}
                    />
                    <p className="text-xs font-semibold pl-4 text-gray-500 dark:text-gray-400 mb-1">
                      {fmtDate(note.start)} 
                      {note.end && new Date(note.start).getTime() !== new Date(note.end).getTime() && (
                        <> <span className="opacity-50">→</span> {fmtDate(note.end)}</>
                      )}
                    </p>

                    <p className="pl-4 text-gray-800 dark:text-gray-200 leading-snug">{note.text}</p>

                    <button 
                      onClick={() => onDelete(note.id)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}