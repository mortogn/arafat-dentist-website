import type { Appointment } from '@/payload-types'
import {
  BadgeCheckIcon,
  CircleCheckIcon,
  CircleXIcon,
  HourglassIcon,
  UserXIcon,
} from 'lucide-react'
import type React from 'react'

export type StatusValue = NonNullable<Appointment['status']>

export const STATUSES: StatusValue[] = ['pending', 'confirmed', 'cancelled', 'completed', 'no-show']

// Brand-aligned semantic status styles.
export const STATUS_STYLES: Record<StatusValue, string> = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  confirmed: 'bg-primary/10 text-primary',
  completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  cancelled: 'bg-destructive/10 text-destructive',
  'no-show': 'bg-muted text-muted-foreground',
}

export const STATUS_ICONS: Record<StatusValue, React.ComponentType<{ className?: string }>> = {
  pending: HourglassIcon,
  confirmed: CircleCheckIcon,
  completed: BadgeCheckIcon,
  cancelled: CircleXIcon,
  'no-show': UserXIcon,
}
