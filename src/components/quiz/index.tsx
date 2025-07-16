'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import dynamic from 'next/dynamic'

import { Introduction } from './introduction'

const Questions = dynamic(
  async () => {
    const { Questions } = await import('./questions')
    return Questions
  },
  { ssr: false },
)

const Results = dynamic(
  async () => {
    const { Results } = await import('./results')
    return Results
  },
  { ssr: false },
)

export default function Quiz() {
  const [currentStep, setCurrentStep] = useQueryState(
    'step',
    parseAsStringEnum(['intro', 'quiz', 'results']).withDefault('intro'),
  )

  function handleChangeStep(step: 'intro' | 'quiz' | 'results') {
    setCurrentStep(step)
  }

  if (currentStep === 'intro') {
    return <Introduction onGoToQuiz={() => handleChangeStep('quiz')} />
  }

  if (currentStep === 'quiz') {
    return <Questions onGoToResults={() => handleChangeStep('results')} />
  }

  if (currentStep === 'results') {
    return <Results onRetakeQuiz={() => handleChangeStep('intro')} />
  }

  return null
}
