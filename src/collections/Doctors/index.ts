import { CollectionConfig } from 'payload'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  labels: {
    singular: 'Doctor',
    plural: 'Doctors',
  },
  typescript: {
    interface: 'Doctor',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'published'],
  },
  fields: [
    {
      type: 'upload',
      name: 'photo',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      required: true,
      localized: true,
    },
    {
      type: 'text',
      name: 'specialization',
      label: 'Specialization',
      required: true,
      localized: true,
    },
    {
      type: 'richText',
      name: 'about',
      label: 'About',
      localized: true,
    },
  ],
}
