"use client"
import React, {useCallback, useEffect, useState, useRef} from 'react'
import toast from "react-hot-toast";

type TimerMode = "focus" | "break"

export default function useTimer() {
  const [mode, setMode] = useState<TimerMode>("focus")
  const [timeLeft, setTimeLeft] = useState(25*60)
  const [active, setActive] = useState<boolean>(false)
  const [sessions, setSessions] = useState(0)
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [focusSeconds, setFocusSeconds] = useState(0)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [breakSeconds, setBreakSeconds] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    audioRef.current = new Audio("/sounds/sound.mp3")
  }, [])

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    const formattedTime = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  
    document.title = `${formattedTime} | ${
      mode === "focus" ? "Focus" : "Break"
    }`;
  }, [timeLeft, mode]);

  useEffect(() => {
    if (timeLeft === 0 && active) {
      audioRef.current?.play();
  
      toast.success(
        mode === "focus"
          ? "Fokus Selesai!"
          : "Istirahat Selesai!"
      );
  
      switchMode();
    }
  }, [timeLeft, active, mode]);

  const getDuration = (timerMode: TimerMode) => {
    return timerMode === "focus"
      ? focusMinutes * 60 + focusSeconds
      : breakMinutes * 60 + breakSeconds
  }

  const resetTimer = () => {
    setActive(false)
    setTimeLeft(getDuration(mode))
  }

  const toggleTimer = () => {
    setActive((prev) => !prev)
  }

  useEffect(() => {
    if (!active) return;
  
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
  
    // Jalankan sekali langsung
    setTimeLeft((prev) => Math.max(prev - 1, 0));
  
    return () => clearInterval(interval);
  }, [active]);

  const switchMode = () => {
    setMode((prevMode) => {
      const newMode =
        prevMode === "focus" ? "break" : "focus"
  
      setTimeLeft(getDuration(newMode))
      setActive(false)
  
      if (prevMode === "focus") {
        setSessions((prev) => prev + 1)
      }
  
      return newMode
    })
  }

  useEffect(() => {
    if (!active) {
      setTimeLeft(getDuration(mode));
    }
  }, [
    focusMinutes,
    focusSeconds,
    breakMinutes,
    breakSeconds,
    mode,
  ]);

  return {
    mode,
    timeLeft,
    active,
    toggleTimer,
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
  }
}
