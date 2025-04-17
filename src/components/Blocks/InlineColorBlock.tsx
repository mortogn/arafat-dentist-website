import { InlineColorTextBlock } from '@/payload-types'
import React, { FC } from 'react'

type Props = {
  data: InlineColorTextBlock
}

const InlineColorBlockComponent: FC<Props> = ({ data }) => {
  return (
    <span style={{ color: data.color }} className="ml-2">
      {data.text}
    </span>
  )
}

export default InlineColorBlockComponent
