
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDroplet } from 'react-icons/fi'

const Calendar = ({ setSelectedDate, notesByDate, theme, setTheme }) => {

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const [currentDate, setCurrentDate] = useState(new Date())
  const [range, setRange] = useState({ start: null, end: null })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const totalDays = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const today = new Date()

  const handleClick = (day) => {
    const selected = new Date(year, month, day)
    setSelectedDate(selected)

    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null })
    } else {
      if (day > range.start) {
        setRange({ ...range, end: day })
      } else {
        setRange({ start: day, end: null })
      }
    }
  }

  const isInRange = (day) => {
    if (range.start && range.end) {
      return day > range.start && day < range.end
    }
    return false
  }

  const changeMonth = (dir) => {
    setCurrentDate(new Date(year, month + dir, 1))
    setRange({ start: null, end: null })
  }

  const circleTheme = theme === "dark"
    ? "bg-[#0f172a] text-gray-300 hover:bg-gray-700"
    : "bg-black/30 text-white hover:bg-white/20"

  const activeTheme = theme === "dark"
    ? "bg-indigo-600 text-white"
    : "bg-purple-600 text-white"

  const arrowColor = theme === "dark" ? "text-white" : "text-purple-200"

  return (
    <div className={`relative border rounded-2xl p-4 w-full max-w-[420px] mx-auto ${
      theme === "dark"
        ? "bg-[#020617] border-gray-800"
        : "bg-black/30 backdrop-blur-md border-white/10"
    }`}>

      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute -right-4 md:-right-6 top-1/2 bg-purple-500 p-2 rounded-full shadow-lg"
      >
        <FiDroplet />
      </motion.button>

      {/* Header */}
      <div className='flex justify-between items-center mb-3'>
        <button onClick={() => changeMonth(-1)} className={`px-2 py-1 ${arrowColor}`}>◀</button>
        <h2 className='text-sm md:text-lg font-semibold'>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={() => changeMonth(1)} className={`px-2 py-1 ${arrowColor}`}>▶</button>
      </div>

      {/* Days */}
      <div className='grid grid-cols-7 text-center text-[10px] md:text-sm mb-1'>
        {days.map((d) => <p key={d}>{d}</p>)}
      </div>

      {/* Dates */}
      <div className='grid grid-cols-7 gap-2 justify-items-center'>

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={i}></div>
        ))}

        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1

          const isStart = day === range.start
          const isEnd = day === range.end
          const inRange = isInRange(day)

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()

          const dateKey = new Date(year, month, day).toISOString().split("T")[0]
          const hasNote = notesByDate[dateKey]?.length > 0

          return (
            <motion.div
              key={day}
              onClick={() => handleClick(day)}
              whileTap={{ scale: 0.85 }}
              className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-xs md:text-sm cursor-pointer"
            >

              <div className={`w-full h-full flex items-center justify-center rounded-full
                ${isStart || isEnd
                  ? activeTheme
                  : inRange
                    ? "bg-purple-400/30 text-white"
                    : isToday
                      ? "border border-purple-400 text-purple-300"
                      : circleTheme
                }`}
              >
                {day}
              </div>

              {hasNote && (
                <div className="absolute top-0 right-0 text-[9px] bg-purple-500 px-1 rounded-full">
                  N
                </div>
              )}

            </motion.div>
          )
        })}

      </div>

    </div>
  )
}

export default Calendar