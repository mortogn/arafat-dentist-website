import { Locale } from '@/types'
import { generateSEO } from '@/utilities/generateSeo'

import { getPageBySlug } from '@/utilities/getPageBySlug'
import { Metadata } from 'next'

import { setRequestLocale } from 'next-intl/server'

import { cache } from 'react'
import { renderer } from '../_renderer'

const getAboutPage = cache(async (locale: Locale) => getPageBySlug('about', 1, locale))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  const aboutPage = await getAboutPage(locale)

  return generateSEO(aboutPage.meta)
}

export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  const aboutPage = await getAboutPage(locale)

  return aboutPage.layout?.map((block) => renderer(block, locale))
}
