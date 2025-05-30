'use client'
import Media from '@/components/Media'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Treatment } from '@/payload-types'
import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

type TreatmentMultiSelectProps = {
  treatments: Pick<Treatment, 'id' | 'slug' | 'title' | 'icon'>[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

const TreatmentMultiSelect: React.FC<TreatmentMultiSelectProps> = ({
  treatments,
  value,
  onChange,
  placeholder,
}) => {
  const t = useTranslations('BookingPage.form')
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)

  // Parse comma-separated treatmentIds into an array
  const selectedTreatmentIds = value ? value : []

  const filteredTreatments = treatments.filter(
    (treatment) =>
      treatment.title && treatment.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleToggleTreatment = (treatmentId: string) => {
    let newSelectedIds: string[]

    if (selectedTreatmentIds.includes(treatmentId)) {
      // Remove treatment if already selected
      newSelectedIds = selectedTreatmentIds.filter((id) => id !== treatmentId)
    } else {
      // Add treatment if not selected
      newSelectedIds = [...selectedTreatmentIds, treatmentId]
    }

    // Convert array back to comma-separated string
    onChange(newSelectedIds)
  }

  const handleRemoveTreatment = (treatmentId: string) => {
    const newSelectedIds = selectedTreatmentIds.filter((id) => id !== treatmentId)
    onChange(newSelectedIds)
  }

  const selectedTreatments = treatments.filter((treatment) =>
    selectedTreatmentIds.includes(treatment.id),
  )

  const displayContent =
    selectedTreatments.length > 0 ? (
      <div className="flex flex-wrap gap-2 h-max">
        {selectedTreatments.map((treatment) => (
          <div
            key={treatment.id}
            className="bg-accent flex items-center gap-2 rounded-md px-2 py-1"
          >
            <div className="flex items-center gap-2">
              <Media
                resource={treatment.icon}
                height={24}
                width={24}
                className="shrink-0 rounded-md"
              />
              <div className="text-sm">{treatment.title}</div>
            </div>
            <div
              role="button"
              aria-label="Remove treatment"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleRemoveTreatment(treatment.id)
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <span className="text-muted-foreground">{placeholder || t('placeholders.treatment')}</span>
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          type="button"
          className="w-full justify-between h-max min-h-10 px-3 text-sm font-normal"
        >
          <div className="flex flex-1 items-center overflow-hidden">{displayContent}</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{t('selectTreatments')}</DialogTitle>
          <DialogDescription>{t('selectMultipleTreatments')}</DialogDescription>
        </DialogHeader>

        <div className="relative mt-2 mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder={t('searchTreatments')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background"
          />
        </div>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {filteredTreatments.length > 0 ? (
            filteredTreatments.map((treatment) => (
              <button
                key={treatment.id}
                type="button"
                className={`flex items-center gap-3 w-full p-3 rounded-md hover:bg-accent text-left ${
                  selectedTreatmentIds.includes(treatment.id) ? 'bg-accent/50' : ''
                }`}
                onClick={() => handleToggleTreatment(treatment.id)}
              >
                <div className="flex items-center justify-between gap-3 flex-1">
                  <div className="flex items-center gap-3">
                    <Media resource={treatment.icon} height={40} width={40} className="shrink-0" />
                    <span className="font-medium">{treatment.title}</span>
                  </div>

                  <div className="relative flex items-center">
                    <div
                      className={`h-4 w-4 rounded-full border ${
                        selectedTreatmentIds.includes(treatment.id)
                          ? 'border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {selectedTreatmentIds.includes(treatment.id) && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">{t('noTreatmentsFound')}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TreatmentMultiSelect
