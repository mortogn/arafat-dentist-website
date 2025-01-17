import { Block } from 'payload'

export const BookingFormBlock: Block = {
  slug: 'booking-form',
  labels: {
    singular: 'Booking Form',
    plural: 'Booking Forms',
  },
  interfaceName: 'BookingFormBlock',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the booking form',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      admin: {
        description: 'The subtitle of the booking form',
      },
      required: true,
    },
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
      name: 'allTreatments',
      type: 'checkbox',
      label: 'Show all treatments',
      admin: {
        description: 'Show all treatments in the booking form',
      },
      defaultValue: true,
    },
    {
      name: 'treatments',
      type: 'relationship',
      label: 'Treatments',
      relationTo: 'treatments',

      hasMany: true,
      admin: {
        condition: (_, siblingData) => !siblingData.allTreatments,
        description: 'Select the treatments to show in the booking form',
      },
    },
  ],
}
