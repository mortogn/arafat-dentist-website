import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getPageBySlug } from '@/utilities/getPageBySlug'
import React from 'react'
import { renderBookAppointmentPage } from './_renderer'
import { notFound } from 'next/navigation'
import { Locale } from '@/types'
import { setRequestLocale } from 'next-intl/server'
import { cache } from 'react'
import { generateSEO } from '@/utilities/generateSeo'

const getBookingPage = cache((locale: Locale) => {
  return getPageBySlug('book-appointment', 2, locale)
})

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  const bookingPage = await getBookingPage(locale)

  if (!bookingPage) {
    notFound()
  }

  return generateSEO(bookingPage.meta)
}

export default async function BookingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = await getBookingPage(locale)

  if (!page) {
    notFound()
  }

  return (
    <MaxWidthWrapper>
      {page.layout?.map((block) => renderBookAppointmentPage(block, locale))}
    </MaxWidthWrapper>
  )
}
