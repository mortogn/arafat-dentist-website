import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, previousDoc, req: { payload } }) => {
  if (doc._status === 'published') {
    payload.logger.info('Revalidating header')
    revalidateTag(`globals_header`)
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    payload.logger.info('Revalidating header')
    revalidateTag(`globals_header`)
  }

  return doc
}
