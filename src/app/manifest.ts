import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Doctors Dental',
    description: 'A dental clinic providing top-notch services',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#E21D4B',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
