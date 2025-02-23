import { locales } from '@/const/locale'
import { revalidatePath } from 'next/cache'
import { CollectionAfterChangeHook } from 'payload'

const getPathFromSlug = (slug: string) => {
  return slug === 'home' ? '/' : `/${slug}`
}

export const revalidatePage: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    payload.logger.info(`Revalidating page: ${doc.slug}`)

    locales.forEach((locale) => {
      revalidatePath(`${locale}${getPathFromSlug(doc.slug)}`)
    })
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    payload.logger.info(`Revalidating page: ${doc.slug}`)

    locales.forEach((locale) => {
      revalidatePath(`${locale}${getPathFromSlug(doc.slug)}`)
    })
  }
}
