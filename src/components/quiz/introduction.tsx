'use client'

import { CheckCircle, Clock, Target, TriangleAlert } from 'lucide-react'
import { useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const expectations = [
  '5 math questions of varying difficulty',
  'Progress tracking with motivational messages',
  'Detailed results and performance insights',
  'Professional mathematical notation',
]

export function Introduction() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const totalEstimatedTime = 300 // 5 minutes in seconds

  function handleStartQuiz() {
    setShowConfirmation(false)
    alert('Quiz timer started! You have 5 minutes to complete the quiz.')
    // Logic to start the quiz timer can be added here
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
              <Target className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Math Skills Quiz
            </CardTitle>
            <p className="mt-2 text-gray-600">
              Test your mathematical abilities with 5 carefully selected
              questions
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="info">
              <Clock />
              <AlertTitle>Time Expectations</AlertTitle>
              <AlertDescription>
                Estimated completion time: {Math.ceil(totalEstimatedTime / 60)}{' '}
                minutes. Take your time - accuracy is more important than speed!
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">What to expect:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {expectations.map((expectation, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {expectation}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => setShowConfirmation(true)}
              className="w-full bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>

      <ConfirmStartQuiz
        show={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        onStart={handleStartQuiz}
      />
    </>
  )
}

const importantNotices = [
  'You have exactly 5 minutes to complete all questions',
  'The timer cannot be paused once started',
  'The quiz will auto-submit when time runs out',
  "Make sure you're ready before proceeding",
]

function ConfirmStartQuiz({
  show,
  onCancel,
  onStart,
}: {
  show: boolean
  onCancel: () => void
  onStart: () => void
}) {
  return (
    <Dialog open={show} onOpenChange={onCancel}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Time Limit Warning</DialogTitle>
        </DialogHeader>
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            <ul className="list-disc space-y-1 pl-5 text-sm text-red-700">
              {importantNotices.map((notice, index) => (
                <li key={index}>{notice}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onStart}
            className="flex-1 bg-red-600 text-white hover:bg-red-700"
          >
            Start Timer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
