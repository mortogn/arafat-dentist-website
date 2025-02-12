import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  StrikethroughFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const CheckListBlock: Block = {
  slug: 'checklist',
  interfaceName: 'CheckListBlock',
  fields: [
    {
      type: 'select',
      name: 'alignment',
      label: 'Alignment',
      required: false,
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
      ],
      defaultValue: 'center',
    },
    {
      type: 'radio',
      name: 'size',
      options: ['small', 'medium', 'large'],
      defaultValue: 'small',
      label: 'Size',
      admin: {
        description: 'Choose the size of the check icon',
      },
    },
    {
      type: 'array',
      name: 'checklist',
      label: 'Checklist',
      fields: [
        {
          type: 'richText',
          name: 'label',
          label: 'Checklist Item',
          required: true,
          localized: true,
          editor: lexicalEditor({
            features: [
              BoldFeature(),
              ItalicFeature(),
              StrikethroughFeature(),
              FixedToolbarFeature(),
              UnderlineFeature(),
            ],
          }),
          admin: {
            description: 'Provide the details for the checklist item',
          },
        },
      ],
      minRows: 1,
    },
  ],
}
