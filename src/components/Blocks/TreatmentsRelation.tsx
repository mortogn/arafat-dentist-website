import { Treatment, TreatmentsRelationBlock } from '@/payload-types'
import React, { FC } from 'react'
import TreatmentWrapper from '../Treatment/TreatmentWrapper'

type Props = {
  data: TreatmentsRelationBlock
}

const TreatmentsRelationBlockComponent: FC<Props> = ({ data }) => {
  return (
    <>
      {data.treatments && (
        <TreatmentWrapper
          className="not-prose xl:grid-cols-3"
          treatments={data.treatments as Treatment[]}
        />
      )}
    </>
  )
}

export default TreatmentsRelationBlockComponent
