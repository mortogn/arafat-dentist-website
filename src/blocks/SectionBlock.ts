import { Block } from 'payload'

export const SectionBlock: Block = {
  slug: 'section',
  labels: {
    singular: 'Section',
    plural: 'Sections',
  },
  interfaceName: 'SectionBlock',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the section',
      },
      localized: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'The description of the section',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      admin: {
        description: 'The content of the section. ',
      },
      localized: true,
    },
    {
      type: 'upload',
      name: 'image',
      label: 'Image',
      required: true,
      admin: {
        description:
          'The image for the section. Aspect ratio of 2:1 is recommended. Example: 1200x600px.',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      relationTo: 'media',
    },
  ],
}
