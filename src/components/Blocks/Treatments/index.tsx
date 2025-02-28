import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SectionTitle from '@/components/SectionTitle'
import TreatmentWrapper from '@/components/Treatment/TreatmentWrapper'
import { Treatment, TreatmentsBlock } from '@/payload-types'
import { Locale } from '@/types'
import { getCachedCollection } from '@/utilities/getCollection'
import React, { FC } from 'react'

type Props = {
  data: TreatmentsBlock
  locale: Locale
}

const TreatmentsSection: FC<Props> = async ({ data, locale }) => {
  let treatments: Treatment[] | null = null

  if (data.showAllTreatments) {
    const result = await getCachedCollection({
      collection: 'treatments',
      locale,
      depth: 1,
      limit: 100,
      select: {
        thumbnail: true,
        title: true,
        description: true,
        slug: true,
      } as Partial<Record<keyof Treatment, true>>,
    })()

    if (result.docs.length > 0) {
      treatments = result.docs as Treatment[]
    }
  }

  return (
    <MaxWidthWrapper id="treatments" element="section" className="my-10">
      <SectionTitle title={data.title} description={data.description} />

      {treatments && treatments.length > 0 && (
        <TreatmentWrapper className="mt-8" treatments={treatments} />
      )}
    </MaxWidthWrapper>
  )
}

export default TreatmentsSection
