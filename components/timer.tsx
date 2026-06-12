"use client"
import useTimer from '@/hooks/use-timer'
import React from 'react'

export default function Timer() {
  const {
    mode,
    timeLeft,
    toggleTimer,
    active,
    resetTimer,
    switchMode,
    sessions,
  
    focusMinutes,
    focusSeconds,
    breakMinutes,
    breakSeconds,
  
    setFocusMinutes,
    setFocusSeconds,
    setBreakMinutes,
    setBreakSeconds,
  } = useTimer()
  
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2,"0")}`

  return (
    <div className='max-w-sm bg-white shadow-xl w-full p-6 rounded-xl'>
     <div className="grid grid-cols-2 gap-4 mb-6">
        {mode === "focus" ? (
          <>
            <div>
              <label className="block text-sm mb-1">
                Focus Menit
              </label>

              <input
                type="number"
                min="0"
                value={focusMinutes}
                onChange={(e) =>
                  setFocusMinutes(Number(e.target.value))
                }
                className="border rounded p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Focus Detik
              </label>

              <input
                type="number"
                min="0"
                max="59"
                value={focusSeconds}
                onChange={(e) =>
                  setFocusSeconds(Number(e.target.value))
                }
                className="border rounded p-2 w-full"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm mb-1">
                Break Menit
              </label>

              <input
                type="number"
                min="0"
                value={breakMinutes}
                onChange={(e) =>
                  setBreakMinutes(Number(e.target.value))
                }
                className="border rounded p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Break Detik
              </label>

              <input
                type="number"
                min="0"
                max="59"
                value={breakSeconds}
                onChange={(e) =>
                  setBreakSeconds(Number(e.target.value))
                }
                className="border rounded p-2 w-full"
              />
            </div>
          </>
        )}
      </div>
        <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-medium capitalize'>
              {mode === "focus" ? "Focus Time" : "Break Time"}
            </h2>
            <div className='text-sm text-gray-500'>Session: {sessions}</div>
        </div>

        <div className={`text-center text-6xl font-bold mb-6 ${
          mode === "focus" ? "text-red-500" : "text-green-500"
        }`}>
            {formattedTime}
        </div>

        <div className='flex justify-center space-x-4 mb-4'>
            <button onClick={toggleTimer} className='bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg text-white'>{active ? "Pause" : "Start"}</button>
            <button 
              onClick={resetTimer}
              className='bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg'>Reset
            </button>
        </div>

        <button onClick={switchMode} className='py-2 w-full bg-gray-100 hover:bg-gray-100 rounded-lg text-gray-700'>Switch to {mode === "focus" ? "break" : "focus"}</button>
    </div>
  )
}
