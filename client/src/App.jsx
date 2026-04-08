
import React, { useState } from 'react'
import SideBar from './Components/SideBar'
import Hero from './Components/Hero'
import Calendar from './Components/Calendar'

const App = () => {

  const [notesByDate, setNotesByDate] = useState({})
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [theme, setTheme] = useState("dark")

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setMouse({ x: e.clientX, y: e.clientY })
  }

  const bgClass = theme === "dark"
    ? "bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617]"
    : "bg-gradient-to-br from-[#0b0f2a] via-[#3b1e8a] to-[#a78bfa]"

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen transition-all duration-500 text-white ${bgClass}`}
    >

      {/* 🔥 Mouse Glow */}
      <div
        className="pointer-events-none fixed w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{
          background: theme === "dark"
            ? "rgba(99,102,241,0.3)"
            : "rgba(168,85,247,0.4)",
          left: mouse.x - 120,
          top: mouse.y - 120,
          transition: "0.05s"
        }}
      />

      <div className='flex flex-col md:flex-row min-h-screen'>

        {/* Sidebar */}
        <div className='w-full md:w-[260px] border-b md:border-b-0 md:border-r border-gray-800'>
          <SideBar
            selectedDate={selectedDate}
            notesByDate={notesByDate}
            setNotesByDate={setNotesByDate}
            theme={theme}
          />
        </div>

        {/* Main */}
        <div className='flex-1 p-4 md:p-6 space-y-4 md:space-y-6'>
          <Hero selectedDate={selectedDate} theme={theme} />
          <Calendar
            setSelectedDate={setSelectedDate}
            notesByDate={notesByDate}
            theme={theme}
            setTheme={setTheme}
          />
        </div>

      </div>

    </div>
  )
}

export default App