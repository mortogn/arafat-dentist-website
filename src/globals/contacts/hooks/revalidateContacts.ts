import { revalidateTagGlobal } from '@/utilities/revalidateTagGlobal'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateContacts: GlobalAfterChangeHook = async ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    revalidateTagGlobal('globals_contacts')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    revalidateTagGlobal('globals_contacts')
  }

  payload.logger.info('Revalidating Contacts')

  return doc
}
