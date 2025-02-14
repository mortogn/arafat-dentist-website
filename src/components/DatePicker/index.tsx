import React, { FC, ReactNode } from 'react'
import { Calendar, CalendarProps } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'

type Props = {
  calenderProps: CalendarProps
  placeholder?: ReactNode
}

const DatePicker: FC<Props> = ({ calenderProps, placeholder }) => {
  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 10)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full text-left justify-start">
          <CalendarIcon className="size-4 mr-2" />
          {placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          disabled={(date) => date < today || date > maxDate}
          {...calenderProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
