import { Locale } from '@/types'
import { generateSEO } from '@/utilities/generateSeo'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { cache } from 'react'
import { renderer } from '../_renderer'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

const getAboutPageData = cache(async (locale: Locale) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })

  const aboutPage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'about',
      },
    },
    draft,
    depth: 2,
    locale,
    pagination: false,
    limit: 1,
  })

  return aboutPage.docs[0]
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  const aboutPage = await getAboutPageData(locale)

  return generateSEO(aboutPage.meta)
}

export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  const aboutPage = await getAboutPageData(locale)

  return aboutPage.layout?.map((block) => renderer(block, locale))
}
