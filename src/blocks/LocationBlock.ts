import { validateURL } from '@/utilities/validateURL'
import { Block } from 'payload'

export const LocationBlock: Block = {
  slug: 'location-block',
  labels: {
    singular: 'Location Block',
    plural: 'Location Blocks',
  },
  interfaceName: 'LocationBlock',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      localized: true,
    },
    {
      type: 'richText',
      name: 'description',
      label: 'Description',
      required: true,
      localized: true,
    },
    {
      type: 'text',
      name: 'mapUrl',
      label: 'Map URL',
      validate: validateURL,
      admin: {
        description: 'The URL to embed the map',
      },
      required: true,
    },
  ],
}
