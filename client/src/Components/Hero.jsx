
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { WiDaySunny, WiRain, WiCloudy } from 'react-icons/wi'

const Hero = ({ selectedDate, theme }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const dateStr = selectedDate.toISOString().split("T")[0]

        const res = await fetch(
          `https://archive-api.open-meteo.com/v1/archive?latitude=26.85&longitude=80.95&start_date=${dateStr}&end_date=${dateStr}&daily=weathercode,temperature_2m_max`
        )

        const data = await res.json()

        setWeather({
          temp: data.daily.temperature_2m_max[0],
          code: data.daily.weathercode[0]
        })

      } catch (err) {
        console.log(err)
      }
    }

    fetchWeather()
  }, [selectedDate])

  const getWeatherIcon = (code) => {
    if (code === 0) return <WiDaySunny size={40} />
    if (code >= 1 && code <= 3) return <WiCloudy size={40} />
    return <WiRain size={40} />
  }

  const overlay = theme === "dark"
    ? "bg-black/70"
    : "bg-gradient-to-b from-black/50 to-purple-900/50"

  return (
    <div className="relative w-full h-[140px] md:h-[180px] overflow-hidden rounded-2xl">

      <img
        src="https://tse1.mm.bing.net/th/id/OIP.xD9VE0nw3tIq-HOrME9ybwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
        className="w-full h-full object-cover scale-110"
      />

      <div className={`absolute inset-0 ${overlay} backdrop-blur-[3px]`} />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

        <motion.p
          key={selectedDate}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] tracking-[0.3em] text-gray-300 uppercase"
        >
          {selectedDate.toDateString()}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg md:text-3xl font-medium mt-2"
        >
          Slow Living Perspective
        </motion.h1>

        {weather && (
          <motion.div
            key={weather.temp}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-2 md:mt-3 text-sm"
          >
            {getWeatherIcon(weather.code)}
            <span>{weather.temp}°C</span>
          </motion.div>
        )}

      </div>

    </div>
  )
}

export default Hero