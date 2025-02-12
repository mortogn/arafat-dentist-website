import { Metadata } from 'next'
import { Media } from '../payload-types'

type Meta = {
  title?: string | null | undefined
  description?: string | null | undefined
  image?: string | Media | null | undefined
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export function generateSEO(meta?: Meta): Metadata {
  if (!meta) {
    return {}
  }

  const { title, description, image } = meta

  const imageUrl = typeof image === 'string' ? image : image?.url
  const imageWidth = typeof image === 'string' ? 1200 : image?.width
  const imageHeight = typeof image === 'string' ? 630 : image?.height
  const imageAlt = typeof image === 'string' ? title || '' : image?.alt || title || ''

  return {
    title: title || undefined,
    description: description || undefined,
    openGraph: imageUrl
      ? {
          title: title || undefined,
          description: description || undefined,
          images: [
            {
              url: `${baseUrl || ''}${imageUrl}`,
              width: imageWidth || 1200,
              height: imageHeight || 630,
              alt: imageAlt,
            },
          ],
        }
      : null,
    twitter: imageUrl
      ? {
          card: 'summary_large_image',
          title: title || undefined,
          description: description || undefined,
          images: [`${baseUrl || ''}${imageUrl}`],
        }
      : null,
  }
}
