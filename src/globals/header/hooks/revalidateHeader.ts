import { revalidateTagGlobal } from '@/utilities/revalidateTagGlobal'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, previousDoc, req: { payload } }) => {
  if (doc._status === 'published') {
    payload.logger.info('Revalidating header')
    revalidateTagGlobal('globals_header')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    payload.logger.info('Revalidating header')
    revalidateTagGlobal(`globals_header`)
  }

  return doc
}
