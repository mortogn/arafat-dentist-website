import { Block } from 'payload'

export const CheckListBlock: Block = {
  slug: 'checklist',
  interfaceName: 'CheckListBlock',
  fields: [
    {
      type: 'array',
      name: 'checklist',
      label: 'Checklist',
      fields: [
        {
          type: 'text',
          name: 'label',
          label: 'Checklist Item',
          required: true,
          localized: true,
        },
      ],
      minRows: 1,
    },
  ],
}
