import { setRequestLocale } from 'next-intl/server'
import { renderer } from './_renderer'
import { cache } from 'react'
import { Locale } from '@/types'
import { generateSEO } from '@/utilities/generateSeo'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

const getHomePageData = cache(async (locale: Locale) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })

  const home = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    draft,
    depth: 2,
    locale,
    pagination: false,
    limit: 1,
  })

  return home.docs[0]
})

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  const homePageData = await getHomePageData(locale)
  return generateSEO(homePageData?.meta)
}

export default async function Home({ params }: { params: Promise<{ locale: 'en-US' | 'bn-BD' }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  const homePage = await getHomePageData(locale)

  if (!homePage) return null

  return homePage.layout?.map((block) => renderer(block, locale))
}
