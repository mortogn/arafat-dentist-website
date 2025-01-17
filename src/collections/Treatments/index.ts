import { SEOFields } from '@/fields/seo'
import { slugFields } from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const Treatments: CollectionConfig = {
  slug: 'treatments',
  labels: {
    singular: 'Treatment',
    plural: 'Treatments',
  },
  typescript: {
    interface: 'Treatment',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['thumbnail', 'title', 'slug', 'status'],
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      localized: true,
      admin: {
        description: 'The title of the treatment',
      },
    },
    ...slugFields({ fieldToUse: 'title' }),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              type: 'textarea',
              name: 'description',
              label: 'Description',
              localized: true,
              admin: {
                description: 'A short description of the treatment',
              },
              maxLength: 250,
            },
            {
              type: 'upload',
              name: 'thumbnail',
              relationTo: 'media',
              required: true,
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              type: 'richText',
              name: 'content',
              label: 'Content',
              localized: true,
              admin: {
                description:
                  'All the details about the treatment including price, duration and benefits',
              },
            },
          ],
        },
        {
          name: 'meta',
          fields: SEOFields,
          label: 'SEO',
        },
      ],
    },
  ],
}
