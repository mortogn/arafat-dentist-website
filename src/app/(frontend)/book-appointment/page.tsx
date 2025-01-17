import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getPageBySlug } from '@/utilities/getPageBySlug'
import React from 'react'
import { renderBookAppointmentPage } from './_renderer'
import { notFound } from 'next/navigation'

export default async function BookingPage() {
  const page = await getPageBySlug('book-appointment', 2)

  if (!page) {
    notFound()
  }

  console.log(page)

  return (
    <MaxWidthWrapper>
      {page.layout?.map((block) => renderBookAppointmentPage(block))}
    </MaxWidthWrapper>
  )
}
