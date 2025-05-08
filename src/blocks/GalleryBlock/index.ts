import {
  lexicalEditor,
  BoldFeature,
  UnderlineFeature,
  StrikethroughFeature,
  ItalicFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      admin: {
        description: 'The title of the gallery.',
      },
    },
    {
      type: 'richText',
      name: 'description',
      label: 'Description',
      required: true,
      admin: {
        description: 'A brief description of the gallery.',
      },
      editor: lexicalEditor({
        features: [BoldFeature(), UnderlineFeature(), StrikethroughFeature(), ItalicFeature()],
      }),
    },
    {
      type: 'array',
      name: 'images',
      label: 'Images',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Image',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image/' },
          },
        },
      ],
    },
  ],
}
