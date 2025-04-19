import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { renderBookAppointmentPage } from './_renderer'
import { notFound } from 'next/navigation'
import { Locale } from '@/types'
import { setRequestLocale } from 'next-intl/server'
import { cache } from 'react'
import { generateSEO } from '@/utilities/generateSeo'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

const getBookingPageData = cache(async (locale: Locale) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })

  const bookingPage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'book-appointment',
      },
    },
    draft,
    depth: 2,
    locale,
    pagination: false,
    limit: 1,
  })

  if (bookingPage.docs.length === 0) {
    return null
  }

  return bookingPage.docs[0]
})

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  const bookingPage = await getBookingPageData(locale)

  if (!bookingPage) {
    notFound()
  }

  return generateSEO(bookingPage.meta)
}

export default async function BookingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = await getBookingPageData(locale)

  if (!page) {
    notFound()
  }

  return (
    <MaxWidthWrapper>
      {page.layout?.map((block) => renderBookAppointmentPage(block, locale))}
    </MaxWidthWrapper>
  )
}
