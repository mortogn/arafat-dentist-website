import { buttonsField } from '@/fields/buttons'
import { Block } from 'payload'

export const ButtonBlocks: Block = {
  slug: 'buttons',
  interfaceName: 'ButtonsBlock',
  fields: [
    buttonsField({
      overrides: {
        localized: true,
      },
    }),
  ],
}
