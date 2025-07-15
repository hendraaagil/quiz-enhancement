'use client'

import { useEffect, useState } from 'react'
import { quizTimeLimit } from '@/data/quiz'

export function useQuizTime({ onTimeUp }: { onTimeUp?: () => void } = {}) {
  const [startTime, setStartTime] = useState(() => {
    const savedTime =
      typeof window !== 'undefined'
        ? localStorage.getItem('quizStartTime')
        : null
    return savedTime ? parseInt(savedTime, 10) : Date.now()
  })
  const [timeLeft, setTimeLeft] = useState(quizTimeLimit)

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
      const remainingTime = quizTimeLimit - elapsedTime
      setTimeLeft(remainingTime)

      if (remainingTime <= 0) {
        clearInterval(interval)
        setTimeLeft(0)
        localStorage.removeItem('quizStartTime')
        if (onTimeUp) {
          onTimeUp()
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [startTime, timeLeft])

  function setInitialStartTime(newStartTime: number) {
    setStartTime(newStartTime)
    localStorage.setItem('quizStartTime', newStartTime.toString())
  }

  function clearQuizTime() {
    setStartTime(Date.now())
    setTimeLeft(quizTimeLimit)
    localStorage.removeItem('quizStartTime')
  }

  return {
    timeLeft,
    setStartTime: setInitialStartTime,
    clearQuizTime,
  }
}
