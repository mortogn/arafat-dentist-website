import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Field } from 'payload'

export const SEOFields: Field[] = [
  MetaTitleField({
    hasGenerateFn: true,
    overrides: {
      localized: true,
    },
  }),
  MetaDescriptionField({
    hasGenerateFn: true,
    overrides: {
      localized: true,
    },
  }),
  MetaImageField({
    hasGenerateFn: true,
    relationTo: 'media',
    overrides: {
      localized: false,
    },
  }),

  PreviewField({
    hasGenerateFn: true,
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
  }),
  OverviewField({
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
    imagePath: 'meta.image',
  }),
]
