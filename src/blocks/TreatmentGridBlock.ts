import { Block } from 'payload'

export const TreatmentGridBlock: Block = {
  slug: 'treatment-grid',
  interfaceName: 'TreatmentGridBlock',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      admin: {
        description: 'The title of the grid',
      },
      localized: true,
    },
    {
      type: 'richText',
      name: 'description',
      label: 'Description',
      admin: {
        description: 'The description of the grid',
      },
      localized: true,
    },
    {
      type: 'relationship',
      name: 'treatments',
      relationTo: 'treatments',
      hasMany: true,
      admin: {
        isSortable: true,
      },
    },
    {
      type: 'checkbox',
      name: 'showMoreButton',
      label: 'Show More Button',
      admin: {
        description: "If checked, a 'Show More' button will be displayed at the bottom of the grid",
      },
    },
  ],
}
