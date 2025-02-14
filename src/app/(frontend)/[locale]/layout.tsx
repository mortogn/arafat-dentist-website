import React from 'react'
import { Anek_Bangla, Playfair_Display, Poppins } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import ScrollToTop from '@/components/ScrollToTop'

const playfair_display = Playfair_Display({
  display: 'swap',
  variable: '--font-heading',
  weight: ['700'],
  subsets: ['latin'],
})

const poppins = Poppins({
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
  params: Promise<{ locale: 'en-US' | 'bn-BD' }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en-US' | 'bn-BD')) {
    notFound()
  }
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body
          className={cn({
            [`${playfair_display.variable} ${poppins.variable}`]: locale === 'en-US',
            [`${anek_bangla_heading.variable} ${anek_bangla_body.variable}`]: locale === 'bn-BD',
          })}
        >
          <Header locale={locale} />
          <main className="mt-10">{children}</main>
          <ScrollToTop />
          <Footer locale={locale} />
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
