import React from 'react'
import { CheckCircle2, Clock, PlayCircle, XCircle, AlertCircle } from 'lucide-react'

export function StatusBadge({ status }) {
  const normalized = (status || 'pending').toLowerCase()

  const config = {
    pending: {
      label: 'Pending',
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      icon: Clock,
    },
    accepted: {
      label: 'Accepted',
      bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      icon: CheckCircle2,
    },
    in_progress: {
      label: 'In Progress',
      bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      icon: PlayCircle,
    },
    completed: {
      label: 'Completed',
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: CheckCircle2,
    },
    rejected: {
      label: 'Rejected',
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      icon: XCircle,
    },
  }

  const badge = config[normalized] || config.pending
  const Icon = badge.icon

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
      <Icon size={14} />
      <span>{badge.label}</span>
    </span>
  )
}
