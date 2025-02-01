import { Treatment } from '@/payload-types'
import React, { FC, HTMLAttributes } from 'react'
import TreatmentCard from './TreatmentCard'
import { cn } from '@/lib/utils'

type Props = HTMLAttributes<HTMLDivElement> & {
  treatments: Pick<Treatment, 'id' | 'title' | 'description' | 'slug' | 'thumbnail'>[]
}

const TreatmentWrapper: FC<Props> = ({ treatments, className, ...props }) => {
  return (
    <div className={cn('', className)} {...props}>
      {treatments.map((treatment) => (
        <TreatmentCard treatment={treatment} key={treatment.id} />
      ))}
    </div>
  )
}

export default TreatmentWrapper
