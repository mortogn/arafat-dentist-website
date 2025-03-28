import { Review } from '@/payload-types'
import React from 'react'
import Media from '../Media'
import RichTextContent from '../RichTextContent'
import { cn } from '@/lib/utils'

type Props = {
  data: NonNullable<Review['text']>
} & React.ComponentProps<'div'>

const TextReviewCard = ({ data, className, ...props }: Props) => {
  return (
    <div
      className={cn('space-y-4 bg-background border border-border rounded-lg p-6', className)}
      {...props}
    >
      <div>
        <h3 className="font-semibold text-foreground">{data?.title}</h3>
        <RichTextContent
          data={data?.description}
          className="prose md:prose lg:prose xl:prose 2xl:prose"
        />
      </div>
      <div className="flex items-center gap-2">
        <Media resource={data?.patient.image} height={50} width={50} />
        <div className="space-y-0.5">
          <h3 className="font-medium text-base">{data?.patient.name}</h3>
          <p className="text-muted-foreground text-base">{data?.patient.location}</p>
        </div>
      </div>
    </div>
  )
}

export default TextReviewCard
