import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { questions } from '@/data/quiz'

export type Answer = {
  questionId: number
  selectedAnswer: number
}

export type AnswerCorrection = Answer & {
  isCorrect: boolean
}

type AnswerState = {
  answers: Answer[]
  addAnswer: (answer: Answer) => void
  getAnswerCorrections: () => AnswerCorrection[]
  clearAnswers: () => void
}

export const useAnswerStore = create<AnswerState>()(
  persist(
    (set, get) => ({
      answers: [] as Answer[],
      addAnswer: (answer: Answer) =>
        set((state) => {
          const existingAnswerIndex = state.answers.findIndex(
            (a) => a.questionId === answer.questionId,
          )
          if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...state.answers]
            updatedAnswers[existingAnswerIndex] = answer
            return { answers: updatedAnswers }
          }
          return { answers: [...state.answers, answer] }
        }),
      getAnswerCorrections: () => {
        const state = get()
        return state.answers.map((answer) => {
          const question = questions.find((q) => q.id === answer.questionId)
          if (!question) return { ...answer, isCorrect: false }

          const isCorrect = answer.selectedAnswer === question.correctAnswer
          return { ...answer, isCorrect }
        })
      },
      clearAnswers: () => set({ answers: [] }),
    }),
    { name: 'quiz-answers' },
  ),
)
