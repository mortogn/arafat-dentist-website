import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateFooter: GlobalAfterChangeHook = async ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    revalidateTag('globals_footer')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    revalidateTag('globals_footer')
  }

  payload.logger.info('Revalidating Footer')

  return doc
}
