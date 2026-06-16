import React, { FC } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'

type ProseSize = 'default' | 'compact' | 'card'

const proseSizeClasses: Record<ProseSize, string> = {
  // Marketing blocks: larger, airier reading rhythm.
  default: 'prose lg:prose-lg xl:prose-xl',
  // Long-form body copy (e.g. treatment detail): smaller type, tighter paragraphs.
  compact: 'prose lg:prose-lg [&_p]:my-3 [&_p]:leading-relaxed',
  // Constrained surfaces (e.g. review cards): base type, tight paragraphs.
  card: 'prose [&_p]:my-2 [&_p]:leading-relaxed',
}

type RichTextContentProps = React.ComponentProps<typeof RichText> & {
  proseSize?: ProseSize
}

const RichTextContent: FC<RichTextContentProps> = ({
  className,
  proseSize = 'default',
  ...props
}) => {
  return (
    <RichText
      className={cn(proseSizeClasses[proseSize], 'prose-img:m-0', className)}
      {...props}
    />
  )
}

export default RichTextContent
