'use client'

import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { bookFormSchema, BookFormValues } from './bookFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
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
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
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
              <FormLabel>Treatment</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a treatment" />
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
                <FormLabel>Appointment Date</FormLabel>
                <FormControl>
                  <div>
                    <DatePicker
                      calenderProps={{
                        mode: 'single',
                        selected: field.value,
                        onSelect: field.onChange,
                      }}
                      placeholder={
                        field.value
                          ? format(field.value, 'PPP')
                          : 'Select the date for your appointment'
                      }
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Please provide any additional information that you think we should know.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full">Submit</Button>
      </form>
    </Form>
  )
}

export default ActualBookForm
