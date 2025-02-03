import { Treatment } from '@/payload-types'
import React, { FC, HTMLAttributes } from 'react'
import TreatmentCard from './TreatmentCard'
import { cn } from '@/lib/utils'

type Props = HTMLAttributes<HTMLDivElement> & {
  treatments: Pick<Treatment, 'id' | 'title' | 'description' | 'slug' | 'thumbnail'>[]
}

const TreatmentWrapper: FC<Props> = ({ treatments, className, ...props }) => {
  return (
    <div
      className={cn('grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3', className)}
      {...props}
    >
      {treatments.map((treatment) => (
        <TreatmentCard treatment={treatment} key={treatment.id} />
      ))}
    </div>
  )
}

export default TreatmentWrapper
