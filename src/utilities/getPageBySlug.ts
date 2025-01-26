import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

export const getPageBySlug = cache(async (slug: string, depth = 0, locale?: 'en-US' | 'bn-BD') => {
  const payload = await getPayload({ config })

  const page = await payload.find({
    collection: 'pages',
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    pagination: false,
    locale,
  })

  return page.docs[0]
})
