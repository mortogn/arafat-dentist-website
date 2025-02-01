import { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    {
      type: 'array',
      name: 'stats',
      label: 'Stats',
      fields: [
        {
          type: 'text',
          name: 'label',
          label: 'Stat Label',
          required: true,
        },
        {
          type: 'upload',
          name: 'icon',
          label: 'Icon',
          required: true,
          relationTo: 'media',
        },
      ],
      minRows: 3,
    },
  ],
}
