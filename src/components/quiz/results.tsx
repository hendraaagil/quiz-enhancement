'use client'

import { Check, RotateCcw, TrendingUp, Trophy, X } from 'lucide-react'
import { useMemo } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { questions } from '@/data/quiz'
import { cn, renderMathText } from '@/lib/utils'
import { useAnswerStore } from '@/stores/answer-store'
import { useQuizTime } from '@/hooks/use-quiz-time'

export function Results({ onRetakeQuiz }: { onRetakeQuiz: () => void }) {
  const { timeLeft, clearQuizTime } = useQuizTime()
  const { getAnswerCorrections, clearAnswers } = useAnswerStore()

  const results = useMemo(() => {
    const answers = getAnswerCorrections()
    const correctAnswers = answers.filter((a) => a.isCorrect).length
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
      answers,
      correctAnswers,
      totalQuestions: questions.length,
      score,
      performance,
      performanceColor,
      wasTimedOut,
    }
  }, [timeLeft, getAnswerCorrections])

  function handleRetake() {
    clearAnswers()
    clearQuizTime()
    onRetakeQuiz()
  }

  return (
    <div className="w-full max-w-lg space-y-4">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
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

      <Card>
        <CardContent className="pt-6">
          <div className="mb-6 text-center">
            <div className="mb-2 text-5xl font-bold text-blue-600">
              {results.score.toFixed(0)}%
            </div>
            <div
              className={cn(
                'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white',
                results.performanceColor,
              )}
            >
              {results.performance}
            </div>
          </div>

          <div className="rounded-lg bg-green-50 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {results.correctAnswers}
            </div>
            <div className="text-sm text-green-700">Correct Answers</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5" />
            Question Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const answer = results.answers[index]
              if (!answer) return null

              return (
                <div
                  key={question.id}
                  className={cn(
                    'flex items-center justify-between rounded-lg border bg-gray-50 p-3',
                    {
                      'border-green-200 bg-green-50': answer.isCorrect,
                      'border-red-200 bg-red-50': !answer.isCorrect,
                    },
                  )}
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      Q{index + 1}: {renderMathText(question.question)}
                    </div>
                    <div
                      className={cn('mt-1 text-gray-600', {
                        'text-red-600': !answer.isCorrect,
                        'text-green-600': answer.isCorrect,
                      })}
                    >
                      Your answer:{' '}
                      {renderMathText(question.options[answer.selectedAnswer])}
                    </div>
                    {!answer.isCorrect && (
                      <div className="mt-1 text-green-600">
                        Correct answer:{' '}
                        {renderMathText(
                          question.options[question.correctAnswer],
                        )}
                      </div>
                    )}
                    <div className="mt-1 text-sm text-gray-500 capitalize">
                      {question.difficulty}
                    </div>
                  </div>
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full',
                      {
                        'bg-green-100 text-green-600': answer.isCorrect,
                        'bg-red-100 text-red-600': !answer.isCorrect,
                      },
                    )}
                  >
                    {answer.isCorrect ? (
                      <Check className="size-4" />
                    ) : (
                      <X className="size-4" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actionable Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.score >= 80 && (
              <Alert variant="success">
                <AlertTitle>🎉 Excellent Performance!</AlertTitle>
                <AlertDescription>
                  You have strong math fundamentals. Consider challenging
                  yourself with advanced topics like calculus and trigonometry.
                </AlertDescription>
              </Alert>
            )}

            {results.score >= 60 && results.score < 80 && (
              <Alert variant="warning">
                <AlertTitle>👍 Good Progress!</AlertTitle>
                <AlertDescription>
                  You&apos;re on the right track. Focus on practicing algebraic
                  manipulation and equation solving.
                </AlertDescription>
              </Alert>
            )}

            {results.score < 60 && (
              <Alert variant="destructive">
                <AlertTitle>📚 Room for Improvement</AlertTitle>
                <AlertDescription>
                  Don&apos;t worry! Practice basic arithmetic, fractions, and
                  simple algebra. Review fundamental concepts and try again.
                </AlertDescription>
              </Alert>
            )}

            {results.wasTimedOut && (
              <Alert variant="destructive">
                <AlertTitle>⏰ Time Management</AlertTitle>
                <AlertDescription>
                  The quiz was auto-submitted due to time limit. Practice time
                  management and quick problem-solving techniques.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleRetake} size="lg" className="w-full">
        <RotateCcw className="mr-2 h-4 w-4" />
        Retake Quiz
      </Button>
    </div>
  )
}
