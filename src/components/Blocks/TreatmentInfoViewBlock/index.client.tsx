'use client'
import Media from '@/components/Media'
import RichTextContent from '@/components/RichTextContent'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { treatmentJsxConverter } from '@/converters/treatmentJsxConverter'
import { Link } from '@/i18n/routing'
import { Treatment } from '@/payload-types'
import { TimerResetIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { FC, useEffect, useState } from 'react'

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
        <Select value={selectedTreatmentId} onValueChange={onTreatmentSelect}>
          <SelectTrigger>
            <SelectValue placeholder={t('selectTreatment')} />
          </SelectTrigger>

          <SelectContent>
            {treatments.map((treatment) => (
              <SelectItem key={treatment.id} value={treatment.id} className="">
                <div className="flex items-center gap-2">
                  <Media resource={treatment.icon} height={30} width={30} />
                  <span>{treatment.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="secondary" onClick={() => setSelectedTreatmentId('')}>
          <TimerResetIcon />
          Reset
        </Button>
      </div>

      {selectedTreatment && selectedTreatment.infoViewContent && (
        <div className="p-4 rounded-md  bg-background text-foreground">
          <RichTextContent
            converters={treatmentJsxConverter}
            data={selectedTreatment.infoViewContent}
            className="prose md:prose lg:prose xl:prose 2xl:prose [&_p]:text-base [&_h4]:text-lg"
          />
          <div className="flex items-center justify-center my-4">
            <Button asChild>
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
                    height={50}
                    width={50}
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
