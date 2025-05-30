import { revalidateTagCollection } from '@/utilities/revalidateTagCollection'
import { CollectionAfterChangeHook } from 'payload'

export const revalidateCache: CollectionAfterChangeHook = async ({ req: { payload } }) => {
  revalidateTagCollection('collection_popup')
  payload.logger.info('Revalidating collection_popup tag')
}
