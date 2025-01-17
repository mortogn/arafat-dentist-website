import { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'image',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  interfaceName: 'ImageBlock',
  fields: [
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      type: 'text',
      name: 'caption',
      label: 'Caption',
      admin: {
        description: 'The caption of the image',
      },
    },
  ],
}
