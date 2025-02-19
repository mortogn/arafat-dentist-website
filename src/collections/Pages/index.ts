import { BookingFormBlock } from '@/blocks/BookingFormBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { SEOFields } from '@/fields/seo'
import { slugFields } from '@/fields/slug'
import { CollectionConfig } from 'payload'
import { TreatmentsBlock } from '@/blocks/TreatmentsBlock'
import { populateTreaments } from '@/blocks/TreatmentsBlock/hooks/populateTreatments'
import { VideoReviewBlock } from '@/blocks/VideoReviewBlock'
import { StatsBlock } from '@/blocks/StatsBlock'
import { CallToActionBlock } from '@/blocks/CallToActionBlock'

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
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'published'],
  },
  hooks: {
    afterRead: [populateTreaments],
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

              blocks: [
                HeroBlock,
                BookingFormBlock,
                TreatmentsBlock,
                VideoReviewBlock,
                StatsBlock,
                CallToActionBlock,
              ],
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
