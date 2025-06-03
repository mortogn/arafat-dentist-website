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
  return (
    <MaxWidthWrapper element="section" className="flex flex-col items-center my-10 md:my-20">
      <SectionTitle title={data.title} description={data.description} />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mt-4 lg:mt-8 w-full">
        <div className="lg:w-1/2">
          <RichTextContent className="mt-8" data={data.content} />
        </div>

        <div className="lg:w-1/2 w-full aspect-[2/1] max-h-[650px] rounded-md overflow-hidden relative">
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
