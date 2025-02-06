import { GroupField } from 'payload'

export const ImageReviewField: GroupField = {
  type: 'group',
  name: 'image',
  label: 'Image Review',
  admin: {
    condition: (_, siblingData) => siblingData.type === 'Image',
    description: 'Information about the image review',
  },
  fields: [
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
      label: 'Image',
      admin: {
        description: 'The image for the review',
      },
    },
  ],
}
