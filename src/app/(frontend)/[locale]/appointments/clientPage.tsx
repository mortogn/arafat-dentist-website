'use client'

import { Appointment } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { stringify } from 'qs-esm'
import { Locale } from '@/types'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { format, startOfToday } from 'date-fns'
import { bn, enUS } from 'date-fns/locale'
import { Where } from 'payload'
import { Link } from '@/i18n/routing'
import NextLink from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'

const PAGE_SIZE = 10

type AppointmentResponse = {
  docs: Appointment[]
  hasNextPage: boolean
  page: number
}

const AppointmentsClientPage = ({ locale }: { locale: Locale }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([])
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([])
  const [upcomingPage, setUpcomingPage] = useState(1)
  const [pastPage, setPastPage] = useState(1)
  const [loadingUpcoming, setLoadingUpcoming] = useState(true)
  const [loadingPast, setLoadingPast] = useState(true)
  const [loadingMoreUpcoming, setLoadingMoreUpcoming] = useState(false)
  const [loadingMorePast, setLoadingMorePast] = useState(false)
  const [hasMoreUpcoming, setHasMoreUpcoming] = useState(true)
  const [hasMorePast, setHasMorePast] = useState(true)

  // Load initial upcoming appointments
  useEffect(() => {
    const loadInitialUpcoming = async () => {
      setLoadingUpcoming(true)
      try {
        const data = await fetchUpcomingAppointments(locale, 1)
        setUpcomingAppointments(data.docs)
        setHasMoreUpcoming(data.hasNextPage)
        setUpcomingPage(1)
      } catch (error) {
        console.error('Error loading upcoming appointments:', error)
      } finally {
        setLoadingUpcoming(false)
      }
    }

    loadInitialUpcoming()
  }, [locale]) // Only reload when locale changes

  // Load initial past appointments
  useEffect(() => {
    const loadInitialPast = async () => {
      setLoadingPast(true)
      try {
        const data = await fetchPastAppointments(locale, 1)
        setPastAppointments(data.docs)
        setHasMorePast(data.hasNextPage)
        setPastPage(1)
      } catch (error) {
        console.error('Error loading past appointments:', error)
      } finally {
        setLoadingPast(false)
      }
    }

    loadInitialPast()
  }, [locale]) // Only reload when locale changes

  const loadMoreUpcoming = async () => {
    if (!hasMoreUpcoming || loadingMoreUpcoming) return

    setLoadingMoreUpcoming(true)
    try {
      const nextPage = upcomingPage + 1
      const data = await fetchUpcomingAppointments(locale, nextPage)
      setUpcomingAppointments((prev) => [...prev, ...data.docs])
      setHasMoreUpcoming(data.hasNextPage)
      setUpcomingPage(nextPage)
    } catch (error) {
      console.error('Error loading more upcoming appointments:', error)
    } finally {
      setLoadingMoreUpcoming(false)
    }
  }

  const loadMorePast = async () => {
    if (!hasMorePast || loadingMorePast) return

    setLoadingMorePast(true)
    try {
      const nextPage = pastPage + 1
      const data = await fetchPastAppointments(locale, nextPage)
      setPastAppointments((prev) => [...prev, ...data.docs])
      setHasMorePast(data.hasNextPage)
      setPastPage(nextPage)
    } catch (error) {
      console.error('Error loading more past appointments:', error)
    } finally {
      setLoadingMorePast(false)
    }
  }

  const t = useTranslations('AppointmentsPage')

  return (
    <div className="space-y-12 mt-8">
      {/* Upcoming Appointments */}
      <section>
        <h2 className={cn('text-2xl font-bold tracking-tight mb-4')}>{t('upcoming')}</h2>
        {loadingUpcoming ? (
          <SkeletonList />
        ) : (
          <>
            {upcomingAppointments.length === 0 ? (
              <div className={cn('text-xl text-center tracking-wide text-muted-foreground py-8')}>
                {t('noUpcoming')}
              </div>
            ) : (
              <div className="grid gap-4">
                {upcomingAppointments.map((app) => (
                  <AppointmentCard locale={locale} key={app.id} appointment={app} />
                ))}
              </div>
            )}
            {hasMoreUpcoming && (
              <Button
                onClick={loadMoreUpcoming}
                disabled={loadingMoreUpcoming}
                className="mt-4 w-full"
                variant="outline"
              >
                {loadingMoreUpcoming ? t('loading') : t('loadMore')}
              </Button>
            )}
          </>
        )}
      </section>

      {/* Past Appointments */}
      <section>
        <h2 className={cn('text-2xl font-bold tracking-tight mb-4')}>{t('past')}</h2>
        {loadingPast ? (
          <SkeletonList />
        ) : (
          <>
            {pastAppointments.length === 0 ? (
              <div className={cn('text-xl text-center tracking-wide text-muted-foreground py-8')}>
                {t('noPast')}
              </div>
            ) : (
              <div className="grid gap-4">
                {pastAppointments.map((app) => (
                  <AppointmentCard locale={locale} key={app.id} appointment={app} />
                ))}
              </div>
            )}
            {hasMorePast && (
              <Button
                onClick={loadMorePast}
                disabled={loadingMorePast}
                className="mt-4 w-full"
                variant="outline"
              >
                {loadingMorePast ? t('loading') : t('loadMore')}
              </Button>
            )}
          </>
        )}
      </section>
    </div>
  )
}

