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
    <MaxWidthWrapper element="section">
      <SectionTitle title={data.title} description={data.description} />

      <div>
        {data.images.map((image) => (
          <Media resource={image.image} key={image.id} height={600} width={700} />
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

export default GalleryBlockComponent
