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
      where: {
        or: [
          {
            isNotListed: {
              equals: false,
            },
          },
          {
            isNotListed: {
              equals: undefined,
            },
          },
        ],
      },
      select: {
        title: true,
        slug: true,
        icon: true,
      } as Partial<Record<keyof Treatment, true>>,
    })()
    treatments = (await result).docs as Treatment[]
  }

  return (
    <section className="my-10 md:my-16">
      {/* Editorial banner: the image sets the mood, the title leads */}
      <div className="relative h-56 overflow-hidden rounded-2xl md:h-72">
        <Media
          resource={data.image}
          sizes="100vw"
          className="object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="max-w-2xl space-y-2">
            <h1 className="font-heading text-3xl tracking-tight md:text-5xl">{data.title}</h1>
            <p className="text-muted-foreground md:text-lg">{data.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Form card sits below the banner with breathing room */}
      <div className="relative z-10 mx-auto mt-6 max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm md:mt-8 md:p-10">
        <ActualBookForm treatments={treatments} />
      </div>
    </section>
  )
}

export default BookingForm
