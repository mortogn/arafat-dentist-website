import { Block } from 'payload'

export const VideoReviewBlock: Block = {
  slug: 'video-review',
  interfaceName: 'VideoReviewBlock',
  fields: [
    {
      name: 'reviews',
      type: 'array',
      label: 'Reviews',
      fields: [
        {
          type: 'upload',
          name: 'thumbnail',
          relationTo: 'media',
          label: 'Video Thumbnail',
          admin: {
            description: 'The thumbnail image for the video',
          },
        },
        {
          type: 'text',
          name: 'videoId',
          label: 'Youtube Video ID',
          admin: {
            description:
              'The ID of the Youtube video. For example, if the video URL is https://www.youtube.com/watch?v=abc123, the ID is abc123.',
          },
          required: true,
        },
        {
          type: 'text',
          name: 'title',
          label: 'Title',
          required: true,
          localized: true,
          admin: {
            description: 'The title of the review',
          },
        },
        {
          type: 'richText',
          name: 'description',
          label: 'Description',
          localized: true,
          required: true,
          admin: {
            description: 'The short description of the review',
          },
        },
      ],
    },
  ],
}
