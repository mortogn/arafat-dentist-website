import Media from '@/components/Media'
import type { Treatment, TreatmentInfoViewBlock } from '@/payload-types'
import { Locale } from '@/types'
import { getCachedCollection } from '@/utilities/getCollection'
import React from 'react'
import TreatmentInfoViewBlockClient from './index.client'

type Props = {
  data: TreatmentInfoViewBlock
  locale: Locale
}

const TreatmentInfoViewBlockComponent: React.FC<Props> = async ({ data, locale }) => {
  const treatments = await getCachedCollection({
    collection: 'treatments',
    locale,
    limit: 100,
    depth: 2,
    sort: '-sort',
    select: {
      title: true,
      slug: true,
      icon: true,
      doctors: true,
      infoViewContent: true,
    } as Partial<Record<keyof Treatment, true>>,
  })()

  return (
    <div className="min-h-[550px] mb-10 flex items-center justify-center relative py-8 px-2 lg:p-10">
      <Media
        resource={data.bgImage}
        fill
        className="absolute inset-0"
        priority
        quality={50}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="bg-green-100/50 backdrop-blur-md text-secondary-foreground w-full max-w-[600px] py-8 px-3  lg:p-10 rounded-md">
        <h2 className="text-center text-2xl font-medium mb-4 text-primary">{data.title}</h2>
        <TreatmentInfoViewBlockClient treatments={treatments.docs as Treatment[]} />
      </div>
    </div>
  )
}

export default TreatmentInfoViewBlockComponent
