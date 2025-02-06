import { GroupField } from 'payload'

export const TextReviewField: GroupField = {
  type: 'group',
  name: 'text',
  label: 'Text Review',
  admin: {
    condition: (_, siblingData) => siblingData.type === 'Text',
    description: 'Information about the text review',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      admin: {
        description: 'The title of the review',
      },
      required: true,
      localized: true,
    },
    {
      type: 'richText',
      name: 'description',
      label: 'Description',
      admin: {
        description: 'The short description of the review',
      },
      required: true,
      localized: true,
    },
    {
      type: 'group',
      name: 'patient',
      label: 'Patient',
      fields: [
        {
          type: 'upload',
          name: 'image',
          relationTo: 'media',
          label: 'Image',
          admin: {
            description: 'The image of the patient',
          },
        },
        {
          type: 'text',
          name: 'name',
          label: 'Name',
          required: true,
          localized: true,
        },

        {
          type: 'text',
          name: 'location',
          label: 'Location',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
