import CallToAction from '@/components/Blocks/CallToAction'
import GalleryBlockComponent from '@/components/Blocks/GallerySectionBlock'
import HeroSection from '@/components/Blocks/Hero'
import LocationBlockComponent from '@/components/Blocks/LocationBlock'
import PatientSafetyBlockComponent from '@/components/Blocks/PatientSafety'
import SectionBlockComponent from '@/components/Blocks/SectionBlock'
import StatsSection from '@/components/Blocks/Stats'
import TreatmentGridBlockComponent from '@/components/Blocks/TreatmentGridBlock'
import TreatmentInfoViewBlockComponent from '@/components/Blocks/TreatmentInfoViewBlock'
import TreatmentsSection from '@/components/Blocks/Treatments'
import VideoReviewSection from '@/components/Blocks/VideoReview'
import VideoSectionBlockComponent from '@/components/Blocks/VideoSectionBlock'
import {
  HeroBlock,
  BookingFormBlock,
  TreatmentsBlock,
  VideoReviewBlock,
  StatsBlock,
  CallToActionBlock,
  SectionBlock,
  LocationBlock,
  PatientSafetyBlock,
  TreatmentGridBlock,
  TreatmentInfoViewBlock,
  VideoSectionBlock,
  GalleryBlock,
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
  | PatientSafetyBlock
  | TreatmentGridBlock
  | TreatmentInfoViewBlock
  | VideoSectionBlock
  | GalleryBlock

export function renderer(block: Blocks, locale: Locale) {
  if (!block || !block.blockType) {
    return null
  }

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
      return <CallToAction key={block.id} data={block} locale={locale} />

    case 'location-block':
      return <LocationBlockComponent key={block.id} data={block} locale={locale} />

    case 'section':
      return <SectionBlockComponent key={block.id} data={block} />

    case 'patient-safety':
      return <PatientSafetyBlockComponent key={block.id} data={block} />

    case 'treatment-grid':
      return <TreatmentGridBlockComponent key={block.id} data={block} locale={locale} />

    case 'treatment-info-view-block':
      return <TreatmentInfoViewBlockComponent key={block.id} data={block} locale={locale} />

    case 'video-section':
      return <VideoSectionBlockComponent key={block.id} data={block} />

    case 'gallery':
      return <GalleryBlockComponent key={block.id} data={block} />

    default:
      return null
  }
}
