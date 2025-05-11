import { BookingFormBlock, Treatment } from '@/payload-types'
import React, { FC } from 'react'
import ActualBookForm from './ActualBookForm'
import { getCachedCollection } from '@/utilities/getCollection'
import Media from '@/components/Media'

type BookingFormProps = {
  data: BookingFormBlock
  locale: 'en-US' | 'bn-BD'
}

const BookingForm: FC<BookingFormProps> = async ({ data, locale }) => {
  let treatments: Treatment[] = data.treatments as Treatment[]

  if (data.allTreatments) {
    const result = getCachedCollection({
      collection: 'treatments',
      locale,
      limit: 100,
      depth: 1,
      sort: '-sort',
      select: {
        title: true,
        slug: true,
      } as Partial<Record<keyof Treatment, true>>,
    })()
    treatments = (await result).docs as Treatment[]
  }

  return (
    <div className="flex items-stretch my-10 rounded-md border border-border overflow-hidden shadow-md min-h-[58rem]">
      <div className="w-full md:w-1/2 px-10 flex flex-col items-center justify-center gap-5 py-10">
        <div className="space-y-2 text-center max-w-[450px]">
          <h1 className="text-3xl font-medium tracking-tighter">{data.title}</h1>
          <p className="text-muted-foreground tracking-wide">{data.subtitle}</p>
        </div>
        <ActualBookForm treatments={treatments} />
      </div>

      <div className="relative w-1/2 hidden md:flex">
        <Media
          resource={data.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          className="object-cover"
          fill
          priority
        />
      </div>
    </div>
  )
}

export default BookingForm
