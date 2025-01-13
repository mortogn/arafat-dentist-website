import React from 'react'
import { Noto_Serif, Playfair_Display } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/header'

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

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={cn(playfair_display.variable, noto_serif.variable)}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
