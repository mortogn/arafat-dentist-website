import { Block } from 'payload'
import { BookingFormBlock } from './BookingFormBlock'
import { ImageBlock } from './ImageBlock'

export const ColumnBlock: Block = {
  slug: 'column',
  labels: {
    singular: 'Column',
    plural: 'Columns',
  },
  interfaceName: 'ColumnBlock',
  fields: [
    {
      name: 'width',
      label: 'Item width',
      admin: {
        description: 'The width of the column',
      },
      type: 'radio',
      options: ['1/2', '1/3', '2/1', '3/1'],
    },
    {
      type: 'blocks',
      name: 'items',
      blocks: [BookingFormBlock, ImageBlock],
      maxRows: 2,
      required: true,
      minRows: 2,
    },
  ],
}
