'use client'

import { cn } from '@/lib/utils'
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { timeOfDayValues, TimeOfDay } from './bookFormSchema'

type TimeOfDaySelectProps = {
  value?: TimeOfDay
  onChange: (value: TimeOfDay) => void
}

const icons: Record<TimeOfDay, React.ComponentType<{ className?: string }>> = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
  night: Moon,
}

const TimeOfDaySelect: React.FC<TimeOfDaySelectProps> = ({ value, onChange }) => {
  const t = useTranslations('BookingPage.form.timeOptions')

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {timeOfDayValues.map((option) => {
        const Icon = icons[option]
        const isSelected = value === option
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option)}
            className={cn(
              'flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isSelected
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground',
            )}
          >
            <Icon className={cn('size-5 shrink-0', isSelected && 'text-primary')} />
            <span className="font-medium">{t(option)}</span>
          </button>
        )
      })}
    </div>
  )
}

export default TimeOfDaySelect
