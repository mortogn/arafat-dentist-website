import { SectionBlock } from '@/payload-types'
import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import SectionTitle from '../SectionTitle'
import RichTextContent from '../RichTextContent'

type Props = {
  data: SectionBlock
}

const SectionBlockComponent: React.FC<Props> = ({ data }) => {
  return (
    <MaxWidthWrapper element="section" className="flex flex-col items-center my-10 md:my-20">
      <SectionTitle title={data.title} description={data.description} />

      <RichTextContent className="mt-8" data={data.content} />
    </MaxWidthWrapper>
  )
}

export default SectionBlockComponent
