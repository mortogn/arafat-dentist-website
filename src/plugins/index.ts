import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { generateURL } from './seo/generateURL'
import { s3Storage } from '@payloadcms/storage-s3'

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle: ({ doc }) => doc?.title,
    generateDescription: ({ doc }) => doc?.description,
    generateImage: ({ doc }) => doc?.image || doc?.thumbnail,
    interfaceName: 'SEOFields',
    generateURL: ({ doc, collectionSlug }) =>
      doc && collectionSlug && generateURL(doc, collectionSlug),
  }),

  s3Storage({
    bucket: process.env.R2_BUCKET as string,
    collections: {
      media: true,
    },
    config: {
      region: 'auto',
      credentials: {
        accessKeyId: process.env.R2_ACCESS_TOKEN as string,
        secretAccessKey: process.env.R2_SECRET_TOKEN as string,
      },
      endpoint: process.env.R2_ENDPOINT as string,
    },
  }),
]
