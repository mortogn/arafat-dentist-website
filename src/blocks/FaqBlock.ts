import { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  interfaceName: 'FaqBlock',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      localized: true,
      admin: {
        description: 'The title of this FAQ section',
      },
    },
    {
      type: 'richText',
      name: 'description',
      label: 'Description',
      required: false,
      localized: true,

      admin: {
        description: 'The description of this FAQ section',
      },
    },
    {
      type: 'array',
      name: 'faq',
      label: 'FAQs',
      fields: [
        {
          type: 'text',
          name: 'question',
          label: 'Question',
          required: true,
          localized: true,
          admin: {
            description: 'The question of this FAQ',
          },
        },
        {
          type: 'richText',
          name: 'answer',
          label: 'Answer',
          required: true,
          localized: true,
          admin: {
            description: 'The answer of this FAQ',
          },
        },
      ],
    },
  ],
}
