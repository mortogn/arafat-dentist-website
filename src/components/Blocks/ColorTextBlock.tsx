import { ColorTextBlock } from '@/payload-types'
import React from 'react'
import RichTextContent from '../RichTextContent'
import { cn } from '@/lib/utils'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  data: ColorTextBlock
}

const ColorTextBlockComponent: React.FC<Props> = ({ data }) => {
  return (
    <div style={{ color: data.color }} className="w-max">
      {data.text && (
        <RichText
          className={cn('w-max flex [&_p]:!text-inherit not-prose', {
            'justify-center text-center': data.alignment === 'center',
            'justify-start text-left': data.alignment === 'left',
            'justify-end text-right': data.alignment === 'right',
          })}
          data={data.text}
        />
      )}
    </div>
  )
}

export default ColorTextBlockComponent
