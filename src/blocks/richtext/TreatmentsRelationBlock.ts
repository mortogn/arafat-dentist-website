import { Block } from 'payload'

export const TreatmentsRelationBlock: Block = {
  slug: 'treatments-relation',
  labels: {
    singular: 'Treatments Relation',
    plural: 'Treatments Relations',
  },
  interfaceName: 'TreatmentsRelationBlock',
  fields: [
    {
      type: 'relationship',
      name: 'treatments',
      relationTo: 'treatments',
      hasMany: true,
      admin: {
        isSortable: true,
      },
      minRows: 1,
    },
  ],
}
