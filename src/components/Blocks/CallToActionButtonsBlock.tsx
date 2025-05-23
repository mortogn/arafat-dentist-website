import { CallToActionButtonsBlock } from '@/payload-types'
import React, { FC } from 'react'
import { Button } from '../ui/button'
import { Link } from '@/i18n/routing'
import Media from '../Media'

type Props = {
  data: CallToActionButtonsBlock
}

const CallToActionButtonsBlockComponent: FC<Props> = ({ data }) => {
  return (
    <div className="flex items-center gap-3 flex-col md:flex-row not-prose">
      {data.buttons?.map((button) => (
        <Button
          asChild
          key={button.id}
          style={{ backgroundColor: button.color.bgColor, color: button.color.textColor }}
          className="flex-1 text-base md:text-lg h-16 shrink-0 space-x-2 w-full"
        >
          <Link href={button.url}>
            {button.icon && (
              <Media resource={button.icon} height={30} width={30} className="size-5 md:size-7" />
            )}
            {button.label}
          </Link>
        </Button>
      ))}
    </div>
  )
}

export default CallToActionButtonsBlockComponent
