'use client'
import Media from '@/components/Media'
import RichTextContent from '@/components/RichTextContent'
import { Button } from '@/components/ui/button'
import { treatmentJsxConverter } from '@/converters/treatmentJsxConverter'
import { Link } from '@/i18n/routing'
import { Treatment } from '@/payload-types'
import { ListFilter, TimerResetIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { FC, useEffect, useState } from 'react'
import TreatmentModal from './TreatmentModal'

type Props = {
  treatments: Pick<Treatment, 'id' | 'slug' | 'title' | 'icon' | 'doctors' | 'infoViewContent'>[]
}

const TreatmentInfoViewBlockClient: FC<Props> = ({ treatments }) => {
  const t = useTranslations('TreatmentInfoViewBlock')

  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('')

  const [selectedTreatment, setSelectedTreatment] = useState<Pick<
    Treatment,
    'id' | 'slug' | 'title' | 'icon' | 'doctors' | 'infoViewContent'
  > | null>(null)

  useEffect(() => {
    if (selectedTreatmentId) {
      const treatment = treatments.find((treatment) => treatment.id === selectedTreatmentId)

      if (treatment) {
        setSelectedTreatment(treatment)
      }
    } else {
      setSelectedTreatment(null)
    }
  }, [selectedTreatmentId, treatments])

  const onTreatmentSelect = (value: string) => {
    setSelectedTreatmentId(value)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <TreatmentModal
          treatments={treatments}
          onSelect={onTreatmentSelect}
          selectedTreatmentId={selectedTreatmentId}
          trigger={
            <Button variant="outline" className="flex items-center gap-2 flex-1 justify-between">
              <span className="truncate">
                {selectedTreatment ? selectedTreatment.title : t('selectTreatment')}
              </span>
              <ListFilter className="h-4 w-4 text-primary" />
            </Button>
          }
        />

        <Button
          variant="secondary"
          onClick={() => setSelectedTreatmentId('')}
          disabled={!selectedTreatmentId}
        >
          <TimerResetIcon className="h-4 w-4 text-primary" />
          <span className="sr-only sm:not-sr-only sm:ml-1">{t('reset')}</span>
        </Button>
      </div>

      {selectedTreatment && selectedTreatment.infoViewContent && (
        <div className="p-4 rounded-md bg-background text-foreground">
          <RichTextContent
            converters={treatmentJsxConverter}
            data={selectedTreatment.infoViewContent}
            className="prose md:prose lg:prose xl:prose 2xl:prose [&_p]:text-base [&_h4]:text-lg"
          />
          <div className="flex items-center justify-center my-4">
            <Button
              asChild
              data-umami-event="View details button"
              data-umami-event-url={`/treatments/${selectedTreatment.slug}`}
              data-umami-event-context="Treatment info view block"
              data-umami-event-treatment={selectedTreatment.title}
            >
              <Link href={`/treatments/${selectedTreatment.slug}`}>{t('viewDetails')}</Link>
            </Button>
          </div>
        </div>
      )}

      {selectedTreatment && !!selectedTreatment.doctors && selectedTreatment.doctors.length > 0 && (
        <div className="p-4 rounded-md bg-background text-foreground">
          {selectedTreatment.doctors.map(
            (doctor) =>
              typeof doctor !== 'string' && (
                <div key={doctor.id} className="flex items-center gap-4">
                  <Media
                    resource={doctor.photo}
                    height={300}
                    width={300}
                    quality={100}
                    className="object-cover rounded-full size-[90px] lg:size-[150px] shrink-0"
                  />
                  <div>
                    <h3 className="font-semibold text-lg lg:text-xl">{doctor.name}</h3>
                    <h4 className="font-medium text-sm lg:text-base mt-1.5">
                      {doctor.specialization}
                    </h4>
                    {doctor.about && (
                      <RichTextContent
                        className="prose md:prose mt-3 lg:prose xl:prose 2xl:prose prose-p:m-0 prose-p:mt-0.5 prose-p:p-0 prose-p:text-sm"
                        data={doctor.about}
                      />
                    )}
                  </div>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  )
}

export default TreatmentInfoViewBlockClient
