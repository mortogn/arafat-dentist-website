import { GalleryBlock } from '@/payload-types'
import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import SectionTitle from '../SectionTitle'
import Media from '../Media'

type Props = {
  data: GalleryBlock
}

const GalleryBlockComponent: React.FC<Props> = ({ data }) => {
  return (
    <MaxWidthWrapper element="section" className="my-10">
      <SectionTitle title={data.title} description={data.description} />

      <div className="columns-4 gap-2 space-y-2 mt-8">
        {data.images.map((image) => (
          <Media resource={image.image} key={image.id} height={600} width={700} />
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

export default GalleryBlockComponent
