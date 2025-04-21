import { FaqBlock } from '@/blocks/FaqBlock'
import { CheckListBlock } from '@/blocks/richtext/CheckListBlock'
import { ImageBlock } from '@/blocks/richtext/ImageBlock'
import { YoutubeEmbedBlock } from '@/blocks/richtext/YoutubeEmbedBlock'
import { SEOFields } from '@/fields/seo'
import { slugFields } from '@/fields/slug'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'
import { revalidateTreatment } from './hooks/revalidateTreatment'
import { GridPriceListBlock } from '@/blocks/richtext/GridPriceListBlock'
import { ColorTextBlock } from '@/blocks/richtext/ColorTextBlock'
import { TreatmentsRelationBlock } from '@/blocks/richtext/TreatmentsRelationBlock'
import { CallToActionButtonsBlock } from '@/blocks/richtext/CallToActionButtonsBlock'
import { VideoReviewCarouselBlock } from '@/blocks/VideoReviewCarouselBlock'
import { ImageReviewCarouselBlock } from '@/blocks/ImageReviewCarouselBlock'
import { TextReviewCarouselBlock } from '@/blocks/TextReviewCarouselBlock'
import { InlineColorTextBlock } from '@/blocks/richtext/InlineColorTextBlock'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

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
    defaultColumns: ['thumbnail', 'title', 'slug', '_status', 'sort'],
    livePreview: {
      url: ({ data, locale, req }) => {
        const path = generatePreviewPath({
          collection: 'treatments',
          slug: data?.slug,
          locale: locale.code,
          req,
        })
        return path
      },
    },
  },
  defaultSort: '-sort',
  hooks: {
    afterChange: [revalidateTreatment],
  },
  defaultPopulate: {
    title: true,
    icon: true,
    thumbnail: true,
    description: true,
    slug: true,
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
    ...slugFields({
      fieldToUse: 'title',
      overrides: { slugOverrides: { localized: true }, checkboxOverrides: { localized: true } },
    }),
    {
      type: 'number',
      name: 'sort',
      label: 'Sort',
      admin: {
        description:
          'Sort order for the treatment. The higher the number, the higher the priority.',
        position: 'sidebar',
      },
      defaultValue: 1,
    },
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
              name: 'icon',
              relationTo: 'media',
              required: true,
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              label: 'Treatment Icon',
              admin: {
                description: 'This icon will be used to represent the treatment on the website',
              },
            },
            {
              type: 'upload',
              name: 'thumbnail',
              relationTo: 'media',
              required: true,
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                description: "The treatment's thumbnail image. The aspect ratio should be 5:3",
              },
              displayPreview: true,
            },
            {
              type: 'relationship',
              name: 'doctors',
              relationTo: 'doctors',
              hasMany: true,
              admin: {
                isSortable: true,
              },
              required: true,
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
              editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures }) {
                  return [
                    ...defaultFeatures,
                    ...rootFeatures,
                    BlocksFeature({
                      blocks: [
                        CheckListBlock,
                        YoutubeEmbedBlock,
                        ImageBlock,
                        FaqBlock,
                        GridPriceListBlock,
                        ColorTextBlock,
                        TreatmentsRelationBlock,
                        CallToActionButtonsBlock,
                        VideoReviewCarouselBlock,
                        ImageReviewCarouselBlock,
                        TextReviewCarouselBlock,
                      ],
                      inlineBlocks: [InlineColorTextBlock],
                    }),
                  ]
                },
              }),
            },
            {
              type: 'richText',
              name: 'infoViewContent',
              label: 'Info View Content',
              admin: {
                description: 'Content to display in the treatment info view block',
              },
              localized: true,
              editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures }) {
                  return [
                    ...defaultFeatures,
                    ...rootFeatures,
                    BlocksFeature({
                      blocks: [
                        CheckListBlock,
                        YoutubeEmbedBlock,
                        ImageBlock,
                        GridPriceListBlock,
                        TreatmentsRelationBlock,
                        CallToActionButtonsBlock,
                      ],
                      inlineBlocks: [],
                    }),
                  ]
                },
              }),
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
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}
