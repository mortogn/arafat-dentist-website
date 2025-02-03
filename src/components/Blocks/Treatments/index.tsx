import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RichTextContent from '@/components/RichTextContent'
import TreatmentWrapper from '@/components/Treatment/TreatmentWrapper'
import { Treatment, TreatmentsBlock } from '@/payload-types'
import React, { FC } from 'react'

type Props = {
  data: TreatmentsBlock
}

const TreatmentsSection: FC<Props> = ({ data }) => {
  return (
    <MaxWidthWrapper element="section" className="my-20">
      <div className="text-center space-y-2 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-semibold">{data.title}</h2>
        <RichTextContent data={data.description} className="[&_p]:text-sm md:[&_p]:text-base" />
      </div>

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
