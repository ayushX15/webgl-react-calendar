'use client'
import { useEffect, useState } from 'react'

type Note = {
  id: string
  text: string
  start: Date
  end: Date
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])

  // LOAD FROM STORAGE
  useEffect(() => {
    const stored = localStorage.getItem('calendar-notes')

    if (stored) {
      const parsed = JSON.parse(stored, (key, value) => {
        if (key === 'start' || key === 'end') {
          return new Date(value)
        }
        return value
      })
      // eslint-disable-next-line
      setNotes(parsed)
    }
  }, [])

  // SAVE TO STORAGE
  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (text: string, start: Date, end: Date) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      text,
      start,
      end,
    }

    setNotes((prev) => [...prev, newNote])
  }

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  return {
    notes,
    addNote,
    deleteNote,
  }
}