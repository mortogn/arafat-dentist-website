import { GlobalConfig } from 'payload'
import { revalidateContacts } from './hooks/revalidateContacts'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  typescript: {
    interface: 'Contacts',
  },
  hooks: {
    afterChange: [revalidateContacts],
  },
  fields: [
    {
      name: 'contacts',
      type: 'array',
      label: 'Contacts',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          admin: {
            description: 'The name of the contact',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              label: 'Label',
              required: true,
              type: 'text',
              admin: {
                description: 'The text to display for the link',
              },
              localized: true,
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
              admin: {
                description: 'The URL to link to',
              },
            },
          ],
        },
        {
          name: 'icon',
          type: 'radio',
          options: ['none', 'phone', 'email', 'map', 'whatsapp'],
          admin: {
            description: 'The icon to display next to the contact',
          },
          required: true,
        },
      ],
    },
  ],

  versions: {
    drafts: true,
    max: 50,
  },
}
