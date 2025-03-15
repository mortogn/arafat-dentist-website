import { getPayload } from 'payload'
import { Treatment } from '../payload-types'
import config from '@payload-config'

export async function getTreatment({
  slug,
  locale,
  draft = false,
}: {
  slug: string
  locale: 'en-US' | 'bn-BD'
  draft?: boolean
}): Promise<Treatment | null> {
  const payload = await getPayload({ config })

  const treatments = await payload.find({
    collection: 'treatments',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    locale: locale,
    draft: draft,
    limit: 1,
  })

  if (!treatments.docs?.[0]) {
    return null
  }

  return treatments.docs[0]
}