// Appointment Card Component
function AppointmentCard({ appointment, locale }: { appointment: Appointment; locale: Locale }) {
  const dateLocale = locale === 'bn-BD' ? bn : enUS

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{appointment?.nickname || appointment.fullname}</h3>
          <div className="space-x-2">
            <Badge
              variant="secondary"
              className={cn({
                'bg-green-300 hover:bg-green-300': appointment.status === 'completed',
                'bg-yellow-300 hover:bg-yellow-300': appointment.status === 'pending',
                'bg-red-300 hover:bg-red-300': appointment.status === 'cancelled',
                'bg-gray-300 hover:bg-gray-300': appointment.status === 'no-show',
                'bg-blue-300 hover:bg-blue-300': appointment.status === 'confirmed',
              })}
            >
              {appointment.status || 'pending'}
            </Badge>
            <time className="text-sm text-muted-foreground">
              {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: dateLocale })}{' '}
              {appointment.time && <span>- {appointment.time}</span>}
            </time>
            <Button size="sm" variant="ghost" asChild>
              <NextLink target="_blank" href={`/admin/collections/appointments/${appointment.id}`}>
                <span>View Details</span>
                <ExternalLinkIcon className="ml-2" />
              </NextLink>
            </Button>
          </div>
        </div>

        {appointment.treatments && (
          <div className="flex flex-wrap gap-2">
            {Array.isArray(appointment.treatments)
              ? appointment.treatments.map((treatment) =>
                  typeof treatment === 'object' && treatment !== null ? (
                    <Link key={treatment.id} href={`/treatments/${treatment.slug}`}>
                      <Badge variant="secondary">{treatment.title}</Badge>
                    </Link>
                  ) : (
                    <Badge key={treatment} variant="secondary">
                      {treatment}
                    </Badge>
                  ),
                )
              : null}
          </div>
        )}

        {appointment.message && (
          <p className="text-sm text-muted-foreground mt-2">{appointment.message}</p>
        )}

        {appointment.note && (
          <p className="text-base text-muted-foreground mt-2">Note: {appointment.note}</p>
        )}
      </div>
    </Card>
  )
}

// Updated Skeleton loader
function SkeletonList() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-5 w-[100px]" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

// Helper functions
const fetchUpcomingAppointments = async (
  locale: Locale,
  page: number,
): Promise<AppointmentResponse> => {
  const query: Where = {
    date: { greater_than_equal: startOfToday() },
  }
  const sort = 'date'

  const populate = {
    treatments: {
      title: true,
      slug: true,
    },
  }

  const stringifiedQuery = stringify(
    {
      where: query,
      sort,
      locale,
      limit: PAGE_SIZE,
      page,
      populate,
    },
    { addQueryPrefix: true },
  )
  const response = await fetch(`/api/appointments${stringifiedQuery}`)
  if (!response.ok) throw new Error('Failed to fetch upcoming appointments')
  const data = await response.json()
  return {
    docs: data.docs as Appointment[],
    hasNextPage: data.hasNextPage,
    page: data.page,
  }
}

const fetchPastAppointments = async (
  locale: Locale,
  page: number,
): Promise<AppointmentResponse> => {
  const query = {
    date: { less_than: startOfToday() },
  }
  const sort = '-date'

  const populate = {
    treatments: {
      title: true,
      slug: true,
    },
  }

  const stringifiedQuery = stringify(
    {
      where: query,
      sort,
      locale,
      limit: PAGE_SIZE,
      page,
      populate,
    },
    { addQueryPrefix: true },
  )

  const response = await fetch(`/api/appointments${stringifiedQuery}`)
  if (!response.ok) throw new Error('Failed to fetch past appointments')
  const data = await response.json()
  return {
    docs: data.docs as Appointment[],
    hasNextPage: data.hasNextPage,
    page: data.page,
  }
}

export default AppointmentsClientPage
