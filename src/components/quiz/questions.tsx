'use client'

import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import { questions } from '@/data/quiz'
import { cn, formatTime, renderMathText } from '@/lib/utils'
import { useQuizTime } from '@/hooks/use-quiz-time'
import { useAnswerStore } from '@/stores/answer-store'

const motivationalMessages = [
  "Great start! You're doing amazing! 🌟",
  'Fantastic progress! Keep up the excellent work! 🚀',
  "You're halfway there! Your math skills are impressive! 💪",
  "Almost done! You're crushing this quiz! 🔥",
  "Final question! You've got this! 🎯",
]

export function Questions({ onGoToResults }: { onGoToResults: () => void }) {
  const { answers, addAnswer } = useAnswerStore()
  const { timeLeft } = useQuizTime({
    onTimeUp: onGoToResults,
    enableTimer: true,
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    const existingAnswer = answers.find(
      (answer) => answer.questionId === question.id,
    )

    if (existingAnswer) {
      setSelectedAnswer(existingAnswer.selectedAnswer)
    } else {
      setSelectedAnswer(null)
    }
  }, [currentQuestion, answers, question.id])

  function handleAnswerSelect(index: number) {
    setSelectedAnswer(index)
    addAnswer({
      questionId: question.id,
      selectedAnswer: index,
    })
  }

  function handleNextQuestion() {
    if (selectedAnswer === null) return

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      return
    }

    onGoToResults()
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs capitalize">
              {question.difficulty}
            </Badge>
            <div
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium',
                {
                  'bg-red-100 text-red-700': timeLeft < 60,
                  'bg-yellow-100 text-yellow-700':
                    timeLeft >= 60 && timeLeft < 120,
                  'bg-blue-100 text-blue-700': timeLeft >= 120,
                },
              )}
            >
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <Progress value={progress} className="mb-2 h-2" />
        <div className="flex items-center justify-between space-x-4">
          <p className="text-sm font-medium text-blue-600">
            {motivationalMessages[currentQuestion]}
          </p>
          {timeLeft < 60 && (
            <p className="animate-pulse text-sm font-medium text-red-600">
              ⚠️ Less than 1 minute left!
            </p>
          )}
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              Estimated time: {question.timeEstimate}s
            </span>
          </div>
          <CardTitle className="text-xl leading-relaxed text-gray-800 md:text-2xl">
            {renderMathText(question.question)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={cn(
                  'rounded-lg border-2 p-4 text-left transition-all duration-200',
                  {
                    'border-blue-500 bg-blue-50 text-blue-800':
                      selectedAnswer === index,
                    'border-gray-200 hover:border-gray-300 hover:bg-gray-50':
                      selectedAnswer !== index,
                  },
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2',
                      {
                        'border-blue-500 bg-blue-500': selectedAnswer === index,
                        'border-gray-300': selectedAnswer !== index,
                      },
                    )}
                  >
                    {selectedAnswer === index && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="leading-relaxed font-medium">
                    {renderMathText(option)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Progress: {Math.round(progress)}%
        </div>
        <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
          {currentQuestion === questions.length - 1
            ? 'Finish Quiz'
            : 'Next Question'}
        </Button>
      </div>
    </div>
  )
}
