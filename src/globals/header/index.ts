import { buttonsField } from '@/fields/buttons'
import { validateURL } from '@/utilities/validateURL'
import type { GlobalConfig } from 'payload'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  typescript: {
    interface: 'Header',
  },
  admin: {
    description: 'The header of the site',
  },
  hooks: {
    afterChange: [revalidateHeader],
  },
  fields: [
    {
      type: 'upload',
      name: 'logo',
      relationTo: 'media',
      admin: {
        description: 'The logo of the site',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      required: true,
    },
    {
      type: 'array',
      name: 'links',
      label: 'Links',
      required: true,
      localized: true,
      fields: [
        {
          type: 'text',
          name: 'label',
          label: 'Label',
          admin: {
            description: 'The text to display for the link',
          },
          required: true,
        },
        {
          type: 'text',
          name: 'href',
          label: 'URL',
          admin: {
            description: 'The URL to link to',
          },
          required: true,
          validate: validateURL,
        },
        {
          type: 'checkbox',
          name: 'hasChildren',
          label: 'Has Children',
          defaultValue: false,
        },

        {
          type: 'array',
          name: 'children',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.hasChildren),
          },
          fields: [
            {
              type: 'text',
              name: 'label',
              label: 'Label',
              required: true,
            },
            {
              type: 'text',
              name: 'href',
              label: 'URL',
              required: true,
              validate: validateURL,
            },
            {
              type: 'textarea',
              name: 'description',
              label: 'Description',
              admin: {
                description: 'A description of the link',
              },
              maxLength: 200,
            },
          ],
        },
      ],
    },
    buttonsField({}),
  ],
  versions: {
    drafts: true,
  },
}
