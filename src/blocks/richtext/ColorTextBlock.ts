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
      type: 'select',
      name: 'alignment',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      type: 'richText',
      name: 'text',
      label: 'Text',
      admin: {
        description: 'The text to display',
      },
      editor: lexicalEditor({
        features: [
          BoldFeature(),
          ItalicFeature(),
          HeadingFeature(),
          StrikethroughFeature(),
          FixedToolbarFeature(),
          AlignFeature(),
          ParagraphFeature(),
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
