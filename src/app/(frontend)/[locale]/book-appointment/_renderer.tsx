import BookingForm from '@/components/Blocks/BookingForm'
import { Page } from '@/payload-types'
import { Locale } from '@/types'

type Params = NonNullable<Page['layout']>[0]

export function renderBookAppointmentPage(data: Params, locale: Locale) {
  switch (data.blockType) {
    case 'booking-form':
      return <BookingForm data={data} key={data.id} locale={locale} />
    default:
      return null
  }
}
