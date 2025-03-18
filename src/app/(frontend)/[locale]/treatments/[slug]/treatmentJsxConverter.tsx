import CallToActionButtonsBlockComponent from '@/components/Blocks/CallToActionButtonsBlock'
import CheckListBlockComponent from '@/components/Blocks/CheckListBlock'
import ColorTextInlineBlockComponent from '@/components/Blocks/ColorTextBlock'
import FAQSection from '@/components/Blocks/FAQBlock'
import GridPriceListBlockComponent from '@/components/Blocks/GridPriceListBlock'
import ImageBlockComponent from '@/components/Blocks/ImageBlock'
import TreatmentsRelationBlockComponent from '@/components/Blocks/TreatmentsRelation'
import YoutubeEmbedBlockComponent from '@/components/Blocks/YoutubeEmbedBlock'
import {
  CallToActionButtonsBlock,
  CheckListBlock,
  ColorTextBlock,
  FaqBlock,
  GridPriceListBlock,
  ImageBlock,
  TreatmentsRelationBlock,
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
    },
  }
}
