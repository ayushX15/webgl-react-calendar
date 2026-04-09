export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

export const inRange = (
  date: Date,
  start: Date | null,
  end: Date | null
) => {
  if (!start || !end) return false

  const t = date.getTime()
  const s = start.getTime()
  const e = end.getTime()

  return t >= Math.min(s, e) && t <= Math.max(s, e)
}

export const fmtDate = (date: Date) =>
  date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

export const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate()

export const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay()

export const getMonthMatrix = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const cells: (Date | null)[] = []

  // padding
  for (let i = 0; i < firstDay; i++) {
    cells.push(null)
  }

  // actual dates
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }

  return cells
}