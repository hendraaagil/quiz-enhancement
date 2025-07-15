'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { Introduction } from './introduction'
import { Questions } from './questions'
import { Results } from './results'

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
    return <Results />
  }

  return null
}
