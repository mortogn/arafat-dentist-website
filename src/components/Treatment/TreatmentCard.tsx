import { Treatment } from '@/payload-types'
import React, { FC, HTMLAttributes } from 'react'
import Media from '../Media'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type TreatmentCardProps = HTMLAttributes<HTMLDivElement> & {
  treatment: Pick<Treatment, 'id' | 'title' | 'description' | 'slug' | 'thumbnail'>
}

const TreatmentCard: FC<TreatmentCardProps> = ({ treatment, className, ...props }) => {
  return (
    <Link href={`/treatments/${treatment.slug}`}>
      <div className={cn('', className)} {...props}>
        <Media
          height={400}
          width={400}
          resource={treatment.thumbnail}
          className="aspect-square rounded-md"
        />

        <div className="space-y-1 mt-3 text-center">
          <h3 className="text-xl font-medium tracking-tight">{treatment.title}</h3>
          <p className="text-muted-foreground text-sm tracking-wide line-clamp-2">
            {treatment.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default TreatmentCard
