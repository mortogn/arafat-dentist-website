import { getPageBySlug } from '@/utilities/getPageBySlug'
import { setRequestLocale } from 'next-intl/server'
import { renderer } from './_renderer'
import { cache } from 'react'
import { Locale } from '@/types'
import { generateSEO } from '@/utilities/generateSeo'

const getHomePage = cache((locale: Locale) => {
  return getPageBySlug('home', 2, locale)
})

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  const homePage = await getHomePage(locale)

  return generateSEO(homePage.meta)
}

export default async function Home({ params }: { params: Promise<{ locale: 'en-US' | 'bn-BD' }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  const homePage = await getHomePage(locale)

  return homePage.layout?.map((block) => renderer(block, locale))
}
