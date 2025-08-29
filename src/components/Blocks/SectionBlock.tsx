import { SectionBlock } from '@/payload-types'
import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import SectionTitle from '../SectionTitle'
import RichTextContent from '../RichTextContent'
import Media from '../Media'

type Props = {
  data: SectionBlock
}

const SectionBlockComponent: React.FC<Props> = ({ data }) => {
  const [height, width] =
    typeof data.image !== 'string' ? [data.image.height, data.image.width] : [0, 0]

  return (
    <MaxWidthWrapper element="section" className="flex flex-col items-center my-10 md:my-20">
      <SectionTitle title={data.title} description={data.description} />

      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mt-6 lg:mt-10 lg:gap-10 w-full">
        <div className="lg:w-1/2">
          <RichTextContent className="mt-2 lg:mt-8" data={data.content} />
        </div>

        <div
          style={{
            aspectRatio: `${width} / ${height}`,
          }}
          className="lg:w-1/2 w-full lg:max-w-[50%] rounded-md overflow-hidden relative"
        >
          <Media
            resource={data.image}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="h-full w-full"
            quality={65}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default SectionBlockComponent
