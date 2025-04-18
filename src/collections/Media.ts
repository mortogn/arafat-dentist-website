import type { CollectionConfig } from 'payload'
import crypto from 'node:crypto'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [
      ({ operation, req }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          req.file.name = crypto.randomUUID()
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'small',
    imageSizes: [
      {
        name: 'small',
        width: 300,
        height: 300,
        fit: 'cover',
      },
    ],
  },
}
