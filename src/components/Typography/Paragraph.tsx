import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const paragraphVariants = cva('tracking-wide text-muted-foreground font-body')

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof paragraphVariants>

const Paragraph: React.FC<ParagraphProps> = ({ className, children, ...props }) => {
  return (
    <p className={paragraphVariants({ className })} {...props}>
      {children}
    </p>
  )
}

Paragraph.displayName = 'Paragraph'

export default Paragraph
