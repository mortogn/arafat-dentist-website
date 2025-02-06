import { Block } from 'payload'

export const VideoReviewBlock: Block = {
  slug: 'video-review',
  interfaceName: 'VideoReviewBlock',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Section Title',
      required: true,
      localized: true,
    },
    {
      type: 'richText',
      name: 'description',
      label: 'Section Description',
      required: false,
      localized: true,
    },
    {
      type: 'relationship',
      name: 'reviews',
      relationTo: 'reviews',
      filterOptions: {
        type: {
          equals: 'Video',
        },
      },
      label: 'Video Reviews',
      required: true,
      hasMany: true,
      admin: {
        isSortable: true,
      },
    },
  ],
}
