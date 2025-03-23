import { Block } from 'payload'

export const TreatmentInfoViewBlock: Block = {
  slug: 'treatment-info-view-block',
  labels: {
    singular: 'Treatment Info View Block',
    plural: 'Treatment Info View Blocks',
  },
  interfaceName: 'TreatmentInfoViewBlock',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      localized: true,
    },
    {
      type: 'upload',
      name: 'bgImage',
      label: 'Background Image',
      required: true,
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
  ],
}
