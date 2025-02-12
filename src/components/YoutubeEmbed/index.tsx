'use client'

import { useEffect, useState } from 'react'
import Media from '@/components/Media'
import { Media as MediaType } from '@/payload-types'

interface YoutubeEmbedProps {
  image?: MediaType | undefined | string | null
  videoId: string
  isPlaying?: boolean
  isActive?: boolean
}

const YoutubeEmbed = ({
  image,
  videoId,
  isPlaying: isPlayingFromProps,
  isActive,
}: YoutubeEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(isPlayingFromProps || false)

  useEffect(() => {
    if (!isActive && isPlaying) {
      setIsPlaying(false)
    }
  }, [isActive, isPlaying])

  const handleClick = () => {
    setIsPlaying(true)
  }

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 aspect-video">
      {!isPlaying ? (
        <button
          onClick={handleClick}
          className="block w-full h-full transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:opacity-90"
          aria-label="Play video"
        >
          <div className="relative w-full h-full">
            <Media
              resource={image}
              fill
              className="object-cover h-full w-full aspect-video"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
            <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/30">
              <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <div className="relative w-full h-full aspect-video">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            aria-label="YouTube video player"
          />
        </div>
      )}
    </div>
  )
}
export default YoutubeEmbed
