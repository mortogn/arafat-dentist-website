import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Media from '@/components/Media'
import SectionTitle from '@/components/SectionTitle'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import { ImageReviewCarouselBlock, Review } from '@/payload-types'
import React, { FC } from 'react'
import ReviewCarousel from './ReviewCarousel'

type Props = {
  data: ImageReviewCarouselBlock
}

const ImageReviewCarousel: FC<Props> = ({ data }) => {
  const filteredReviews = data.imageReviews?.filter(
    (review): review is Review => review !== null && typeof review !== 'string',
  )

  if (!filteredReviews?.length) {
    return null
  }

  return (
    <MaxWidthWrapper element="section" className="my-10 not-prose p-0">
      {data.title && <SectionTitle title={data.title} description={data.description} />}

      <ReviewCarousel className="mt-8">
        {filteredReviews?.map((review) => (
          <CarouselItem className="lg:basis-1/3" key={review.id}>
            <div className="p-1">
              <Card className="relative h-full w-full">
                <CardContent className="p-1">
                  <Media
                    resource={review.image?.image}
                    height={400}
                    width={600}
                    className="border rounded-md border-border"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </ReviewCarousel>
    </MaxWidthWrapper>
  )
}

export default ImageReviewCarousel
