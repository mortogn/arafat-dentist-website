export type GenerateSitemapParams = {
  data: {
    url: string
    lastModifed?: Date | string
    priority?: number
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    images?: string[] | undefined
  }[]
}

export function generateSitemap(params: GenerateSitemapParams): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'

  for (const item of params.data) {
    xml += '  <url>\n'
    xml += `    <loc>${item.url}</loc>\n`

    if (item.lastModifed) {
      const lastModified = new Date(item.lastModifed).toISOString()
      xml += `    <lastmod>${lastModified}</lastmod>\n`
    }

    if (item.priority) {
      xml += `    <priority>${item.priority}</priority>\n`
    }

    if (item.changeFrequency) {
      xml += `    <changefreq>${item.changeFrequency}</changefreq>\n`
    }

    if (item.images?.length) {
      for (const image of item.images) {
        xml += '    <image:image>\n'
        xml += `      <image:loc>${image}</image:loc>\n`
        xml += '    </image:image>\n'
      }
    }

    xml += '  </url>\n'
  }

  xml += '</urlset>'
  return xml
}
