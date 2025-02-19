import { ArrayField } from 'payload'

type ButtonsFieldParams = {
  overrides?: Partial<ArrayField>
}

export const buttonsField = ({ overrides = {} }: ButtonsFieldParams) => {
  const Buttons: ArrayField = {
    type: 'array',
    name: 'buttons',
    label: 'Buttons',
    interfaceName: 'ButtonsField',
    ...(overrides || {}),
    fields: [
      {
        type: 'text',
        name: 'label',
        label: 'Label',
        required: true,
        admin: {
          description: 'The text to display on the button',
        },
        localized: true,
      },
      {
        type: 'text',
        name: 'href',
        label: 'URL',
        required: true,
        admin: {
          description: 'The URL to link to',
        },
      },
      {
        type: 'radio',
        name: 'variant',
        options: ['default', 'secondary', 'ghost', 'outline'],
        defaultValue: 'default',
        admin: {
          description: 'The variant of the button',
        },
        label: 'Variant',
        required: true,
      },
      {
        type: 'radio',
        name: 'size',
        options: ['default', 'small', 'large'],
        defaultValue: 'default',
        admin: {
          description: 'The size of the button',
        },

        label: 'Size',
        required: true,
      },
      {
        type: 'radio',
        name: 'icon',
        options: ['none', 'phone', 'whatsapp', 'email', 'facebook', 'instagram', 'twitter'],
        label: 'Icon',
        admin: {
          description: 'The icon to display on the button',
        },
      },
      ...(overrides.fields || []),
    ],
  }

  return Buttons
}
