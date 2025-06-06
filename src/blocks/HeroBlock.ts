import {
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
  StrikethroughFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { ButtonBlocks } from './richtext/ButtonsBlock'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      type: 'richText',
      name: 'text',
      localized: true,
      editor: lexicalEditor({
        features: () => {
          return [
            FixedToolbarFeature(),
            HeadingFeature({
              enabledHeadingSizes: ['h1', 'h2', 'h3'],
            }),
            ParagraphFeature(),
            BoldFeature(),
            ItalicFeature(),
            StrikethroughFeature(),
            BlocksFeature({
              blocks: [ButtonBlocks],
            }),
          ]
        },
      }),
      required: true,
    },
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'The hero image. Recommended aspect ratio is 4:5. Example: 1200x1500px.',
        condition: (_, siblingData) => {
          return siblingData?.text?.length > 0
        },
      },
      required: true,
    },
  ],
}
