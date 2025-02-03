import React, { FC } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'

const RichTextContent: FC<React.ComponentProps<typeof RichText>> = ({ className, ...props }) => {
  return <RichText className={cn(['prose'], className)} {...props} />
}

export default RichTextContent
