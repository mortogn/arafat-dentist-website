import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getPageBySlug } from '@/utilities/getPageBySlug'
import React from 'react'
import { renderBookAppointmentPage } from './_renderer'
import { notFound } from 'next/navigation'

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: 'en-US' | 'bn-BD' }>
}) {
  const page = await getPageBySlug('book-appointment', 2, (await params).locale)

  if (!page) {
    notFound()
  }

  return (
    <MaxWidthWrapper>
      {page.layout?.map((block) => renderBookAppointmentPage(block))}
    </MaxWidthWrapper>
  )
}
