// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { plugins } from './plugins'
import { Header } from './globals/header'
import { Treatments } from './collections/Treatments'
import { Socials } from './globals/socials'
import { Reviews } from './collections/Reviews'
import { Contacts } from './globals/contacts'
import { Footer } from './globals/footer'
import { Appointment } from './collections/Appointment'
import { Doctors } from './collections/Doctors'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          label: 'Mobile',
          width: 375,
          height: 667, // iPhone 8/SE dimensions
        },
        {
          name: 'tablet',
          label: 'Tablet',
          width: 768,
          height: 1024, // iPad dimensions
        },
        {
          name: 'desktop',
          label: 'Desktop',
          width: 1440,
          height: 900, // Common desktop resolution
        },
      ],
    },
  },
  collections: [Users, Media, Pages, Treatments, Reviews, Appointment, Doctors],
  editor: lexicalEditor({
    features({ defaultFeatures, rootFeatures }) {
      return [...defaultFeatures, ...rootFeatures, FixedToolbarFeature()]
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  localization: {
    locales: [
      {
        code: 'en-US',
        label: 'English',
      },
      {
        code: 'bn-BD',
        label: 'Bangla',
      },
    ],
    defaultLocale: 'en-US',
    fallback: true,
  },
  sharp,
  globals: [Header, Socials, Contacts, Footer],
  plugins: [
    payloadCloudPlugin(),
    ...plugins,
    // storage-adapter-placeholder
  ],
})
