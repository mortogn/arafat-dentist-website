import { cva, VariantProps } from 'class-variance-authority'
import React, { FC, HTMLAttributes } from 'react'

const headingVariants = cva('tracking-tight', {
  variants: {
    as: {
      h1: 'text-5xl font-bold',
      h2: 'text-4xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-2xl font-bold',
      h5: 'text-xl font-bold',
      h6: 'text-lg font-bold',
    },
  },
})

type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }

const Heading: FC<HeadingProps> = ({ as, className, children, ...props }) => {
  return React.createElement(
    as,
    { className: headingVariants({ className, as }), ...props },
    children,
  )
}

export default Heading
