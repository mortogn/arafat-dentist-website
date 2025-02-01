import { Treatment } from '@/payload-types'
import React, { FC, HTMLAttributes } from 'react'
import Media from '../Media'
import { cn } from '@/lib/utils'

type TreatmentCardProps = HTMLAttributes<HTMLDivElement> & {
  treatment: Pick<Treatment, 'id' | 'title' | 'description' | 'slug' | 'thumbnail'>
}

const TreatmentCard: FC<TreatmentCardProps> = ({ treatment, className, ...props }) => {
  return (
    <div className={cn('', className)} {...props}>
      <Media height={400} width={400} resource={treatment.thumbnail} />

      <div>
        <h2>{treatment.title}</h2>
        <p>{treatment.description}</p>
      </div>
    </div>
  )
}

export default TreatmentCard
