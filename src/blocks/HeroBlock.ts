import { buttonsField } from '@/fields/buttons'
import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      type: 'text',
      label: 'Heading',
      name: 'heading',
      required: true,
    },
    {
      type: 'textarea',
      label: 'Subheading',
      name: 'subheading',
      required: true,
    },
    buttonsField({ overrides: { maxRows: 2 } }),
    {
      type: 'text',
      label: 'Under Button Text',
      name: 'underButtonText',
      required: true,
    },
  ],
}
