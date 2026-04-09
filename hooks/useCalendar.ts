'use client'
import { useState } from 'react'

export function useCalendar() {
  const today = new Date()

  const [month, setMonth] = useState(today.getMonth()) // 0–11
  const [year, setYear] = useState(today.getFullYear())

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(y => y + 1)
    } else {
      setMonth(m => m + 1)
    }
  }

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(y => y - 1)
    } else {
      setMonth(m => m - 1)
    }
  }

  return { month, year, setMonth, setYear, nextMonth, prevMonth }
}