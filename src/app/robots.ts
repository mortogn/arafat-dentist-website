import { __BASE_URL__ } from '@/const/baseUrl'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/bn-BD/appointments', '/en-US/appointments'],
      },
    ],
    sitemap: [
      `${__BASE_URL__}/bn-BD/sitemap.xml`,
      `${__BASE_URL__}/en-US/sitemap.xml`,

      `${__BASE_URL__}/bn-BD/treatments-sitemap.xml`,
      `${__BASE_URL__}/en-US/treatments-sitemap.xml`,
    ],
  }
}
