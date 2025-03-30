import { BookingFormBlock, Media, Treatment } from '@/payload-types'
import Image from 'next/image'
import React, { FC } from 'react'
import ActualBookForm from './ActualBookForm'
import { getCachedCollection } from '@/utilities/getCollection'

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
    <div className="flex items-center my-10 justify-between py-10 md:py-0 md:h-[58rem] rounded-md border border-border overflow-hidden shadow-md">
      <div className="w-full md:w-1/2 px-10 flex items-center flex-col justify-center gap-5">
        <div className="space-y-2  text-center max-w-[450px]">
          <h1 className="text-3xl font-medium tracking-tighter">{data.title}</h1>
          <p className="text-muted-foreground tracking-wide">{data.subtitle}</p>
        </div>
        <ActualBookForm treatments={treatments} />
      </div>

      <div className="relative h-full w-1/2 hidden md:block">
        <Image
          src={(data.image as Media).url!}
          alt={(data.image as Media).alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px): 50vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default BookingForm
