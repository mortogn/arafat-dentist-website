import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SectionTitle from '@/components/SectionTitle'
import { Review, TextReviewCarouselBlock } from '@/payload-types'
import React, { FC } from 'react'
import ReviewCarousel from './ReviewCarousel'
import { CarouselItem } from '@/components/ui/carousel'
import TextReviewCard from '@/components/Review/TextReviewCard'

type Props = {
  data: TextReviewCarouselBlock
}

const TextReviewCarousel: FC<Props> = ({ data }) => {
  const filteredReviews = data.textReviews?.filter(
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
            <TextReviewCard data={review.text!} className="h-full" />
          </CarouselItem>
        ))}
      </ReviewCarousel>
    </MaxWidthWrapper>
  )
}

export default TextReviewCarousel
