import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SectionTitle from '@/components/SectionTitle'
import { CarouselItem } from '@/components/ui/carousel'
import YoutubeEmbed from '@/components/YoutubeEmbed'
import { Review, VideoReviewCarouselBlock } from '@/payload-types'
import React, { FC } from 'react'
import ReviewCarousel from './ReviewCarousel'

type Props = {
  data: VideoReviewCarouselBlock
}

const VideoReviewCarousel: FC<Props> = ({ data }) => {
  const filteredReviews = data.videoReviews?.filter(
    (review): review is Review =>
      review !== null && typeof review !== 'string' && review.video !== null,
  )

  return (
    <MaxWidthWrapper element="section" className="not-prose my-10 p-0">
      {data.title ? <SectionTitle title={data.title} description={data.description} /> : null}

      <ReviewCarousel className="mt-8">
        {filteredReviews?.map((review) => (
          <CarouselItem className="lg:basis-1/3" key={review.id}>
            <div className="py-1">
              <YoutubeEmbed
                isActive
                videoId={review.video ? review.video.videoId : ''}
                image={review.video?.thumbnail}
              />
            </div>
          </CarouselItem>
        ))}
      </ReviewCarousel>
    </MaxWidthWrapper>
  )
}

export default VideoReviewCarousel
