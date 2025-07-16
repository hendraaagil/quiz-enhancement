import { clsx, type ClassValue } from 'clsx'
import { InlineMath } from 'react-katex'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

export function renderMathText(text: string) {
  const parts = text.split(/(\$[^$]+\$)/g)

  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const mathContent = part.slice(1, -1)
      return (
        <span key={index} className="mx-1 inline-block">
          <InlineMath math={mathContent} />
        </span>
      )
    }

    return <span key={index}>{part}</span>
  })
}
