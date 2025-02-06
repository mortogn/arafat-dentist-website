import { GroupField } from 'payload'

export const VideoReviewField: GroupField = {
  type: 'group',
  name: 'video',
  label: 'Video Review',
  admin: {
    condition: (_, siblingData) => siblingData.type === 'Video',
    description: 'Information about the video review',
  },
  fields: [
    {
      type: 'upload',
      name: 'thumbnail',
      label: 'Thumbnail',
      relationTo: 'media',
      admin: {
        description: 'The thumbnail image for the video review',
      },
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
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
}
