import React from 'react'
import { Loader2 } from 'lucide-react'

export function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-3">
      <Loader2 className="animate-spin text-teal-600 dark:text-teal-400" size={32} />
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{message}</span>
    </div>
  )
}
