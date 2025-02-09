import HeroSection from '@/components/Blocks/Hero'
import TreatmentsSection from '@/components/Blocks/Treatments'
import VideoReviewSection from '@/components/Blocks/VideoReview'
import { BookingFormBlock, HeroBlock, TreatmentsBlock, VideoReviewBlock } from '@/payload-types'
import { getPageBySlug } from '@/utilities/getPageBySlug'
import { setRequestLocale } from 'next-intl/server'
import React from 'react'

export default async function Home({ params }: { params: Promise<{ locale: 'en-US' | 'bn-BD' }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  const homePage = await getPageBySlug('home', 2, locale)

  return homePage.layout?.map((block) => renderer(block))
}

type Blocks = HeroBlock | BookingFormBlock | TreatmentsBlock | VideoReviewBlock

function renderer(block: Blocks) {
  switch (block.blockType) {
    case 'hero':
      return <HeroSection key={block.id} data={block} />

    case 'treatments':
      return <TreatmentsSection key={block.id} data={block} />

    case 'video-review':
      return <VideoReviewSection data={block} key={block.id} />
    default:
      return null
  }
}
