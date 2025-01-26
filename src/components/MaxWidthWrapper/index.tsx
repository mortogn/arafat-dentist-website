import { cn } from '@/lib/utils'
import React, { FC, HTMLAttributes } from 'react'

type MaxWidthWrapperProps = HTMLAttributes<HTMLDivElement> & {
  element?: 'div' | 'section'
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({
  className,
  children,
  element = 'div',
  ...props
}) => {
  return React.createElement(
    element,
    {
      className: cn('max-w-[1440px] px-4 mx-auto', className),
      ...props,
    },
    children,
  )
}

export default MaxWidthWrapper
