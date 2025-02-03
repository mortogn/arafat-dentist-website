import React, { FC } from 'react'
import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import Buttons from '@/components/Buttons'
import { cn } from '@/lib/utils'

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => {
  return {
    ...defaultConverters,
    blocks: {
      //@ts-expect-error - This is a custom block. Check more about this inside /src/blocks/richText/ButtonsBlock.ts
      buttons: ({ node }) => <Buttons className={() => 'text-sm'} data={node.fields.buttons} />,
    },
  }
}

const RichTextContent: FC<React.ComponentPropsWithRef<typeof RichText>> = ({
  data,
  className,
  ...props
}) => {
  return (
    <RichText
      converters={jsxConverters}
      data={data}
      {...props}
      className={cn(
        'md:[&_h1]:text-5xl [&_h1]:text-3xl [&_h1]:font-extrabold [&_p]:my-4 [&_p]:leading-loose [&_p]:text-sm md:[&_p]:text-base [&_p]:text-muted-foreground [&_p]:tracking-wide',
        className,
      )}
    />
  )
}

export default RichTextContent
