'use client'

import { Appointment } from '@/payload-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { stringify } from 'qs-esm'
import { Locale } from '@/types'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { format, isToday, isTomorrow, isYesterday, startOfToday } from 'date-fns'
import { bn, enUS } from 'date-fns/locale'
import { Where } from 'payload'
import { HourglassIcon } from 'lucide-react'
import { STATUSES, StatusValue } from './status'
import { TIME_OF_DAY_ORDER, asTimeOfDay } from './timeOfDay'
import AppointmentCard from './AppointmentCard'

const PAGE_SIZE = 10

type Scope = 'upcoming' | 'past'

type AppointmentResponse = {
  docs: Appointment[]
  hasNextPage: boolean
  page: number
}

type Filters = {
  scope: Scope
  status: StatusValue | 'all'
  search: string
}

const fetchAppointments = async (
  locale: Locale,
  page: number,
  { scope, status, search }: Filters,
): Promise<AppointmentResponse> => {
  const and: Where[] = [
    scope === 'upcoming'
      ? { date: { greater_than_equal: startOfToday() } }
      : { date: { less_than: startOfToday() } },
  ]

  if (status !== 'all') {
    and.push({ status: { equals: status } })
  }

  if (search.trim()) {
    and.push({
      or: [
        { fullname: { like: search.trim() } },
        { phone: { like: search.trim() } },
        { nickname: { like: search.trim() } },
      ],
    })
  }

  const stringifiedQuery = stringify(
    {
      where: { and },
      sort: scope === 'upcoming' ? 'date' : '-date',
      locale,
      limit: PAGE_SIZE,
      page,
      populate: { treatments: { title: true, slug: true } },
    },
    { addQueryPrefix: true },
  )

  const response = await fetch(`/api/appointments${stringifiedQuery}`)
  if (!response.ok) throw new Error('Failed to fetch appointments')
  const data = await response.json()
  return {
    docs: data.docs as Appointment[],
    hasNextPage: data.hasNextPage,
    page: data.page,
  }
}

// Order appointments within a day by time-of-day slot (morning → night).
// Appointments with no/unknown slot sort last.
const timeOrder = (time?: string | null): number => {
  const slot = asTimeOfDay(time)
  return slot ? TIME_OF_DAY_ORDER[slot] : Number.MAX_SAFE_INTEGER
}

type DayGroup = { key: string; date: Date; items: Appointment[] }

// Group appointments by calendar day, preserving the API's day ordering and
// sorting each day by time-of-day.
const groupByDay = (appointments: Appointment[]): DayGroup[] => {
  const groups: DayGroup[] = []
  const index = new Map<string, DayGroup>()

  for (const app of appointments) {
    const date = new Date(app.date)
    const key = format(date, 'yyyy-MM-dd')
    let group = index.get(key)
    if (!group) {
      group = { key, date, items: [] }
      index.set(key, group)
      groups.push(group)
    }
    group.items.push(app)
  }

  for (const group of groups) {
    group.items.sort((a, b) => timeOrder(a.time) - timeOrder(b.time))
  }

  return groups
}

// Lightweight count of pending upcoming appointments (reads totalDocs).
const fetchPendingCount = async (locale: Locale): Promise<number> => {
  const query = stringify(
    {
      where: {
        and: [{ date: { greater_than_equal: startOfToday() } }, { status: { equals: 'pending' } }],
      },
      locale,
      limit: 1,
      depth: 0,
    },
    { addQueryPrefix: true },
  )
  const response = await fetch(`/api/appointments${query}`)
  if (!response.ok) return 0
  const data = await response.json()
  return data.totalDocs ?? 0
}

