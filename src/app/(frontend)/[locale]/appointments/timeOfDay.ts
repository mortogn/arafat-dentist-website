import { Moon, Sun, Sunrise, Sunset } from 'lucide-react'
import type React from 'react'
import { timeOfDayValues, type TimeOfDay } from '@/components/Blocks/BookingForm/bookFormSchema'

export { timeOfDayValues }
export type { TimeOfDay }

export const TIME_OF_DAY_ICONS: Record<TimeOfDay, React.ComponentType<{ className?: string }>> = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
  night: Moon,
}

// Ordering used to sort appointments within a day (morning first).
export const TIME_OF_DAY_ORDER: Record<TimeOfDay, number> = {
  morning: 0,
  afternoon: 1,
  evening: 2,
  night: 3,
}

// The `time` field is stored as free text; narrow it to a known slot or null.
export const asTimeOfDay = (value?: string | null): TimeOfDay | null =>
  value && (timeOfDayValues as readonly string[]).includes(value) ? (value as TimeOfDay) : null
