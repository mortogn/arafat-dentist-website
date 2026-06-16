'use client'

import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { bookFormSchema, BookFormValues } from './bookFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Treatment } from '@/payload-types'
import DatePicker from '@/components/DatePicker'
import { format } from 'date-fns'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createAppointment } from './bookingFormAction'
import { toast } from 'sonner'
import { CheckCircle2, Loader2 } from 'lucide-react'
import TreatmentChips from './TreatmentChips'
import TimeOfDaySelect from './TimeOfDaySelect'
import AppointmentSummary from './AppointmentSummary'

type Props = {
  treatments: Treatment[]
}

type Snapshot = {
  name: string
  treatments: Treatment[]
  date?: Date
  time?: BookFormValues['time']
}

const ActualBookForm: FC<Props> = ({ treatments }) => {
  const t = useTranslations('BookingPage.form')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState<Snapshot | null>(null)

  const form = useForm<BookFormValues>({
    defaultValues: {
      fullName: '',
      phone: '',
      treatmentIds: [],
      date: undefined,
      time: undefined,
      message: '',
    },
    resolver: zodResolver(bookFormSchema),
  })

  // Live values that feed the summary slip
  const watchedTreatmentIds = form.watch('treatmentIds')
  const watchedDate = form.watch('date')
  const watchedTime = form.watch('time')

  const selectedTreatments = treatments.filter((treatment) =>
    (watchedTreatmentIds ?? []).includes(treatment.id),
  )

  const submitHandler = async (values: BookFormValues) => {
    try {
      setIsSubmitting(true)
      const success = await createAppointment(values)

      if (success) {
        setConfirmed({
          name: values.fullName,
          treatments: selectedTreatments,
          date: values.date,
          time: values.time,
        })
        form.reset()
        toast.success(t('success.title'), { description: t('success.message') })
      } else {
        throw new Error('Failed to create appointment')
      }
    } catch {
      toast.error(t('failed.title'), { description: t('failed.message') })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-md space-y-6 py-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-7" />
          </span>
          <h2 className="font-heading text-2xl tracking-tight">{t('confirmation.title')}</h2>
          <p className="text-muted-foreground">
            {t('confirmation.message', { name: confirmed.name })}
          </p>
        </div>

        <AppointmentSummary
          treatments={confirmed.treatments}
          date={confirmed.date}
          time={confirmed.time}
          className="text-left"
        />

        <div className="rounded-lg bg-accent/60 p-4 text-left text-sm">
          <p className="font-medium">{t('confirmation.whatsNext')}</p>
          <p className="mt-1 text-muted-foreground">{t('confirmation.whatsNextDetail')}</p>
        </div>

        <Button variant="outline" className="w-full" onClick={() => setConfirmed(null)}>
          {t('confirmation.bookAnother')}
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        {/* Fields */}
        <div className="space-y-8">
          {/* Section: Your details */}
          <fieldset className="space-y-4">
            <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('sections.details')}
            </legend>

            <FormField
              control={form.control}
              name="fullName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('fullname')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholders.fullname')} {...field} />
                  </FormControl>
                  <FieldError message={fieldState.error?.message} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('phone')}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder={t('placeholders.phone')} {...field} />
                  </FormControl>
                  {fieldState.error ? (
                    <FieldError message={fieldState.error.message} />
                  ) : (
                    <p className="text-xs text-muted-foreground">{t('phoneHint')}</p>
                  )}
                </FormItem>
              )}
            />
          </fieldset>

          {/* Section: Your visit */}
          <fieldset className="space-y-4">
            <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('sections.visit')}
            </legend>

            <FormField
              control={form.control}
              name="treatmentIds"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('treatments')}</FormLabel>
                  <FormControl>
                    <TreatmentChips
                      treatments={treatments}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FieldError message={fieldState.error?.message} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('date')}</FormLabel>
                  <FormControl>
                    <DatePicker
                      calenderProps={{
                        mode: 'single',
                        selected: field.value,
                        onSelect: field.onChange,
                      }}
                      placeholder={field.value ? format(field.value, 'PPP') : t('date')}
                    />
                  </FormControl>
                  <FieldError message={fieldState.error?.message} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('time')}</FormLabel>
                  <FormControl>
                    <TimeOfDaySelect value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </fieldset>

          {/* Section: Anything else */}
          <fieldset className="space-y-4">
            <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('sections.extra')}
            </legend>

            <FormField
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('notes')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('placeholders.notes')} rows={3} {...field} />
                  </FormControl>
                  <FieldError message={fieldState.error?.message} />
                </FormItem>
              )}
            />
          </fieldset>
        </div>

        {/* Live summary + submit */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-max">
          <AppointmentSummary
            treatments={selectedTreatments}
            date={watchedDate}
            time={watchedTime}
          />

          <Button
            data-umami-event="Book appointment button"
            data-umami-event-name={form.getValues('fullName')}
            data-umami-event-treatments={form.getValues('treatmentIds')}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                {t('submitting')}
              </>
            ) : (
              t('submit')
            )}
          </Button>
        </aside>
      </form>
    </Form>
  )
}

// Translates zod message keys (e.g. "validation.phone") under the BookingPage.form namespace.
const FieldError: FC<{ message?: string }> = ({ message }) => {
  const t = useTranslations('BookingPage.form')
  if (!message) return null
  return <p className="text-sm font-medium text-destructive">{t(message)}</p>
}

export default ActualBookForm
