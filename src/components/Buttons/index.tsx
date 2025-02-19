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
}

const Buttons: FC<ButtonsProps> = ({ data, className, containerClassName }) => {
  return (
    <div className={cn('flex items-center gap-2', containerClassName)}>
      {data?.map((button) => (
        <Link
          href={button.href}
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
