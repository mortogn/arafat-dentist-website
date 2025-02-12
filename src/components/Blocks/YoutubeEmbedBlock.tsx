import { type YoutubeEmbedBlock } from '@/payload-types'
import React, { FC } from 'react'
import YoutubeEmbed from '../YoutubeEmbed'

type Props = {
  data: YoutubeEmbedBlock
}

const YoutubeEmbedBlockComponent: FC<Props> = ({ data }) => {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <YoutubeEmbed videoId={data.videoId} isActive={true} image={data.thumbnail} />
    </div>
  )
}

export default YoutubeEmbedBlockComponent
