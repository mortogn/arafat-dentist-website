import EmbeddedMap from '@/components/EmbeddedMap'
import Icon from '@/components/Icons/Icon'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Contacts } from '@/payload-types'
import { Locale } from '@/types'
import { generateSEO } from '@/utilities/generateSeo'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPageBySlug } from '@/utilities/getPageBySlug'
import { Metadata } from 'next'

import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import React, { cache } from 'react'
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
