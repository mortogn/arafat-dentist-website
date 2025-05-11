'use client'

import React, { FC, ReactNode, useState, useEffect } from 'react'
import { Carousel, CarouselApi, CarouselContent } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'

type Props = React.ComponentProps<'div'> & {
  children: ReactNode
  itemCount?: number // Optional total count for pagination display
  onIndexChange?: (index: number) => void // Optional callback for index changes
  hasVideos?: boolean // Flag to indicate if carousel contains videos
  onIsPlayingChange?: (isPlaying: boolean) => void // Callback for video play state
}

const ReviewCarousel: FC<Props> = ({
  children,
  onIndexChange,
  className,
  hasVideos = false,
  ...props
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Interface for Autoplay plugin
  interface AutoplayPlugin {
    play: () => void
    stop: () => void
  }

  // Only initialize autoplay plugin state if we have videos
  const [autoplayPlugin, setAutoplayPlugin] = useState<AutoplayPlugin | null>(null)
  // Handle video playing state changes from children - will be passed to video components in parent

  // Update activeIndex
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap()
      // Reset video playing state when slides change
      if (hasVideos) {
        setIsPlaying(false)
      }
      if (onIndexChange) {
        onIndexChange(currentIndex)
      }
    }

    api.on('select', onSelect)
    onSelect()
    return () => {
      api.off('select', onSelect)
    }
  }, [api, onIndexChange, hasVideos])

  // Initialize and store autoplay plugin
  useEffect(() => {
    if (hasVideos && api?.plugins()?.autoplay) {
      const autoplay = api.plugins().autoplay as AutoplayPlugin
      setAutoplayPlugin(autoplay)
    }
  }, [hasVideos, api])

  // Control autoplay based on video playing state
  useEffect(() => {
    if (!hasVideos || !autoplayPlugin) return

    try {
      if (isPlaying) {
        autoplayPlugin.stop()

        // Force autoplay to remain stopped while video is playing
        const interval = setInterval(() => {
          autoplayPlugin.stop()
        }, 500)

        return () => clearInterval(interval)
      } else {
        if (canScrollNext) {
          autoplayPlugin.play()
        }
      }
    } catch (err) {
      console.error('Error controlling autoplay:', err)
    }
  }, [hasVideos, isPlaying, autoplayPlugin, canScrollNext])

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
    <div className={cn('relative', className)} {...props}>
      {' '}
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
            // For video carousels, we want manual control of interaction behavior
            stopOnInteraction: !hasVideos,
            // Don't play if a video is already playing
            playOnInit: hasVideos ? !isPlaying : true,
          }),
        ]}
      >
        <CarouselContent>{children}</CarouselContent>
      </Carousel>
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
    </div>
  )
}

export default ReviewCarousel
