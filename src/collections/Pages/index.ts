import { HeroBlock } from '@/blocks/HeroBlock'
import { SEOFields } from '@/fields/seo'
import { slugFields } from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  typescript: {
    interface: 'Page',
  },
  admin: {
    // useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'published'],
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      localized: false,
    },
    ...slugFields({ fieldToUse: 'title' }),
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',

          fields: [
            {
              type: 'blocks',
              name: 'layout',
              localized: true,
              blocks: [HeroBlock],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [...SEOFields],
        },
      ],
    },
  ],
}
