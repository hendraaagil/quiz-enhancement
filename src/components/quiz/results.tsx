import { Trophy } from 'lucide-react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'

import { questions } from '@/data/quiz'
import { useAnswerStore } from '@/stores/answer-store'
import { useQuizTime } from '@/hooks/use-quiz-time'
import { useMemo } from 'react'

export function Results() {
  const { timeLeft } = useQuizTime()
  const { getAnswerCorrections, clearAnswers } = useAnswerStore()

  const results = useMemo(() => {
    const corrections = getAnswerCorrections()
    const correctAnswers = corrections.filter((a) => a.isCorrect).length
    const score = (correctAnswers / questions.length) * 100
    const wasTimedOut = timeLeft <= 0

    let performance = 'Needs Improvement'
    let performanceColor = 'bg-red-500'
    if (score >= 80) {
      performance = 'Excellent'
      performanceColor = 'bg-green-500'
    } else if (score >= 60) {
      performance = 'Good'
      performanceColor = 'bg-yellow-500'
    }

    return {
      correctAnswers,
      totalQuestions: questions.length,
      score,
      performance,
      performanceColor,
      wasTimedOut,
    }
  }, [])

  console.log(results)

  return (
    <div className="w-full max-w-lg">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <Trophy className="size-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            {results.wasTimedOut ? "Time's Up!" : 'Quiz Complete!'}
          </CardTitle>
          <p className="mt-2 text-gray-600">
            {results.wasTimedOut
              ? 'Quiz auto-submitted due to time limit'
              : "Here's how you performed"}
          </p>
        </CardHeader>
      </Card>
    </div>
  )
}
