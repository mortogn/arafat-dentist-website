import { TreatmentGridBlock } from '@/payload-types'
import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import SectionTitle from '../SectionTitle'
import Media from '../Media'
import { MoreHorizontalIcon } from 'lucide-react'
import { Locale } from '@/types'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'

type Props = {
  data: TreatmentGridBlock
  locale: Locale
}

const TreatmentGridBlockComponent: React.FC<Props> = async ({ data, locale }) => {
  const t = await getTranslations({ locale, namespace: 'TreatmentGridBlock' })

  return (
    <MaxWidthWrapper element="section" className="my-16">
      <SectionTitle title={data.title} description={data.description} />
      <div className="mt-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6 gap-1">
        {data.treatments &&
          data.treatments.map(
            (treatment) =>
              typeof treatment !== 'string' && (
                <Link
                  key={treatment.id}
                  href={`/treatments/${treatment.slug}`}
                  className="flex items-center border-2 border-primary/40 flex-col space-y-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Media
                    resource={treatment.icon}
                    height={200}
                    width={200}
                    className="size-12 lg:size-16"
                  />
                  <h3 className="text-base lg:text-xl font-body text-center">{treatment.title}</h3>
                </Link>
              ),
          )}
        {data.showMoreButton && (
          <Link
            href={'/treatments'}
            className="flex items-center flex-col space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <MoreHorizontalIcon className="size-12 lg:size-16" />
            <h3 className="text-base lg:text-xl font-body text-center">{t('showMore')}</h3>
          </Link>
        )}
      </div>
    </MaxWidthWrapper>
  )
}

export default TreatmentGridBlockComponent