const AppointmentsClientPage = ({ locale }: { locale: Locale }) => {
  const t = useTranslations('AppointmentsPage')
  const dateLocale = locale === 'bn-BD' ? bn : enUS

  const [scope, setScope] = useState<Scope>('upcoming')
  const [status, setStatus] = useState<StatusValue | 'all'>('all')
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)

  const filters = useMemo<Filters>(() => ({ scope, status, search }), [scope, status, search])

  // Debounce the search input
  useEffect(() => {
    const id = setTimeout(() => setSearch(searchInput), 300)
    return () => clearTimeout(id)
  }, [searchInput])

  // Load the first page whenever the locale or any filter changes
  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchAppointments(locale, 1, filters)
        if (!active) return
        setAppointments(data.docs)
        setHasMore(data.hasNextPage)
        setPage(1)
      } catch (error) {
        console.error('Error loading appointments:', error)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [locale, filters])

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return
    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const data = await fetchAppointments(locale, nextPage, filters)
      setAppointments((prev) => [...prev, ...data.docs])
      setHasMore(data.hasNextPage)
      setPage(nextPage)
    } catch (error) {
      console.error('Error loading more appointments:', error)
    } finally {
      setLoadingMore(false)
    }
  }, [hasMore, loadingMore, page, locale, filters])

  const refreshPendingCount = useCallback(() => {
    fetchPendingCount(locale)
      .then(setPendingCount)
      .catch(() => {})
  }, [locale])

  // Keep the pending badge in sync on load and after status changes.
  useEffect(() => {
    refreshPendingCount()
  }, [refreshPendingCount])

  const handleUpdated = useCallback(
    (updated: Appointment) => {
      setAppointments((prev) => prev.map((app) => (app.id === updated.id ? updated : app)))
      refreshPendingCount()
    },
    [refreshPendingCount],
  )

  const togglePendingFilter = useCallback(() => {
    setScope('upcoming')
    setStatus((prev) => (prev === 'pending' ? 'all' : 'pending'))
  }, [])

  const groups = useMemo(() => groupByDay(appointments), [appointments])

  const dayLabel = (date: Date): string | null => {
    if (isToday(date)) return t('today')
    if (isTomorrow(date)) return t('tomorrow')
    if (isYesterday(date)) return t('yesterday')
    return null
  }

  const emptyMessage =
    search || status !== 'all'
      ? t('noResults')
      : t(scope === 'upcoming' ? 'noUpcoming' : 'noPast')

  return (
    <div className="mt-8 space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* Scope toggle */}
          <div className="inline-flex rounded-lg border border-border p-1">
            {(['upcoming', 'past'] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setScope(value)}
                className={cn(
                  'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  scope === value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t(value)}
              </button>
            ))}
          </div>

          {/* Pending quick-filter */}
          {pendingCount > 0 && (
            <button
              type="button"
              onClick={togglePendingFilter}
              aria-pressed={status === 'pending'}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                status === 'pending'
                  ? 'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              <HourglassIcon className="size-4" />
              {t('pendingCount', { count: pendingCount })}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="sm:w-64"
          />
          <Select value={status} onValueChange={(v) => setStatus(v as StatusValue | 'all')}>
            <SelectTrigger className="sm:w-44">
              <SelectValue placeholder={t('filterStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allStatuses')}</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {t(`status.${s}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Agenda */}
      {loading ? (
        <SkeletonList />
      ) : appointments.length === 0 ? (
        <div className="py-12 text-center text-lg tracking-wide text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <>
          <div className="space-y-8">
            {groups.map((group) => {
              const relative = dayLabel(group.date)
              const highlight = isToday(group.date)
              return (
                <section key={group.key} className="space-y-3">
                  <div className="sticky top-0 z-10 -mx-1 flex items-baseline gap-2 bg-background/95 px-1 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                    <h2
                      className={cn(
                        'font-heading text-lg font-bold tracking-tight',
                        highlight ? 'text-primary' : 'text-foreground',
                      )}
                    >
                      {relative ? `${relative} · ` : ''}
                      {format(group.date, 'EEE dd MMM', { locale: dateLocale })}
                    </h2>
                    <span className="text-sm font-medium text-muted-foreground">
                      {group.items.length}
                    </span>
                    <span className="ml-2 h-px flex-1 bg-border" aria-hidden />
                  </div>

                  <div className="grid gap-3">
                    {group.items.map((app) => (
                      <AppointmentCard key={app.id} appointment={app} onUpdated={handleUpdated} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
          {hasMore && (
            <Button onClick={loadMore} disabled={loadingMore} className="w-full" variant="outline">
              {loadingMore ? t('loading') : t('loadMore')}
            </Button>
          )}
        </>
      )}
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
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

export default AppointmentsClientPage
