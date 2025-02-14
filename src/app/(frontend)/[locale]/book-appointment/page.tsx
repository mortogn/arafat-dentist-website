import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getPageBySlug } from '@/utilities/getPageBySlug'
import React from 'react'
import { renderBookAppointmentPage } from './_renderer'
import { notFound } from 'next/navigation'
import { Locale } from '@/types'
import { setRequestLocale } from 'next-intl/server'

export default async function BookingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = await getPageBySlug('book-appointment', 2, locale)

  if (!page) {
    notFound()
  }

  return (
    <MaxWidthWrapper>
      {page.layout?.map((block) => renderBookAppointmentPage(block, locale))}
    </MaxWidthWrapper>
  )
}
