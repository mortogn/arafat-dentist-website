import React, { FC, useEffect, useState } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Popup } from '@/payload-types'
import Media from '../Media'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react'

type Props = {
  popups: Popup[]
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Slider: FC<Props> = ({ popups, setDialogOpen }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Update canScrollPrev and canScrollNext
  useEffect(() => {
    if (!api) return

    const onScroll = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap())
    }

    api.on('scroll', onScroll)
    api.on('select', onSelect)

    // Initialize
    onScroll()
    onSelect()

    return () => {
      api.off('scroll', onScroll)
      api.off('select', onSelect)
    }
  }, [api])

  const handleNext = () => {
    api?.scrollNext()
  }

  const handlePrev = () => {
    api?.scrollPrev()
  }

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {popups.map((popup) => (
          <CarouselItem key={popup.id}>
            <Link href={popup.url} onClick={() => setDialogOpen(false)}>
              <Media resource={popup.image} height={650} width={650} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="justify-center flex items-center gap-2">
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
          {currentIndex + 1} / {popups.length}
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

      {/* These can be removed if you want to rely only on the custom controls above */}
      <CarouselPrevious className="hidden" />
      <CarouselNext className="hidden" />
    </Carousel>
  )
}

export default Slider
