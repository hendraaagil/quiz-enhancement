import Quiz from '@/components/quiz'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Suspense>
        <Quiz />
      </Suspense>
    </div>
  )
}
