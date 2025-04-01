'use client'
import Media from '@/components/Media'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Treatment } from '@/payload-types'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { ReactNode, useState } from 'react'

type TreatmentModalProps = {
  treatments: Pick<Treatment, 'id' | 'slug' | 'title' | 'icon'>[]
  onSelect: (treatmentId: string) => void
  selectedTreatmentId?: string
  trigger: ReactNode
}

const TreatmentModal: React.FC<TreatmentModalProps> = ({
  treatments,
  onSelect,
  selectedTreatmentId,
  trigger,
}) => {
  const t = useTranslations('TreatmentInfoViewBlock')
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)

  const filteredTreatments = treatments.filter((treatment) =>
    treatment.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectTreatment = (treatmentId: string) => {
    onSelect(treatmentId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{t('selectTreatment')}</DialogTitle>
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
                className={`flex items-center gap-3 w-full p-3 rounded-md hover:bg-accent text-left ${
                  selectedTreatmentId === treatment.id ? 'bg-accent/50' : ''
                }`}
                onClick={() => handleSelectTreatment(treatment.id)}
              >
                <div className="flex items-center justify-between gap-3 flex-1">
                  <div className="flex items-center gap-3">
                    <Media resource={treatment.icon} height={40} width={40} className="shrink-0" />
                    <span className="font-medium">{treatment.title}</span>
                  </div>

                  <div className="relative flex items-center">
                    <div
                      className={`h-4 w-4 rounded-full border ${
                        selectedTreatmentId === treatment.id
                          ? 'border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {selectedTreatmentId === treatment.id && (
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

export default TreatmentModal
