'use client'
import { useState } from 'react'

export function useRangeSelect() {
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  const [hover, setHover] = useState<Date | null>(null)

  const handleClick = (date: Date) => {
    // First click OR reset
    if (!start || (start && end)) {
      setStart(date)
      setEnd(null)
      return
    }

    // Second click
    if (date < start) {
      setEnd(start)
      setStart(date)
    } else {
      setEnd(date)
    }
  }

  const clearRange = () => {
    setStart(null)
    setEnd(null)
    setHover(null)
  }

  return {
    start,
    end,
    hover,
    setHover,
    handleClick,
    clearRange,
  }
}