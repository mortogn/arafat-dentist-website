'use client'

import Media from '@/components/Media'
import { cn } from '@/lib/utils'
import { Treatment } from '@/payload-types'
import { format } from 'date-fns'
import { bn, enUS } from 'date-fns/locale'
import { CalendarDays, Clock, Stethoscope } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { TimeOfDay } from './bookFormSchema'

type AppointmentSummaryProps = {
  treatments: Pick<Treatment, 'id' | 'title' | 'icon'>[]
  date?: Date
  time?: TimeOfDay
  className?: string
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({
  treatments,
  date,
  time,
  className,
}) => {
  const t = useTranslations('BookingPage.form.summary')
  const tTime = useTranslations('BookingPage.form.timeOptions')
  const locale = useLocale()
  const dateLocale = locale === 'bn-BD' ? bn : enUS

  const isEmpty = treatments.length === 0 && !date && !time

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-5 shadow-sm',
        // ticket-style notch detail using a dashed top rule
        className,
      )}
    >
      <p className="font-heading text-lg tracking-tight">{t('title')}</p>
      <div className="my-4 border-t border-dashed border-border" />

      {isEmpty ? (
        <p className="text-sm text-muted-foreground">{t('empty')}</p>
      ) : (
        <dl className="space-y-4 text-sm">
          <div className="flex gap-3">
            <Stethoscope className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <dt className="text-muted-foreground">{t('treatments')}</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {treatments.length > 0 ? (
                  treatments.map((treatment) => (
                    <span
                      key={treatment.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2 py-0.5 font-medium"
                    >
                      {treatment.icon && (
                        <Media
                          resource={treatment.icon}
                          height={16}
                          width={16}
                          className="size-4 rounded-full object-cover"
                        />
                      )}
                      {treatment.title}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </dd>
            </div>
          </div>

          <div className="flex gap-3">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <dt className="text-muted-foreground">{t('date')}</dt>
              <dd className="mt-1 font-medium">
                {date ? format(date, 'PPP', { locale: dateLocale }) : '—'}
              </dd>
            </div>
          </div>

          <div className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <dt className="text-muted-foreground">{t('time')}</dt>
              <dd className="mt-1 font-medium">{time ? tTime(time) : '—'}</dd>
            </div>
          </div>
        </dl>
      )}
    </div>
  )
}

export default AppointmentSummary
