import { revalidatePath } from 'next/cache'
import { CollectionAfterChangeHook } from 'payload'

const getPathFromSlug = (slug: string) => {
  return slug === 'home' ? '/' : `/${slug}`
}

export const revalidatePage: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  if (doc._status === 'published') {
    revalidatePath(getPathFromSlug(doc.slug))
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    revalidatePath(getPathFromSlug(doc.slug))
  }
}
