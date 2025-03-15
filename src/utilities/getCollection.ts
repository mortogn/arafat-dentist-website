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
  select?: {
    [key: string]: true
  }
}

export const getCollection = async (params: GetCollectionParams) => {
  const { locale, collection, limit = 10, page = 1, depth, select } = params

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection,
    limit,
    locale,
    select,
    page,
    depth,
    draft: false,
  })

  return result
}

export const getCachedCollection = (params: GetCollectionParams) => {
  const { collection, locale, limit = 10, page = 1, depth, select } = params

  return unstable_cache(
    async () => getCollection({ collection, select, locale, limit, page, depth }),
    [collection, locale, limit.toString(), page.toString(), JSON.stringify(select)],
    {
      tags: [`collection_${collection}`],
    },
  )
}
