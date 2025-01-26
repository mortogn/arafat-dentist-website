import React, { FC } from 'react'
import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import Buttons from '@/components/Buttons'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => {
  return {
    ...defaultConverters,
    blocks: {
      //@ts-expect-error - This is a custom block. Check more about this inside /src/blocks/richText/ButtonsBlock.ts
      buttons: ({ node }) => <Buttons className={() => 'text-sm'} data={node.fields.buttons} />,
    },
  }
}

type Props = {
  data: SerializedEditorState
}

const RichTextContent: FC<Props> = ({ data }) => {
  return (
    <RichText
      converters={jsxConverters}
      data={data}
      className="[&_h1]:text-5xl [&_h1]:font-extrabold [&_p]:my-4 [&_p]:leading-loose [&_p]:text-base [&_p]:text-muted-foreground [&_p]:tracking-wide"
    />
  )
}

export default RichTextContent
