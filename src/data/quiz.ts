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
    question: 'Solve for $x$: $3x - 7 = 11$',
    options: ['$x = 6$', '$x = 4$', '$x = -6$', '$x = 3$'],
    correctAnswer: 0,
    difficulty: 'easy',
    timeEstimate: 45,
  },
  {
    id: 2,
    question:
      'Solve the simultaneous equations: $\\begin{cases} x + y = 7 \\\\ 2x - y = 4 \\end{cases}$',
    options: [
      '$x = 2, y = 5$',
      '$x = 3, y = 4$',
      '$x = 4, y = 3$',
      '$x = 5, y = 2$',
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    timeEstimate: 90,
  },
  {
    id: 3,
    question:
      'Find the area of a sector with radius 7 cm and angle $60^\\circ$. Use $\\pi = \\frac{22}{7}$.$\\text{Area} = \\frac{\\theta}{360^\\circ} \\times \\pi r^2$',
    options: [
      '$77\\text{ cm}^2$',
      '$35\\text{ cm}^2$',
      '$44\\text{ cm}^2$',
      '$49\\text{ cm}^2$',
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    timeEstimate: 90,
  },
  {
    id: 4,
    question: 'Simplify: $(3^2 \\times 3^4) \\div 3^3$',
    options: ['$3^2$', '$3^3$', '$3^4$', '$3^1$'],
    correctAnswer: 1,
    difficulty: 'easy',
    timeEstimate: 30,
  },
  {
    id: 5,
    question:
      'The roots of the quadratic equation $x^2 - 4x + k = 0$ are equal. Find the value of $k$. Use the discriminant: $b^2 - 4ac = 0$',
    options: ['$k = 3$', '$k = 4$', '$k = 2$', '$k = 5$'],
    correctAnswer: 1,
    difficulty: 'hard',
    timeEstimate: 75,
  },
]
