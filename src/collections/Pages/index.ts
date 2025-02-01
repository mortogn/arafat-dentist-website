import { BookingFormBlock } from '@/blocks/BookingFormBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { SEOFields } from '@/fields/seo'
import { slugFields } from '@/fields/slug'
import { CollectionConfig } from 'payload'
import { populateBookAppointmentBlock } from './hooks/populate-book-appointment-block'
import { TreatmentsBlock } from '@/blocks/TreatmentsBlock'

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
  hooks: {
    // afterRead: [populateBookAppointmentBlock],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
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
          label: 'Content',
          fields: [
            {
              type: 'blocks',
              name: 'layout',

              blocks: [HeroBlock, BookingFormBlock, TreatmentsBlock],
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
