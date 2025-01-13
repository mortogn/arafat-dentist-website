import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { FC } from 'react'

type LogoProps = {
  className?: string
  src: string
  alt: string
}

const Logo: FC<LogoProps> = ({ className, src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={200}
      width={200}
      className={cn('h-[200px] w-auto', className)}
    />
  )
}

export default Logo
