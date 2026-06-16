'use client'

import Media from '@/components/Media'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Treatment } from '@/payload-types'
import { Check, Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useMemo, useState } from 'react'

type TreatmentChipsProps = {
  treatments: Pick<Treatment, 'id' | 'slug' | 'title' | 'icon'>[]
  value: string[]
  onChange: (value: string[]) => void
}

const STEP = 4

const TreatmentChips: React.FC<TreatmentChipsProps> = ({ treatments, value, onChange }) => {
  const t = useTranslations('BookingPage.form')
  const selected = value ?? []

  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(STEP)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return treatments
    return treatments.filter((treatment) => treatment.title?.toLowerCase().includes(q))
  }, [treatments, query])

  const shown = filtered.slice(0, visible)

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id))
    } else {
      onChange([...selected, id])
    }
  }

  const handleSearch = (next: string) => {
    setQuery(next)
    setVisible(STEP)
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t('searchTreatments')}
          className="pl-9"
        />
      </div>

      {shown.length === 0 ? (
        <p className="py-2 text-sm text-muted-foreground">{t('noTreatmentsFound')}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {shown.map((treatment) => {
            const isSelected = selected.includes(treatment.id)
            return (
              <button
                key={treatment.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggle(treatment.id)}
                className={cn(
                  'group flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-sm transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isSelected
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground',
                )}
              >
                {treatment.icon ? (
                  <Media
                    resource={treatment.icon}
                    height={24}
                    width={24}
                    className="size-6 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-xs">
                    {treatment.title?.[0] ?? '?'}
                  </span>
                )}
                <span className="font-medium">{treatment.title}</span>
                <Check
                  className={cn(
                    'size-4 shrink-0 text-primary transition-opacity',
                    isSelected ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </button>
            )
          })}
        </div>
      )}

      {filtered.length > visible && (
        <button
          type="button"
          onClick={() => setVisible((v) => v + STEP)}
          className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {t('showMore')}
        </button>
      )}
    </div>
  )
}

export default TreatmentChips
