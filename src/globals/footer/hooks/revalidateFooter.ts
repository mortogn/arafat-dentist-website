import { revalidateTagGlobal } from '@/utilities/revalidateTagGlobal'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateFooter: GlobalAfterChangeHook = async ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    revalidateTagGlobal('globals_footer')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    revalidateTagGlobal('globals_footer')
  }

  payload.logger.info('Revalidating Footer')

  return doc
}
