import CallToAction from '@/components/Blocks/CallToAction'
import HeroSection from '@/components/Blocks/Hero'
import LocationBlockComponent from '@/components/Blocks/LocationBlock'
import SectionBlockComponent from '@/components/Blocks/SectionBlock'
import StatsSection from '@/components/Blocks/Stats'
import TreatmentsSection from '@/components/Blocks/Treatments'
import VideoReviewSection from '@/components/Blocks/VideoReview'
import {
  HeroBlock,
  BookingFormBlock,
  TreatmentsBlock,
  VideoReviewBlock,
  StatsBlock,
  CallToActionBlock,
  SectionBlock,
  LocationBlock,
} from '@/payload-types'
import { Locale } from '@/types'

type Blocks =
  | HeroBlock
  | BookingFormBlock
  | TreatmentsBlock
  | VideoReviewBlock
  | StatsBlock
  | CallToActionBlock
  | SectionBlock
  | LocationBlock

export function renderer(block: Blocks, locale: Locale) {
  switch (block.blockType) {
    case 'hero':
      return <HeroSection key={block.id} data={block} />

    case 'treatments':
      return <TreatmentsSection key={block.id} data={block} locale={locale} />

    case 'video-review':
      return <VideoReviewSection data={block} key={block.id} />

    case 'stats':
      return <StatsSection data={block} key={block.id} />

    case 'call-to-action':
      return <CallToAction key={block.id} data={block} />

    case 'location-block':
      return <LocationBlockComponent key={block.id} data={block} locale={locale} />

    case 'section':
      return <SectionBlockComponent key={block.id} data={block} />
    default:
      return null
  }
}
