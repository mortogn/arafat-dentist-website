import { CheckListBlock } from '@/payload-types'
import { CheckIcon } from 'lucide-react'
import React, { FC } from 'react'
import RichTextContent from '../RichTextContent'
import { cn } from '@/lib/utils'

type Props = {
  data: CheckListBlock
}

const CheckListBlockComponent: FC<Props> = ({ data }) => {
  return (
    <div
      className={cn('w-full not-prose max-w-[80%] ', {
        'ml-0 max-w-[80%]': data.alignment === 'left',
        'mx-auto w-max': data.alignment === 'center',
      })}
    >
      {data.checklist && (
        <ul
          className={cn({
            '-ml-4 md:ml-5': data.size === 'small',
            '-ml-5 md:ml-6': data.size === 'medium',
            '-ml-6 md:ml-7': data.size === 'large',
          })}
        >
          {data.checklist.map((item, index) => (
            <li key={index} className={cn('flex items-start gap-2 overflow-visible')}>
              <CheckIcon
                className={cn('flex-shrink-0 text-green-600 mt-1', {
                  'size-4 md:size-5': data.size === 'small',
                  'size-5 md:size-6': data.size === 'medium',
                  'size-6 md:size-7': data.size === 'large',
                })}
              />

              <div className="min-w-0 flex-1 overflow-visible">
                {item.label && (
                  <RichTextContent
                    className="break-words hyphens-auto max-w-full whitespace-normal overflow-visible"
                    data={item.label}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CheckListBlockComponent
