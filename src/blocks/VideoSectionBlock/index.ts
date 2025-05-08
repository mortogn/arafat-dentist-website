import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  StrikethroughFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { videoIdBeforeValidateHook } from './hooks/videoIdBeforeValidateHook'

export const VideoSectionBlock: Block = {
  slug: 'video-section',
  interfaceName: 'VideoSectionBlock',
  labels: {
    singular: 'Video Section',
    plural: 'Video Sections',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      admin: {
        description: 'The title of the video section.',
      },
    },
    {
      type: 'richText',
      name: 'description',
      label: 'Description',
      required: true,
      admin: {
        description: 'A brief description of the video section.',
      },
      editor: lexicalEditor({
        features: [BoldFeature(), UnderlineFeature(), StrikethroughFeature(), ItalicFeature()],
      }),
    },
    {
      type: 'upload',
      name: 'thumbnail',
      label: 'Thumbnail',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The thumbnail image for the video section.',
      },
      filterOptions: {
        mimeType: { contains: 'image/' },
      },
    },
    {
      type: 'text',
      name: 'videoId',
      label: 'Video ID',
      required: true,
      admin: {
        description: 'The ID of the video to be embedded. Paste the full URL or just the ID.',
      },
      hooks: {
        beforeValidate: [videoIdBeforeValidateHook],
      },
    },
  ],
}
