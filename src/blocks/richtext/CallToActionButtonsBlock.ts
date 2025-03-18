import { colorField } from '@/fields/color'
import { validateURL } from '@/utilities/validateURL'
import { Block } from 'payload'

export const CallToActionButtonsBlock: Block = {
  slug: 'call-to-action-buttons',
  labels: {
    singular: 'Call to Action Buttons',
    plural: 'Call to Action Buttons',
  },
  interfaceName: 'CallToActionButtonsBlock',
  fields: [
    {
      type: 'array',
      name: 'buttons',
      label: 'Buttons',
      minRows: 1,
      fields: [
        {
          type: 'upload',
          name: 'icon',
          label: 'Icon',
          relationTo: 'media',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          type: 'text',
          name: 'label',
          label: 'Label',
          required: true,
        },
        {
          type: 'text',
          name: 'url',
          label: 'URL',
          required: true,
          validate: validateURL,
        },
        {
          type: 'group',
          name: 'color',
          label: 'Color',
          fields: [
            colorField({ override: { label: 'Background Color', name: 'bgColor' } }),
            colorField({ override: { label: 'Text Color', name: 'textColor' } }),
          ],
        },
      ],
    },
  ],
}
