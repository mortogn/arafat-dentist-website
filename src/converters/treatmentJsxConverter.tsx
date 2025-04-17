import CallToActionButtonsBlockComponent from '@/components/Blocks/CallToActionButtonsBlock'
import ImageReviewCarousel from '@/components/Blocks/CarouselReview/ImageReviewCarousel'
import TextReviewCarousel from '@/components/Blocks/CarouselReview/TextReviewCarousel'
import VideoReviewCarousel from '@/components/Blocks/CarouselReview/VideoReviewCarousel'
import CheckListBlockComponent from '@/components/Blocks/CheckListBlock'
import ColorTextInlineBlockComponent from '@/components/Blocks/ColorTextBlock'
import FAQSection from '@/components/Blocks/FAQBlock'
import GridPriceListBlockComponent from '@/components/Blocks/GridPriceListBlock'
import ImageBlockComponent from '@/components/Blocks/ImageBlock'
import InlineColorBlockComponent from '@/components/Blocks/InlineColorBlock'
import TreatmentsRelationBlockComponent from '@/components/Blocks/TreatmentsRelation'
import YoutubeEmbedBlockComponent from '@/components/Blocks/YoutubeEmbedBlock'
import {
  CallToActionButtonsBlock,
  CheckListBlock,
  ColorTextBlock,
  FaqBlock,
  GridPriceListBlock,
  ImageBlock,
  ImageReviewCarouselBlock,
  InlineColorTextBlock,
  TextReviewCarouselBlock,
  TreatmentsRelationBlock,
  VideoReviewCarouselBlock,
  YoutubeEmbedBlock,
} from '@/payload-types'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

export const treatmentJsxConverter: JSXConvertersFunction = ({ defaultConverters }) => {
  return {
    ...defaultConverters,
    blocks: {
      image: ({ node }: { node: { fields: ImageBlock } }) => (
        <ImageBlockComponent data={node.fields} />
      ),
      checklist: ({ node }: { node: { fields: CheckListBlock } }) => (
        <CheckListBlockComponent data={node.fields} />
      ),
      'youtube-embed': ({ node }: { node: { fields: YoutubeEmbedBlock } }) => (
        <YoutubeEmbedBlockComponent data={node.fields} />
      ),
      faq: ({ node }: { node: { fields: FaqBlock } }) => <FAQSection data={node.fields} />,

      'grid-price-list': ({ node }: { node: { fields: GridPriceListBlock } }) => (
        <GridPriceListBlockComponent data={node.fields} />
      ),
      'color-text': ({ node }: { node: { fields: ColorTextBlock } }) => (
        <ColorTextInlineBlockComponent data={node.fields} />
      ),
      'treatments-relation': ({ node }: { node: { fields: TreatmentsRelationBlock } }) => (
        <TreatmentsRelationBlockComponent data={node.fields} />
      ),
      'call-to-action-buttons': ({ node }: { node: { fields: CallToActionButtonsBlock } }) => (
        <CallToActionButtonsBlockComponent data={node.fields} />
      ),
      'video-review-carousel': ({ node }: { node: { fields: VideoReviewCarouselBlock } }) => (
        <VideoReviewCarousel data={node.fields} />
      ),
      'text-review-carousel': ({ node }: { node: { fields: TextReviewCarouselBlock } }) => (
        <TextReviewCarousel data={node.fields} />
      ),
      'image-review-carousel': ({ node }: { node: { fields: ImageReviewCarouselBlock } }) => (
        <ImageReviewCarousel data={node.fields} />
      ),
    },
    inlineBlocks: {
      'inline-color-text': ({ node }: { node: { fields: InlineColorTextBlock } }) => (
        <InlineColorBlockComponent data={node.fields} />
      ),
    },
  }
}
