import { GridPriceListBlock } from '@/payload-types'
import React from 'react'
import Media from '../Media'

type Props = {
  data: GridPriceListBlock
}

const GridPriceListBlockComponent: React.FC<Props> = ({ data }) => {
  return (
    <div className="container mx-auto px-4 not-prose">
      <div className="grid grid-cols-2 gap-2 justify-center">
        {data.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center flex-col rounded-md p-3 lg:p-6 border border-border shadow-sm hover:shadow-md space-y-2"
          >
            {item.image && <Media resource={item.image} height={80} width={300} />}
            <h4 className="text-lg lg:text-xl font-bold">{item.price}</h4>
            {item.description && (
              <p className="text-base lg:text-lg text-gray-600 text-center">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GridPriceListBlockComponent
