import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TreatmentWrapper from '@/components/Treatment/TreatmentWrapper'
import Heading from '@/components/Typography/Heading'
import Paragraph from '@/components/Typography/Paragraph'
import { Treatment } from '@/payload-types'
import { Locale } from '@/types'
import { getCollection } from '@/utilities/getCollection'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import React from 'react'

export const getTreatments = async ({ locale }: { locale: Locale }) => {
  const treatments = await getCollection({
    collection: 'treatments',
    locale,
    depth: 1,
    limit: 100,
    select: {
      title: true,
      description: true,
      slug: true,
      thumbnail: true,
    } as Partial<Record<keyof Treatment, true>>,
  })

  return treatments.docs as Treatment[]
}

export default async function Treatments({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'Treatments' })

  const treatments = await getTreatments({ locale })

  return (
    <MaxWidthWrapper>
      <div className="text-center">
        <Heading as="h1">{t('title')}</Heading>
        <Paragraph>{t('description')}</Paragraph>
      </div>

      {treatments.length > 0 && <TreatmentWrapper className="my-10" treatments={treatments} />}
    </MaxWidthWrapper>
  )
}
