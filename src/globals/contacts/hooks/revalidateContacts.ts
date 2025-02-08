import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateContacts: GlobalAfterChangeHook = async ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    revalidateTag('globals_contacts')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    revalidateTag('globals_contacts')
  }

  payload.logger.info('Revalidating Contacts')

  return doc
}
