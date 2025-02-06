import { CollectionConfig } from 'payload'
import { VideoReviewField } from './VideoReviewField'
import { TextReviewField } from './TextReviewField'
import { ImageReviewField } from './ImageReviewField'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Review',
    plural: 'Reviews',
  },
  typescript: {
    interface: 'Review',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type'],
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      admin: {
        description: 'The title of the review',
      },
    },
    {
      type: 'radio',
      name: 'type',
      label: 'Type',
      options: ['Video', 'Text', 'Image'],
    },
    VideoReviewField,
    TextReviewField,
    ImageReviewField,
  ],
}
