import { revalidateTagGlobal } from '@/utilities/revalidateTagGlobal'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateSocials: GlobalAfterChangeHook = async ({ req: { payload }, doc }) => {
  if (doc?._status === 'published') {
    payload.logger.info('Revalidating socials.')
    revalidateTagGlobal('globals_socials')
  }

  return doc
}
