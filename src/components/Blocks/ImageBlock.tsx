import { ImageBlock } from '@/payload-types'
import React from 'react'
import Media from '../Media'
import { cn } from '@/lib/utils'

type Props = {
  data: ImageBlock
}

const ImageBlockComponent = ({ data }: Props) => {
  return (
    <div
      className={cn('flex items-center flex-col', {
        'mx-auto': data.alignment === 'center',
        'float-left': data.alignment === 'left',
        'float-right': data.alignment === 'right',
      })}
    >
      <Media resource={data.image} height={data.height} width={data.width} />
      {data.caption && <p className="text-muted-foreground">{data.caption}</p>}
    </div>
  )
}

export default ImageBlockComponent
