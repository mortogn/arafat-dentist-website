import React from 'react'
import { Anek_Bangla, Noto_Serif, Playfair_Display } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

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

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en-US' | 'bn-BD')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body
          className={cn({
            [`${playfair_display.variable} ${noto_serif.variable}`]: locale === 'en-US',
            [`${anek_bangla_heading.variable} ${anek_bangla_body.variable}`]: locale === 'bn-BD',
          })}
        >
          <Header locale={locale} />
          <main className="mt-10">{children}</main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
