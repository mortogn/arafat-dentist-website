export const dynamic = 'force-static'

import { __BASE_URL__ } from '@/const/baseUrl'
import { Locale } from '@/types'
import { generateSitemap, GenerateSitemapParams } from '@/utilities/generateSitemap'

const sitemapData = (locale: Locale): GenerateSitemapParams['data'] => {
  return [
    {
      url: `${__BASE_URL__}/${locale}`,
      lastModifed: new Date(),
      priority: 1,
    },
    {
      url: `${__BASE_URL__}/${locale}/about`,
      lastModifed: new Date(),
      priority: 0.8,
    },
    {
      url: `${__BASE_URL__}/${locale}/treatments`,
      lastModifed: new Date(),
      priority: 0.8,
    },
    {
      url: `${__BASE_URL__}/${locale}/book-appointment`,
      lastModifed: new Date(),
      priority: 1,
    },
  ]
}

export async function GET(_: Request, { params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  const sitemap = generateSitemap({ data: sitemapData(locale) })
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
