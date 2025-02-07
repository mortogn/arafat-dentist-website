import { Treatment } from '@/payload-types'
import React, { FC, HTMLAttributes } from 'react'
import Media from '../Media'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

type TreatmentCardProps = HTMLAttributes<HTMLDivElement> & {
  treatment: Pick<Treatment, 'id' | 'title' | 'description' | 'slug' | 'thumbnail'>
}

const TreatmentCard: FC<TreatmentCardProps> = ({ treatment, className, ...props }) => {
  return (
    <Link href={`/treatments/${treatment.slug}`}>
      <Card className={cn('h-full', className)} {...props}>
        <div>
          <Media
            height={400}
            width={400}
            resource={treatment.thumbnail}
            className="aspect-[5/3] rounded-md"
          />
        </div>
        <CardHeader className="">
          <CardTitle className="text-center">{treatment.title}</CardTitle>
          <CardDescription>
            <p className="text-muted-foreground text-sm tracking-wide line-clamp-2">
              {treatment.description}
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
      {/* <div className={cn('', className)} {...props}>
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
      </div> */}
    </Link>
  )
}

export default TreatmentCard
