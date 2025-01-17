import { z } from 'zod'

export const bookFormSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email().optional(),
  phone: z.string().regex(/^(?:\+88)?(?:01[3-9])\d{8}$/),
  treatmentId: z.string().min(3),
  date: z.date(),
  time: z.string().optional(),
  address: z.string().min(3),
  message: z.string().max(250).optional(),
})

export type BookFormValues = z.infer<typeof bookFormSchema>
