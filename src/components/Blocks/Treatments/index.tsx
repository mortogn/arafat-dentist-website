import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SectionTitle from '@/components/SectionTitle'
import TreatmentWrapper from '@/components/Treatment/TreatmentWrapper'
import { Treatment, TreatmentsBlock } from '@/payload-types'
import React, { FC } from 'react'

type Props = {
  data: TreatmentsBlock
}

const TreatmentsSection: FC<Props> = ({ data }) => {
  return (
    <MaxWidthWrapper element="section" className="my-20">
      <SectionTitle title={data.title} description={data.description} />

      {data.treatments && typeof data.treatments !== 'string' && (
        <TreatmentWrapper
          className="mt-8"
          treatments={data.treatments.filter(
            (treatment): treatment is Treatment => typeof treatment !== 'string',
          )}
        />
      )}
    </MaxWidthWrapper>
  )
}

export default TreatmentsSection
