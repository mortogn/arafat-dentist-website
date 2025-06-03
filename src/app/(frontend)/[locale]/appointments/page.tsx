export const dynamic = 'force-dynamic'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Locale } from '@/types'
import React from 'react'
import AppointmentsClientPage from './clientPage'

import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getMeUser } from '@/utilities/getMeUser'
import { notFound } from 'next/navigation'

type Params = Promise<{
  locale: Locale
}>

export default async function AppointmentsPage({ params }: { params: Params }) {
  try {
    const user = await getMeUser()

    if (!user || !user.role?.includes('admin')) {
      notFound()
    }
  } catch (err) {
    console.error('Error fetching user:', err)
    notFound()
  }

  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'AppointmentsPage' })

  return (
    <MaxWidthWrapper className="max-w-screen-lg my-10">
      <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
      <p className="text-muted-foreground mt-2">{t('description')}</p>

      <AppointmentsClientPage locale={locale} />
    </MaxWidthWrapper>
  )
}
