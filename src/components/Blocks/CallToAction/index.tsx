import Buttons from '@/components/Buttons'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RichTextContent from '@/components/RichTextContent'
import Heading from '@/components/Typography/Heading'
import { CallToActionBlock } from '@/payload-types'
import React, { FC } from 'react'

type Props = {
  data: CallToActionBlock
}

const CallToAction: FC<Props> = ({ data }) => {
  return (
    <div className="bg-primary text-primary-foreground py-10">
      <MaxWidthWrapper element="section" className="text-center flex flex-col items-center gap-4">
        <Heading as="h3">{data.title}</Heading>
        <RichTextContent data={data.description} />

        {data.buttons && data.buttons.length > 0 && (
          <Buttons containerClassName={'flex-col lg:flex-row'} data={data.buttons} />
        )}
      </MaxWidthWrapper>
    </div>
  )
}

export default CallToAction
