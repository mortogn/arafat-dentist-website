'use client'

import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { bookFormSchema, BookFormValues } from './bookFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Treatment } from '@/payload-types'
import DatePicker from '@/components/DatePicker'
import { format } from 'date-fns'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type Props = {
  treatments: Treatment[]
}

const ActualBookForm: FC<Props> = ({ treatments }) => {
  const t = useTranslations('BookingPage.form')

  const form = useForm<BookFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      treatmentId: '',
      date: new Date(),
      time: '',
      address: '',
      message: '',
    },
    resolver: zodResolver(bookFormSchema),
  })

  const submitHandler = (values: BookFormValues) => {}

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
          name="treatmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('treatment')}</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('placeholders.treatment')} />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {treatments?.map((treatment) => (
                    <SelectItem value={treatment.id} key={treatment.id}>
                      {treatment.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

        <Button className="w-full">{t('submit')}</Button>
      </form>
    </Form>
  )
}

export default ActualBookForm
