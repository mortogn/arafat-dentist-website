import { TreatmentGridBlock } from '@/payload-types'
import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import SectionTitle from '../SectionTitle'
import Media from '../Media'
import { MoreHorizontalIcon } from 'lucide-react'
import { Locale } from '@/types'
import { getTranslations } from 'next-intl/server'

type Props = {
  data: TreatmentGridBlock
  locale: Locale
}

const TreatmentGridBlockComponent: React.FC<Props> = async ({ data, locale }) => {
  const t = await getTranslations({ locale, namespace: 'TreatmentGridBlock' })

  return (
    <MaxWidthWrapper element="section" className="my-16">
      <SectionTitle title={data.title} description={data.description} />
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.treatments &&
          data.treatments.map(
            (treatment) =>
              typeof treatment !== 'string' && (
                <div
                  key={treatment.id}
                  className="flex items-center flex-col space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <Media resource={treatment.icon} height={200} width={200} className="size-16" />
                  <h3 className="text-xl font-body text-center">{treatment.title}</h3>
                </div>
              ),
          )}
        {data.showMoreButton && (
          <div className="flex items-center flex-col space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <MoreHorizontalIcon className="size-16" />
            <h3 className="text-xl font-body text-center">{t('showMore')}</h3>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  )
}

export default TreatmentGridBlockComponent
