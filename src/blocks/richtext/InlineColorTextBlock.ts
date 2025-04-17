import { colorField } from '@/fields/color'
import { Block } from 'payload'

export const InlineColorTextBlock: Block = {
  slug: 'inline-color-text',
  labels: {
    singular: 'Inline Color Text',
    plural: 'Inline Color Texts',
  },
  interfaceName: 'InlineColorTextBlock',
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Text',
      required: true,
    },
    colorField({}),
  ],
}
