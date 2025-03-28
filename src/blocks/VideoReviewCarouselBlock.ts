import { Block } from 'payload'

export const VideoReviewCarouselBlock: Block = {
  slug: 'video-review-carousel',
  interfaceName: 'VideoReviewCarouselBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'The title of the section',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'The description of the section',
      },
    },
    {
      type: 'relationship',
      name: 'videoReviews',
      relationTo: 'reviews',
      hasMany: true,
      admin: {
        isSortable: true,
      },
      filterOptions: {
        type: {
          equals: 'Video',
        },
      },
    },
  ],
}
