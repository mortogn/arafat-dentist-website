import { FaqBlock } from '@/blocks/FaqBlock'
import { CheckListBlock } from '@/blocks/richtext/CheckListBlock'
import { ImageBlock } from '@/blocks/richtext/ImageBlock'
import { YoutubeEmbedBlock } from '@/blocks/richtext/YoutubeEmbedBlock'
import { SEOFields } from '@/fields/seo'
import { slugFields } from '@/fields/slug'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'
import { revalidateTreatment } from './hooks/revalidateTreatment'

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
  hooks: {
    afterChange: [revalidateTreatment],
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
                      blocks: [CheckListBlock, YoutubeEmbedBlock, ImageBlock, FaqBlock],
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
