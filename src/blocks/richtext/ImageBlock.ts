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
      label: 'Image',
      required: true,
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          type: 'number',
          name: 'width',
          label: 'Width',
          required: true,
        },
        {
          type: 'number',
          name: 'height',
          label: 'Height',
          required: true,
        },
      ],
    },
    {
      type: 'select',
      name: 'alignment',
      label: 'Image Alignment',
      required: false,
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      type: 'text',
      name: 'caption',
      label: 'Image Caption',
      required: false,
      admin: {
        description: 'Optional caption for the image.',
      },
    },
    {
      type: 'text',
      name: 'altText',
      label: 'Alt Text',
      required: false,
      admin: {
        description: 'Alternative text for the image, improving accessibility.',
      },
    },
  ],
}
