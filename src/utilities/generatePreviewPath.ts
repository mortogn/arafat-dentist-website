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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/next/preview?${encodedParams.toString()}`

  return url
}
