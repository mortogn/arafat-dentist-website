import { Block } from 'payload'

export const TextReviewCarouselBlock: Block = {
  slug: 'text-review-carousel',
  interfaceName: 'TextReviewCarouselBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'The title of the section',
      },
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'The description of the section',
      },
      localized: true,
    },
    {
      type: 'relationship',
      name: 'textReviews',
      relationTo: 'reviews',
      hasMany: true,
      admin: {
        isSortable: true,
      },
      filterOptions: {
        type: {
          equals: 'Text',
        },
      },
    },
  ],
}
