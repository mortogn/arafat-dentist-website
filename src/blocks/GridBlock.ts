import { Block } from 'payload'

export const GridBlock: Block = {
  slug: 'grid',
  interfaceName: 'GridBlock',
  fields: [
    {
      type: 'number',
      name: 'columns',
      label: 'Columns',
      admin: {
        description: 'Number of columns to display',
      },
    },
  ],
}
