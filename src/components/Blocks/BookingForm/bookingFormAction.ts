'use server'

import { getPayload } from 'payload'
import { BookFormValues } from './bookFormSchema'
import config from '@payload-config'

export async function createAppointment(values: BookFormValues) {
  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'appointments',
      overrideAccess: false,
      data: {
        date: values.date.toISOString(),
        fullname: values.fullName,
        email: values.email,
        phone: values.phone,
        message: values.message,
        treatments: values.treatmentIds,
      },
    })

    return true
  } catch (err) {
    console.error('Error creating appointment', err)
    return false
  }
}
