import { colorField } from '@/fields/color'
import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
  StrikethroughFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ColorTextBlock: Block = {
  slug: 'color-text',
  labels: {
    singular: 'Color Text',
    plural: 'Color Text',
  },
  interfaceName: 'ColorTextBlock',
  fields: [
    {
      type: 'richText',
      name: 'content',
      label: 'Content',
      localized: true,
      editor: lexicalEditor({
        features: [
          AlignFeature(),
          HeadingFeature(),
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          StrikethroughFeature(),
          FixedToolbarFeature(),
        ],
      }),
    },
    colorField({
      override: {
        admin: {
          description: 'Select a color for the text',
        },
      },
    }),
  ],
}
