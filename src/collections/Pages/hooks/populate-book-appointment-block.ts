import { Page, Treatment } from '@/payload-types'
import { CollectionAfterReadHook } from 'payload'

export const populateBookAppointmentBlock: CollectionAfterReadHook<Page> = async ({
  doc,
  req: { payload },
}) => {
  if (!doc?.layout) return doc

  const bookingFormBlock = doc.layout.find((block) => block.blockType === 'booking-form')

  // if the treatments are selected manually, we skip the population
  if (!bookingFormBlock?.allTreatments) {
    return doc
  }

  const treatments = await payload.find({
    collection: 'treatments',
    depth: 2,
    limit: 100,
    pagination: false,
    select: {
      title: true,
      slug: true,
      description: true,
    },
  })

  bookingFormBlock.treatments = treatments.docs as Treatment[]
  payload.logger.info('Populated treatments in booking form block for page slug: ', doc.slug)

  return doc
}
