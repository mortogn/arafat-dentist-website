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
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

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
    livePreview: {
      url: ({ data, locale, req }) => {
        const path = generatePreviewPath({
          locale: locale.code,
          collection: 'pages',
          slug: data?.slug,
          req,
        })

        return path
      },
    },
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
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
