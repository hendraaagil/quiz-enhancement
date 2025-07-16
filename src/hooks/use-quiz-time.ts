'use client'

import { useEffect, useState } from 'react'
import { quizTimeLimit } from '@/data/quiz'

const startTimeKey = 'quiz-start-time'
export function useQuizTime({
  onTimeUp,
  enableTimer,
}: { onTimeUp?: () => void; enableTimer?: boolean } = {}) {
  const [startTime, setStartTime] = useState(() => {
    const savedTime =
      typeof window !== 'undefined' ? localStorage.getItem(startTimeKey) : null
    return savedTime ? parseInt(savedTime, 10) : Date.now()
  })
  const [timeLeft, setTimeLeft] = useState(quizTimeLimit)

  useEffect(() => {
    if (!enableTimer) {
      return
    }

    const interval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
      const remainingTime = quizTimeLimit - elapsedTime
      setTimeLeft(remainingTime)

      if (remainingTime <= 0) {
        clearInterval(interval)
        setTimeLeft(0)
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
    localStorage.setItem(startTimeKey, newStartTime.toString())
  }

  function clearQuizTime() {
    setStartTime(Date.now())
    setTimeLeft(quizTimeLimit)
    localStorage.removeItem(startTimeKey)
  }

  return {
    timeLeft,
    setStartTime: setInitialStartTime,
    clearQuizTime,
  }
}
