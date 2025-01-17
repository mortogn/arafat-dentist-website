import BookingForm from '@/components/Blocks/BookingForm'
import { Page } from '@/payload-types'

type Params = NonNullable<Page['layout']>[0]

export function renderBookAppointmentPage(data: Params) {
  switch (data.blockType) {
    case 'booking-form':
      return <BookingForm data={data} key={data.id} />
    default:
      return null
  }
}
