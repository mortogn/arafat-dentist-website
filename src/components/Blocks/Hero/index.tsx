import { HeroBlock } from '@/payload-types'
import React, { FC } from 'react'
import RichTextContent from './RichTextContent'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Media from '@/components/Media'

type Props = {
  data: HeroBlock
}

const HeroSection: FC<Props> = ({ data }) => {
  return (
    <MaxWidthWrapper
      element="section"
      className="flex flex-col lg:flex-row items-center justify-between gap-10"
    >
      <div className="lg:w-1/2">
        <RichTextContent
          data={data.text}
          className="flex lg:block en:prose-headings:text-4xl lg:en:prose-headings:text-6xl text-center lg:text-start items-center justify-center flex-col"
        />
      </div>

      <div className="lg:w-1/2 w-full aspect-[4/5] max-h-[650px] rounded-md overflow-hidden relative">
        <Media
          resource={data.image}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="h-full w-full"
          quality={65}
        />
      </div>
    </MaxWidthWrapper>
  )
}

export default HeroSection
