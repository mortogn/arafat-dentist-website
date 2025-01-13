import type { Config } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

export const getGlobal = async (slug: Global, depth = 0) => {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], { tags: [`globals_${slug}`] })
