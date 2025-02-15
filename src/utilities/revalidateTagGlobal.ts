import { Config } from '@/payload-types'
import { revalidateTag } from 'next/cache'

type GlobalSlugs = keyof Config['globals']

/**
 * Revalidates a global tag for Next.js cache
 * @param tag - The global tag to revalidate, must start with 'globals_'
 */
export const revalidateTagGlobal = (tag: `globals_${GlobalSlugs}`) => revalidateTag(tag)
