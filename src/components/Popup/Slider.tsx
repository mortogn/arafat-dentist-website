import React, { FC, useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel'
import { Popup } from '@/payload-types'
import Media from '../Media'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { MoveLeftIcon, MoveRightIcon, XCircleIcon } from 'lucide-react'
import { isValidUrl } from '@/utilities/validateURL'

type Props = {
  popups: Popup[]
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  onHidePopup: (popupId: string) => void
}

const Slider: FC<Props> = ({ popups, setDialogOpen, onHidePopup }) => {
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

  const handleHidePopup = () => {
    const currentPopup = popups[currentIndex]
    if (currentPopup) {
      onHidePopup(currentPopup.id)
    }
    setDialogOpen(false)
  }

  const handleLinkClick = () => {
    setDialogOpen(false)
  }

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {popups.map((popup) => {
          const hasValidUrl = popup.url && isValidUrl(popup.url)

          const imageElement = <Media resource={popup.image} height={650} width={650} />

          return (
            <CarouselItem key={popup.id}>
              {hasValidUrl ? (
                <Link href={popup.url} onClick={handleLinkClick}>
                  {imageElement}
                </Link>
              ) : (
                <div className="cursor-default">{imageElement}</div>
              )}
            </CarouselItem>
          )
        })}
      </CarouselContent>

      <div className="justify-center flex items-center gap-2 mb-2">
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

      <div className="flex justify-center mt-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs flex items-center gap-1"
          onClick={handleHidePopup}
        >
          <XCircleIcon className="size-4" />
          Don&apos;t show this again
        </Button>
      </div>
    </Carousel>
  )
}

export default Slider
