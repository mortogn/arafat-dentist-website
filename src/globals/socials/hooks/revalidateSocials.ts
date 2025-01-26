import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateSocials: GlobalAfterChangeHook = async ({ req: { payload }, doc }) => {
  if (doc?._status === 'published') {
    payload.logger.info('Revalidating header for socials changes.')
    revalidateTag('globals_header')
  }

  return doc
}
