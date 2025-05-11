'use client'

import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { bookFormSchema, BookFormValues } from './bookFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Treatment } from '@/payload-types'
import DatePicker from '@/components/DatePicker'
import { format } from 'date-fns'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createAppointment } from './bookingFormAction'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import TreatmentMultiSelect from './TreatmentMultiSelect'

type Props = {
  treatments: Treatment[]
}

const ActualBookForm: FC<Props> = ({ treatments }) => {
  const t = useTranslations('BookingPage.form')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BookFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      treatmentIds: [], // This will now store comma-separated IDs
      date: new Date(),
      message: '',
    },
    resolver: zodResolver(bookFormSchema),
  })

  const submitHandler = async (values: BookFormValues) => {
    try {
      setIsSubmitting(true)
      const success = await createAppointment(values)

      if (success) {
        form.reset()
        toast.success(t('success.title'), {
          description: t('success.message'),
        })
      } else {
        throw new Error('Failed to create appointment')
      }
    } catch {
      toast.error(t('failed.title'), {
        description: t('failed.message'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form className="max-w-[450px] w-full space-y-2" onSubmit={form.handleSubmit(submitHandler)}>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fullname')}</FormLabel>
              <FormControl>
                <Input placeholder={t('placeholders.fullname')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('placeholders.email')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('phone')}</FormLabel>
              <FormControl>
                <Input type="tel" placeholder={t('placeholders.phone')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="treatmentIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('treatments')}</FormLabel>
              <FormControl>
                <TreatmentMultiSelect
                  treatments={treatments}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('placeholders.treatments')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('date')}</FormLabel>
                <FormControl>
                  <div>
                    <DatePicker
                      calenderProps={{
                        mode: 'single',
                        selected: field.value,
                        onSelect: field.onChange,
                      }}
                      placeholder={field.value ? format(field.value, 'PPP') : t('date')}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('notes')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('placeholders.notes')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          data-umami-event="Book appointment button"
          data-umami-event-email={form.getValues('email')}
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
      </form>
    </Form>
  )
}

export default ActualBookForm
