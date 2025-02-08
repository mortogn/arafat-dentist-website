import { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',

  hooks: {
    afterChange: [revalidateFooter],
  },

  fields: [
    {
      type: 'upload',
      name: 'logo',
      label: 'Logo',
      required: true,
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      type: 'array',
      name: 'links',
      fields: [
        {
          type: 'text',
          name: 'groupTitle',
          label: 'Group Title',
          localized: true,
          required: true,
          admin: {
            description:
              'The title of the group of links. For example, Quick Link, Useful Links, etc.',
          },
        },
        {
          type: 'array',
          name: 'groupLinks',
          label: 'Group Links',
          required: true,
          fields: [
            {
              type: 'text',
              name: 'label',
              label: 'Label',
              localized: true,
              required: true,
              admin: {
                description: 'The text to display for the link',
              },
            },
            {
              type: 'text',
              name: 'url',
              label: 'URL',
              required: true,
              admin: {
                description: 'The URL to link to',
              },
            },
          ],
        },
      ],
    },
  ],

  versions: {
    drafts: true,
    max: 50,
  },
}
