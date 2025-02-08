import { GlobalConfig } from 'payload'
import { revalidateSocials } from './hooks/revalidateSocials'

export const Socials: GlobalConfig = {
  slug: 'socials',
  label: 'Socials',
  hooks: {
    afterChange: [revalidateSocials],
  },
  typescript: {
    interface: 'Socials',
  },
  fields: [
    {
      name: 'socials',
      type: 'array',
      label: 'Socials',
      labels: {
        singular: 'Social',
        plural: 'Socials',
      },
      fields: [
        {
          name: 'icon',
          type: 'radio',
          options: ['facebook', 'instagram', 'youtube', 'twitter', 'none'],
          required: true,
        },
        {
          name: 'platform',
          type: 'text',
          label: 'Platform',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
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
