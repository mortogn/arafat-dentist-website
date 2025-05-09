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
}

const ReviewCarousel: FC<Props> = ({ children, onIndexChange, className, ...props }) => {
  const [api, setApi] = useState<CarouselApi>()

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // Update activeIndex
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap()
      if (onIndexChange) {
        onIndexChange(currentIndex)
      }
    }

    api.on('select', onSelect)
    onSelect()
    return () => {
      api.off('select', onSelect)
    }
  }, [api, onIndexChange])

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
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
            stopOnInteraction: false,
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
