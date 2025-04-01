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
  async rewrites() {
    return [
      {
        source: '/track/:path*',
        destination: 'http://umami-vsc0sgwwoc4wsocsk4kcss8c.157.180.72.227.sslip.io/:path*',
      },
    ]
  },
}

export default withPayload(withNextIntl(nextConfig))
