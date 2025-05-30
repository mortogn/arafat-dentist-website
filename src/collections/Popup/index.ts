import { validateURL } from '@/utilities/validateURL'
import { CollectionConfig } from 'payload'
import { revalidateCache } from './hooks/revalidateCache'

export const Popup: CollectionConfig = {
  slug: 'popup',
  labels: {
    singular: 'Popup',
    plural: 'Popups',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCache],
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      admin: {
        description: 'The title of the popup',
      },
    },
    {
      type: 'upload',
      name: 'image',
      label: 'Image',
      relationTo: 'media',
      admin: {
        description: 'The image to display in the popup. Aspect ratio is 1:1. Ex. 650x650px',
      },
      required: true,
    },
    {
      type: 'text',
      name: 'url',
      label: 'URL',
      admin: {
        description: 'The URL to redirect to when the popup is clicked',
      },
      validate: validateURL,
      required: true,
      localized: true,
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
