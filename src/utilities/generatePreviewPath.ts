import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  treatments: '/treatments',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  locale: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, locale, slug, req }: Props) => {
  const path = `/${locale}/${collectionPrefixMap[collection]}/${collection === 'pages' && slug === 'home' ? '' : slug}`

  const params = {
    slug,
    collection,
    locale,
    path,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  const isProduction = process.env.NODE_ENV === 'production'
  const protocol = isProduction ? 'https:' : req.protocol

  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`

  return url
}
