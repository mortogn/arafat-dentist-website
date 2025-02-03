import { Page } from '@/payload-types'
import { CollectionAfterReadHook } from 'payload'

export const populateTreaments: CollectionAfterReadHook = async ({
  doc,
  req: { payload },
  req,
}) => {
  const treatmentBlock = (doc as Page).layout?.find((block) => block.blockType === 'treatments')

  if (!treatmentBlock || !treatmentBlock.showAllTreatments) return doc

  const treatments = await payload.find({
    collection: 'treatments',
    limit: 100,
    sort: '-createdAt',
    req,
    pagination: false,
  })

  treatmentBlock.treatments = treatments.docs

  payload.logger.info('Populated treatments for treatments block')

  return doc
}
