export const dynamic = 'force-static'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { generateSitemap, GenerateSitemapParams } from '@/utilities/generateSitemap'
import { __BASE_URL__ } from '@/const/baseUrl'
import { Locale } from '@/types'

export const getCachedTreatmentsSitemap = (locale: Locale) =>
  unstable_cache(
    async (): Promise<GenerateSitemapParams['data']> => {
      const payload = await getPayload({ config })

      const treatments = await payload.find({
        select: {
          slug: true,
          thumbnail: true,
          updatedAt: true,
        },
        collection: 'treatments',
        depth: 1,
        where: {
          _status: { equals: 'published' },
        },
        limit: 1000,
        pagination: false,
        locale,
      })

      return treatments.docs.map((treatment) => ({
        url: `${__BASE_URL__}/${locale}/treatments/${treatment.slug}`,
        lastModifed: treatment.updatedAt,
        priority: 0.8,
        images:
          typeof treatment.thumbnail !== 'string'
            ? [`${__BASE_URL__}${treatment.thumbnail.url}`].filter(
                (image): image is string => !!image,
              )
            : [],
      }))
    },
    ['treatments-sitemap', locale],
    {
      tags: ['treatments-sitemap'],
    },
  )

export async function GET(_: Request, { params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  const treatmentsSitemap = await getCachedTreatmentsSitemap(locale)()

  const sitemap = generateSitemap({ data: treatmentsSitemap })

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
