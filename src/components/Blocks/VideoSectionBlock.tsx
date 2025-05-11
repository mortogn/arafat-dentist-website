import { VideoSectionBlock } from '@/payload-types'
import React, { FC } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import SectionTitle from '../SectionTitle'
import YoutubeEmbed from '../YoutubeEmbed'

type Props = {
  data: VideoSectionBlock
}

const VideoSectionBlockComponent: FC<Props> = ({ data }) => {
  return (
    <MaxWidthWrapper element="section">
      <SectionTitle title={data.title} description={data.description} />
      <div>
        <YoutubeEmbed videoId={data.videoId} isActive image={data.thumbnail} />
      </div>
    </MaxWidthWrapper>
  )
}

export default VideoSectionBlockComponent
