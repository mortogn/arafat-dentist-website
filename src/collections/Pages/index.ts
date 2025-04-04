import { BookingFormBlock } from '@/blocks/BookingFormBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { SEOFields } from '@/fields/seo'
import { slugFields } from '@/fields/slug'
import { CollectionConfig } from 'payload'
import { TreatmentsBlock } from '@/blocks/TreatmentsBlock'
import { VideoReviewBlock } from '@/blocks/VideoReviewBlock'
import { StatsBlock } from '@/blocks/StatsBlock'
import { CallToActionBlock } from '@/blocks/CallToActionBlock'
import { LocationBlock } from '@/blocks/LocationBlock'
import { SectionBlock } from '@/blocks/SectionBlock'
import { revalidatePage } from './hooks/revalidate-page'
import { PatientSafetyBlock } from '@/blocks/PatientSafetyBlock'
import { TreatmentGridBlock } from '@/blocks/TreatmentGridBlock'
import { TreatmentInfoViewBlock } from '@/blocks/TreatmentInfoViewBlock'

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
    afterChange: [revalidatePage],
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
                LocationBlock,
                SectionBlock,
                PatientSafetyBlock,
                TreatmentGridBlock,
                TreatmentInfoViewBlock,
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
