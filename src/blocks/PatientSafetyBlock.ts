import { Block } from 'payload'

export const PatientSafetyBlock: Block = {
  slug: 'patient-safety',
  interfaceName: 'PatientSafetyBlock',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      admin: {
        description: 'The title of the section',
      },
    },
    {
      type: 'richText',
      name: 'description',
      label: 'Description',
      required: true,
      admin: {
        description: 'The description of the section',
      },
    },
    {
      type: 'group',
      name: 'intro',
      label: 'Intro Image',
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Image',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          admin: {
            description: 'The image that will be displayed on larger screens',
          },
        },
        {
          type: 'upload',
          name: 'mobileImage',
          label: 'Mobile Image',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          admin: {
            description: 'The image that will be displayed on mobile screens',
          },
        },
        {
          type: 'text',
          name: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Description',
          required: true,
          maxLength: 250,
        },
      ],
    },
    {
      type: 'array',
      name: 'points',
      label: 'Points',
      required: true,
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          type: 'upload',
          name: 'image',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          label: 'Image',
          admin: {
            description: 'Image will be rendered with a 6:3 aspect ratio',
          },
        },
        {
          type: 'text',
          name: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Description',
          required: true,
          maxLength: 250,
        },
      ],
    },
  ],
}
