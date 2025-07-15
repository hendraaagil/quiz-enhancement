'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { Introduction } from './introduction'
import { Questions } from './questions'

export default function Quiz() {
  const [currentStep, setCurrentStep] = useQueryState(
    'step',
    parseAsStringEnum(['intro', 'quiz', 'results']).withDefault('intro'),
  )

  function handleChangeStep(step: 'intro' | 'quiz' | 'results') {
    setCurrentStep(step)
  }

  if (currentStep === 'intro') {
    return <Introduction onChangeStep={handleChangeStep} />
  }

  if (currentStep === 'quiz') {
    return <Questions />
  }

  return null
}
