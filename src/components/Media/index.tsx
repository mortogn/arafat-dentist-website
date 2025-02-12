import { cn } from '@/lib/utils'
import { type Media as MediaType } from '@/payload-types'
import Image, { type ImageProps } from 'next/image'
import React, { FC } from 'react'

type Props = Omit<ImageProps, 'src' | 'alt' | 'resource'> & {
  resource?: MediaType | string | null
  className?: string
}

const Media: FC<Props> = ({ resource, className, ...props }) => {
  if (resource && typeof resource === 'object' && resource.url) {
    return (
      <Image
        src={resource.url}
        alt={resource.alt}
        className={cn('object-cover', className)}
        {...props}
      />
    )
  }

  return null
}

export default Media
