import { buttonsField } from '@/fields/buttons'
import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  StrikethroughFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const CallToActionBlock: Block = {
  labels: {
    singular: 'Call To Action Section',
    plural: 'Call To Action Sections',
  },
  slug: 'call-to-action',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      type: 'text',
      name: 'title',
      admin: {
        description: 'The title of the Call To Action Section',
      },
      required: true,
    },
    {
      type: 'richText',
      name: 'description',
      admin: {
        description: 'The description of the Call To Action Section',
      },
      editor: lexicalEditor({
        features: [
          FixedToolbarFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          StrikethroughFeature(),
        ],
      }),
      required: true,
    },
    buttonsField({}),
  ],
}
