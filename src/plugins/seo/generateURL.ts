import { CollectionSlug } from 'payload'

type Doc = {
  [key: string]: unknown
}

export const generateURL = (doc: Doc, collectionSlug: CollectionSlug) => {
  if (collectionSlug === 'pages') {
    return doc?.slug === 'home' ? '/' : `/${doc?.slug}`
  }
}
