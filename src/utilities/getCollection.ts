import { Config } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

type GetCollectionParams = {
  locale: 'en-US' | 'bn-BD'
  collection: Collection
  limit?: number
  page?: number
  depth?: number
}

export const getCollection = async (params: GetCollectionParams) => {
  const { locale, collection, limit = 10, page = 1, depth } = params

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection,
    limit,
    locale,
    page,
    depth,
  })

  return result
}

export const getCachedCollection = (params: GetCollectionParams) => {
  const { collection, locale, limit = 10, page = 1, depth } = params

  return unstable_cache(
    async () => getCollection({ collection, locale, limit, page, depth }),
    [collection, locale, limit.toString(), page.toString()],
    {
      tags: [`collection_${collection}`],
    },
  )
}
