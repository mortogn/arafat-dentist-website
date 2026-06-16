'use client'

import { Appointment } from '@/payload-types'
import { cn } from '@/lib/utils'
import { useState, useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import type { Locale } from '@/types'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Link } from '@/i18n/routing'
import NextLink from 'next/link'
import { ExternalLinkIcon, PencilIcon, PlusIcon } from 'lucide-react'
import { STATUS_ICONS, STATUS_STYLES, STATUSES, StatusValue } from './status'
import { TIME_OF_DAY_ICONS, asTimeOfDay } from './timeOfDay'
import { updateAppointment } from './actions'

type Props = {
  appointment: Appointment
  onUpdated: (appointment: Appointment) => void
}

export default function AppointmentCard({ appointment, onUpdated }: Props) {
  const t = useTranslations('AppointmentsPage')
  const tTime = useTranslations('BookingPage.form.timeOptions')
  const locale = useLocale() as Locale
  const [isPending, startTransition] = useTransition()
  const status = (appointment.status ?? 'pending') as StatusValue

  const persist = (data: { status?: StatusValue; note?: string }, successKey: string) => {
    const previous = appointment
    // optimistic update
    onUpdated({ ...appointment, ...data })
    startTransition(async () => {
      const res = await updateAppointment(appointment.id, data, locale)
      if (res.ok && res.appointment) {
        onUpdated(res.appointment)
        toast.success(t(successKey))
      } else {
        onUpdated(previous)
        toast.error(t('updateError'))
      }
    })
  }

  const displayName = appointment.nickname || appointment.fullname
  const showFullname = appointment.nickname && appointment.nickname !== appointment.fullname

  const timeOfDay = asTimeOfDay(appointment.time)
  const TimeIcon = timeOfDay ? TIME_OF_DAY_ICONS[timeOfDay] : null

  return (
    <Card className="flex gap-4 p-4">
      {/* Time-of-day rail */}
      <div className="flex w-20 shrink-0 flex-col items-center gap-1 border-r border-border/70 pr-3 pt-0.5 text-center">
        {TimeIcon ? (
          <>
            <TimeIcon className="size-6 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{tTime(timeOfDay!)}</span>
          </>
        ) : (
          <span className="text-muted-foreground" aria-hidden>
            —
          </span>
        )}
      </div>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-tight">{displayName}</h3>
            {showFullname && (
              <p className="text-sm text-muted-foreground">{appointment.fullname}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={cn('capitalize', STATUS_STYLES[status])}>
              {t(`status.${status}`)}
            </Badge>
            <Button size="icon" variant="ghost" asChild aria-label={t('openInAdmin')}>
              <NextLink
                target="_blank"
                href={`/admin/collections/appointments/${appointment.id}`}
              >
                <ExternalLinkIcon className="size-4" />
              </NextLink>
            </Button>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>{appointment.phone}</span>
          {appointment.email && <span className="break-all">{appointment.email}</span>}
        </div>

        {/* Treatments */}
        {Array.isArray(appointment.treatments) && appointment.treatments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {appointment.treatments.map((treatment) =>
              typeof treatment === 'object' && treatment !== null ? (
                <Link key={treatment.id} href={`/treatments/${treatment.slug}`}>
                  <Badge variant="secondary">{treatment.title}</Badge>
                </Link>
              ) : (
                <Badge key={treatment} variant="secondary">
                  {treatment}
                </Badge>
              ),
            )}
          </div>
        )}

        {/* Patient message */}
        {appointment.message && (
          <p className="text-sm text-muted-foreground">{appointment.message}</p>
        )}

        {/* Status selector */}
        <StatusSelector
          value={status}
          disabled={isPending}
          onChange={(next) => persist({ status: next }, 'statusUpdated')}
        />

        {/* Note */}
        <NoteEditor
          note={appointment.note ?? ''}
          disabled={isPending}
          onSave={(note) => persist({ note }, 'noteSaved')}
        />
      </div>
    </Card>
  )
}

function StatusSelector({
  value,
  disabled,
  onChange,
}: {
  value: StatusValue
  disabled: boolean
  onChange: (status: StatusValue) => void
}) {
  const t = useTranslations('AppointmentsPage')

  return (
    <div role="radiogroup" aria-label={t('filterStatus')} className="flex flex-wrap gap-1.5">
      {STATUSES.map((s) => {
        const Icon = STATUS_ICONS[s]
        const selected = s === value
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled || selected}
            onClick={() => onChange(s)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              'disabled:cursor-default',
              selected
                ? cn('border-transparent', STATUS_STYLES[s])
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground disabled:opacity-100',
            )}
          >
            <Icon className="size-3.5" />
            {t(`status.${s}`)}
          </button>
        )
      })}
    </div>
  )
}

function NoteEditor({
  note,
  disabled,
  onSave,
}: {
  note: string
  disabled: boolean
  onSave: (note: string) => void
}) {
  const t = useTranslations('AppointmentsPage')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(note)

  const startEditing = () => {
    setDraft(note)
    setEditing(true)
  }

  if (editing) {
    return (
      <div className="space-y-2">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          maxLength={2000}
          autoFocus
          placeholder={t('addNote')}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={disabled}
            onClick={() => {
              onSave(draft.trim())
              setEditing(false)
            }}
          >
            {t('saveNote')}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
            {t('cancel')}
          </Button>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <Button
        size="sm"
        variant="ghost"
        className="w-fit px-2 text-muted-foreground"
        onClick={startEditing}
      >
        <PlusIcon className="mr-1.5 size-4" />
        {t('addNote')}
      </Button>
    )
  }

  return (
    <div className="group flex items-start gap-2 rounded-md bg-accent/60 p-2">
      <p className="flex-1 text-sm">
        <span className="font-medium">{t('note')}: </span>
        {note}
      </p>
      <Button
        size="icon"
        variant="ghost"
        className="size-7 shrink-0"
        aria-label={t('editNote')}
        onClick={startEditing}
      >
        <PencilIcon className="size-3.5" />
      </Button>
    </div>
  )
}
