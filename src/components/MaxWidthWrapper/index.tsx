import { cn } from '@/lib/utils'
import React, { FC, HTMLAttributes } from 'react'

type MaxWidthWrapperProps = HTMLAttributes<HTMLDivElement>

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('max-w-[1440px] px-4 mx-auto', className)} {...props}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
