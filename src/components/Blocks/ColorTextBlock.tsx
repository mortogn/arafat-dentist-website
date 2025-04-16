import { ColorTextBlock } from '@/payload-types'
import React from 'react'
import RichTextContent from '../RichTextContent'
import { cn } from '@/lib/utils'

type Props = {
  data: ColorTextBlock
}

const ColorTextBlockComponent: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full">
      {data.content && (
        <div style={{ color: data.color }} className="[&>*]:!text-inherit">
          <RichTextContent
            className={cn(
              'lg:prose-lg xl:prose-xl w-full max-w-screen-lg mx-auto',
              '[&_*]:!text-inherit [&_p]:!text-inherit [&_h1]:!text-inherit [&_h2]:!text-inherit',
              '[&_h3]:!text-inherit [&_h4]:!text-inherit [&_h5]:!text-inherit [&_h6]:!text-inherit',
              '[&_a]:!text-inherit [&_blockquote]:!text-inherit [&_strong]:!text-inherit',
            )}
            data={data.content}
          />
        </div>
      )}
    </div>
  )
}

export default ColorTextBlockComponent
