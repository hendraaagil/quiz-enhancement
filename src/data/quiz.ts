type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'easy' | 'medium' | 'hard'
  timeEstimate: number
}

export const quizTimeLimit = 3 * 60 // 5 minutes in seconds
export const questions: Question[] = [
  {
    id: 1,
    question: 'Evaluate: $\\sqrt{16} + 3^2$',
    options: ['$12$', '$13$', '$14$', '$15$'],
    correctAnswer: 1,
    difficulty: 'easy',
    timeEstimate: 30,
  },
  {
    id: 2,
    question: 'Solve: $\\frac{2x + 6}{4} = 5$',
    options: ['$x = 7$', '$x = 8$', '$x = 9$', '$x = 10$'],
    correctAnswer: 0,
    difficulty: 'medium',
    timeEstimate: 45,
  },
  {
    id: 3,
    question: 'What is the derivative of $f(x) = x^3 + 2x^2 - 5x + 1$?',
    options: [
      "$f'(x) = 3x^2 + 4x - 5$",
      "$f'(x) = 3x^2 + 2x - 5$",
      "$f'(x) = x^2 + 4x - 5$",
      "$f'(x) = 3x^2 + 4x + 5$",
    ],
    correctAnswer: 0,
    difficulty: 'hard',
    timeEstimate: 90,
  },
  {
    id: 4,
    question:
      'Find the value of $\\sin(\\frac{\\pi}{6}) + \\cos(\\frac{\\pi}{3})$',
    options: [
      '$\\frac{1}{2}$',
      '$\\frac{3}{4}$',
      '$1$',
      '$\\frac{\\sqrt{3}}{2}$',
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    timeEstimate: 75,
  },
  {
    id: 5,
    question: 'Solve the quadratic equation: $x^2 - 5x + 6 = 0$',
    options: [
      '$x = 1, x = 6$',
      '$x = 2, x = 3$',
      '$x = -2, x = -3$',
      '$x = 1, x = -6$',
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    timeEstimate: 60,
  },
]
