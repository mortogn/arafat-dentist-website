import CheckListBlockComponent from '@/components/Blocks/CheckListBlock'
import FAQSection from '@/components/Blocks/FAQBlock'
import ImageBlockComponent from '@/components/Blocks/ImageBlock'
import YoutubeEmbedBlockComponent from '@/components/Blocks/YoutubeEmbedBlock'
import { CheckListBlock, FaqBlock, ImageBlock, YoutubeEmbedBlock } from '@/payload-types'
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
    },
  }
}
