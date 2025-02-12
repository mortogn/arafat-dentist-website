import { Block } from 'payload'

export const YoutubeEmbedBlock: Block = {
  slug: 'youtube-embed',
  labels: {
    singular: 'Youtube Embed',
    plural: 'Youtube Embeds',
  },
  interfaceName: 'YoutubeEmbedBlock',
  fields: [
    {
      type: 'text',
      name: 'videoId',
      label: 'Youtube Video ID',
      required: true,
      admin: {
        description:
          'The ID of the Youtube video. Example: https://www.youtube.com/watch?v=abc, here abc is the ID',
      },
    },
    {
      type: 'upload',
      name: 'thumbnail',
      label: 'Thumbnail',
      required: false,
      admin: {
        description: 'Upload a thumbnail image for the Youtube video.',
      },
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
  ],
}
