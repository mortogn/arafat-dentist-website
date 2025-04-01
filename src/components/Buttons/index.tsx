import React, { FC } from 'react'
import { ButtonsField } from '@/payload-types'
import { Link } from '@/i18n/routing'
import { buttonVariants } from '../ui/button'
import { sizeMapper } from './sizeMapper'
import { cn } from '@/lib/utils'
import Icon from '../Icons/Icon'

type Variant = NonNullable<ButtonsField>[0]['variant']
type Size = NonNullable<ButtonsField>[0]['size']

type ButtonsProps = {
  data: ButtonsField
  className?: (params: { variant: Variant; size: Size }) => string
  containerClassName?: string
  context?: string
}

const Buttons: FC<ButtonsProps> = ({ data, className, containerClassName, context }) => {
  return (
    <div className={cn('flex items-center gap-2', containerClassName)}>
      {data?.map((button) => (
        <Link
          href={button.href}
          data-umami-event={`${button.label} button`}
          data-umami-event-id={button.id}
          data-umami-event-type="button"
          data-umami-event-url={button.href}
          data-umami-event-context={context}
          key={button.id}
          className={cn(
            buttonVariants({ variant: button.variant, size: sizeMapper(button.size) }),
            className?.({ variant: button.variant, size: button.size }),
          )}
        >
          {button.icon && button.icon !== 'none' && <Icon className="" icon={button.icon} />}
          {button.label}
        </Link>
      ))}
    </div>
  )
}

export default Buttons
