import { Block } from 'payload'

export const ImageReviewCarouselBlock: Block = {
  slug: 'image-review-carousel',
  interfaceName: 'ImageReviewCarouselBlock',
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
      name: 'imageReviews',
      relationTo: 'reviews',
      hasMany: true,
      admin: {
        isSortable: true,
      },
      filterOptions: {
        type: {
          equals: 'Image',
        },
      },
    },
  ],
}
