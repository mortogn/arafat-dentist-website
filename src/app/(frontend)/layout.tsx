import React from 'react'
import { Anek_Bangla, Noto_Serif, Playfair_Display } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/Header'
import { getLocale } from '@/utilities/locales'

const playfair_display = Playfair_Display({
  display: 'swap',
  variable: '--font-heading',
  weight: ['700'],
  subsets: ['latin'],
})

const noto_serif = Noto_Serif({
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
})
const anek_bangla_heading = Anek_Bangla({
  display: 'swap',
  variable: '--font-heading',
  weight: ['700'],
  subsets: ['bengali'],
})

const anek_bangla_body = Anek_Bangla({
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600'],
  subsets: ['bengali'],
})

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html>
      <body
        className={cn({
          [`${playfair_display.variable} ${noto_serif.variable}`]: locale === 'en-US',
          [`${anek_bangla_heading.variable} ${anek_bangla_body.variable}`]: locale === 'bn-BD',
        })}
      >
        <Header />
        <main className="mt-10">{children}</main>
      </body>
    </html>
  )
}
