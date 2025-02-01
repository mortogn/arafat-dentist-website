import { Block } from 'payload'

export const TreatmentsBlock: Block = {
  slug: 'treatments',
  interfaceName: 'TreatmentsBlock',
  labels: {
    singular: 'Treatments section',
    plural: 'Treatments section',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      admin: {
        description: 'The title of the section',
      },
      required: true,
      localized: true,
    },
    {
      name: 'description',
      label: 'Section Description',
      type: 'richText',
      admin: {
        description: 'The description of the section',
      },
      localized: true,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'showAllTreatments',
      label: 'Show All Treatments',
      admin: {
        description: 'Check this box to show all treatments',
      },
      defaultValue: false,
    },
    {
      type: 'relationship',
      name: 'treatments',
      label: 'Treatments',
      relationTo: 'treatments',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => !Boolean(siblingData.showAllTreatments),
        description: 'Select the treatments to display',
      },
    },
  ],
}
