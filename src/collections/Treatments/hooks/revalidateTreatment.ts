import { locales } from '@/const/locale'
import { revalidateTagCollection } from '@/utilities/revalidateTagCollection'
import { revalidatePath } from 'next/cache'
import { CollectionAfterChangeHook } from 'payload'

export const revalidateTreatment: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  previousDoc,
}) => {
  // Always revalidate the collection tag for list pages
  revalidateTagCollection('collection_treatments')

  if (doc?._status === previousDoc?._status && doc._status !== 'published') {
    return doc
  }

  try {
    // Fetch all translations of the current document
    const translations = await Promise.all(
      locales.map(async (locale) => {
        const result = await payload.findByID({
          collection: 'treatments',
          id: doc.id,
          draft: true,
          locale,
          depth: 0,
        })

        return {
          locale,
          slug: result?.slug,
        }
      }),
    )

    // Revalidate paths only for valid translations
    translations
      .filter(({ slug }) => slug)
      .forEach(({ locale, slug }) => {
        revalidatePath(`/${locale}/treatments/${slug}`, 'page')
      })

    // Revalidate the treatments index page for each locale
    locales.forEach((locale) => {
      revalidatePath(`/${locale}/treatments`, 'page')
    })
  } catch (err) {
    payload.logger.error('Error in revalidateTreatment hook', err)
  }

  return doc
}
