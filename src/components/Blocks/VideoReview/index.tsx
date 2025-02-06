'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { VideoReviewBlock } from '@/payload-types'
import React, { FC, useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import VideoSlider from './VideoSlider'
import RichTextContent from '@/components/RichTextContent'

type VideoReviewContextValueType = {
  activeIndex: number
  setActiveIndex: (index: number) => void
}

const VideoReviewSectionContext = React.createContext<VideoReviewContextValueType | undefined>(
  undefined,
)

export const useVideoReviewSectionContext = () => {
  const context = React.useContext(VideoReviewSectionContext)
  if (context === undefined) {
    throw new Error('useVideoReviewSectionContext must be used within a VideoReviewSectionContext')
  }
  return context
}

type Props = {
  data: VideoReviewBlock
}

const VideoReviewSection: FC<Props> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <VideoReviewSectionContext value={{ activeIndex, setActiveIndex }}>
      <MaxWidthWrapper element="section" className="my-20 ">
        <SectionTitle title={data.title} description={data.description} />
        <div className="flex items-center flex-col lg:flex-row gap-10 lg:gap-20 mt-10">
          <div className="lg:max-w-[55%] w-full">
            <VideoSlider data={data} />
          </div>
          {data.reviews[activeIndex] &&
            typeof data.reviews[activeIndex] !== 'string' &&
            data.reviews[activeIndex].video && (
              <div key={data.reviews[activeIndex].id} className="space-y-2">
                <h2 className="text-xl lg:text-2xl tracking-tight font-medium lg:text-left text-center">
                  {data.reviews[activeIndex].video.title}
                </h2>
                <RichTextContent
                  data={data.reviews[activeIndex].video.description}
                  className="text-center lg:text-left"
                />
              </div>
            )}
        </div>
      </MaxWidthWrapper>
    </VideoReviewSectionContext>
  )
}

export default VideoReviewSection
