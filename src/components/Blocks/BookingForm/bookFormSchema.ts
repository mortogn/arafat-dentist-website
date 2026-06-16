import { z } from 'zod'

export const timeOfDayValues = ['morning', 'afternoon', 'evening', 'night'] as const
export type TimeOfDay = (typeof timeOfDayValues)[number]

export const bookFormSchema = z.object({
  fullName: z.string().min(3, { message: 'validation.fullname' }),
  email: z.string().email({ message: 'validation.email' }).optional().or(z.literal('')),
  phone: z
    .string()
    .regex(/^(?:\+88)?(?:01[3-9])\d{8}$/, { message: 'validation.phone' }),
  treatmentIds: z.array(z.string().min(3)).min(1, { message: 'validation.treatments' }),
  date: z.date({ message: 'validation.date' }),
  time: z.enum(timeOfDayValues).optional(),
  message: z.string().max(250, { message: 'validation.message' }).optional(),
})

export type BookFormValues = z.infer<typeof bookFormSchema>
