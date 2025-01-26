import { Header, Social } from '@/payload-types'
import { GlobalAfterReadHook } from 'payload'

// This hook will populate the socials field in the header (topbar) if the showSocials field is checked
export const populateSocials: GlobalAfterReadHook = async ({ doc, req: { payload }, req }) => {
  const { topbar } = doc as Header & { topbar: Header['topbar'] & { socials?: Social['socials'] } }

  if (topbar.showSocials) {
    const socials = await payload.findGlobal({
      slug: 'socials',
      req,
    })

    if (socials.socials?.length === 0) {
      return doc
    }

    if (socials) {
      topbar.socials = socials.socials
    }

    return doc
  }

  return doc
}
