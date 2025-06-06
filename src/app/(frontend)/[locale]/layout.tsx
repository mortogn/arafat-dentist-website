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
import MobileBottomBar from '@/components/MobileBottomBar'
import { AdminBar } from '@/components/AdminBar'
import { Toaster } from '@/components/ui/sonner'
import UmamiAnalytics from '@/components/UmamiAnalytics'
import { draftMode } from 'next/headers'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import Popup from '@/components/Popup'

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

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

  const { isEnabled } = await draftMode()

  return (
    <html lang={locale} suppressHydrationWarning>
      <RefreshRouteOnSave />
      <NextIntlClientProvider messages={messages}>
        <body
          className={cn({
            [`${playfair_display.variable} ${poppins.variable}`]: locale === 'en-US',
            [`${anek_bangla_heading.variable} ${anek_bangla_body.variable}`]: locale === 'bn-BD',
          })}
        >
          <AdminBar adminBarProps={{ preview: isEnabled }} />

          <Header locale={locale} />
          <main>{children}</main>
          <ScrollToTop />

          <MobileBottomBar />

          <Footer locale={locale} />

          <Toaster position="bottom-center" richColors />

          <Popup locale={locale} />

          <UmamiAnalytics />
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
