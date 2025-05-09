'use client'

import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import YoutubeEmbed from '@/components/YoutubeEmbed'
import { VideoReviewBlock } from '@/payload-types'
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import { useVideoReviewSectionContext } from '.'
import Autoplay from 'embla-carousel-autoplay'

type Props = {
  data: VideoReviewBlock
}

const VideoSlider: FC<Props> = ({ data }) => {
  const [api, setApi] = useState<CarouselApi>()

  const { activeIndex, setActiveIndex } = useVideoReviewSectionContext()

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // Update activeIndex
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    onSelect()
    return () => {
      api.off('select', onSelect)
    }
  }, [api, setActiveIndex])

  // Update canScrollPrev and canScrollNext
  useEffect(() => {
    if (!api) return

    const onScroll = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    api.on('scroll', onScroll)
    onScroll()
    return () => {
      api.off('scroll', onScroll)
    }
  }, [api])

  const handleNext = () => {
    api?.scrollNext()
  }

  const handlePrev = () => {
    api?.scrollPrev()
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnMouseEnter: true,
          stopOnFocusIn: true,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {data.reviews.map(
          (review, index) =>
            review &&
            typeof review !== 'string' &&
            review.video &&
            typeof review.video.thumbnail !== 'string' && (
              <CarouselItem key={review.id}>
                <YoutubeEmbed
                  isActive={activeIndex === index}
                  videoId={review.video?.videoId}
                  image={review?.video.thumbnail}
                />
              </CarouselItem>
            ),
        )}
      </CarouselContent>

      <div className="absolute -bottom-10 -translate-x-1/2 left-1/2 flex items-center gap-2">
        <Button
          size="icon"
          className="[&_svg]:size-6"
          variant="ghost"
          onClick={handlePrev}
          disabled={!canScrollPrev}
        >
          <MoveLeftIcon />
        </Button>
        <div>
          {activeIndex + 1} / {data.reviews.length}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="[&_svg]:size-6"
          onClick={handleNext}
          disabled={!canScrollNext}
        >
          <MoveRightIcon />
        </Button>
      </div>
    </Carousel>
  )
}

export default VideoSlider
