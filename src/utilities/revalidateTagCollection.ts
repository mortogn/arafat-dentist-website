import { Config } from '@/payload-types'
import { revalidateTag } from 'next/cache'

type CollectionSlugs = keyof Config['collections']

/**
 * Revalidates a collection tag in Next.js cache
 *
 * @param tag - A string literal type that combines 'collections_' prefix with collection slugs from Config
 * @returns A Promise that resolves when the tag has been revalidated
 *
 * @example
 * ```typescript
 * revalidateTagCollection('collections_users')
 * ```
 */
export const revalidateTagCollection = (tag: `collection_${CollectionSlugs}`) => revalidateTag(tag)
