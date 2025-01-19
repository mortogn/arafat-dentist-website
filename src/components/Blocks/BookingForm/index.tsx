import { BookingFormBlock, Media, Treatment } from '@/payload-types'
import Image from 'next/image'
import React, { FC } from 'react'
import ActualBookForm from './ActualBookForm'

type BookingFormProps = {
  data: BookingFormBlock
}

const BookingForm: FC<BookingFormProps> = ({ data }) => {
  return (
    <div className="flex items-center my-10 justify-between h-[58rem] rounded-md border border-border overflow-hidden shadow-md">
      <div className="w-1/2 px-10 flex items-center flex-col justify-center gap-5">
        <div className="space-y-2  text-center max-w-[450px]">
          <h1 className="text-3xl font-medium tracking-tighter">{data.title}</h1>
          <p className="text-muted-foreground tracking-wide">{data.subtitle}</p>
        </div>
        <ActualBookForm treatments={data.treatments as Treatment[]} />
      </div>

      <div className="relative h-full  w-1/2">
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
