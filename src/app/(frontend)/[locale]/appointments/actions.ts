'use server'

import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import type { Appointment } from '@/payload-types'
import type { Locale } from '@/types'

const STATUSES = ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'] as const

type UpdateData = {
  status?: Appointment['status']
  note?: string
}

export async function updateAppointment(
  id: string,
  data: UpdateData,
  locale?: Locale,
): Promise<{ ok: boolean; appointment?: Appointment }> {
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: await getHeaders() })

    if (!user) return { ok: false }

    const patch: Record<string, unknown> = {}
    if (data.status && STATUSES.includes(data.status)) {
      patch.status = data.status
    }
    if (typeof data.note === 'string') {
      patch.note = data.note.slice(0, 2000)
    }

    if (Object.keys(patch).length === 0) return { ok: false }

    const updated = await payload.update({
      collection: 'appointments',
      id,
      data: patch,
      user,
      overrideAccess: false, // enforces the collection's isAdmin update access
      // status/note are unlocalized, but the response re-reads localized
      // relationship fields (treatment title/slug); resolve them in the
      // caller's locale so the UI doesn't flip to the default locale.
      locale,
    })

    return { ok: true, appointment: updated as Appointment }
  } catch (err) {
    console.error('Error updating appointment', err)
    return { ok: false }
  }
}
