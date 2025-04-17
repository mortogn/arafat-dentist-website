import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      {
        source: '/en-US',
        destination: '/bn-BD',
        permanent: false,
      },
      {
        source: '/en-US/:path*',
        destination: '/bn-BD/:path*',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/track/:path*',
        destination: process.env.NEXT_PUBLIC_UMAMI_URL + '/:path*',
      },
    ]
  },
}

export default withPayload(withNextIntl(nextConfig))
