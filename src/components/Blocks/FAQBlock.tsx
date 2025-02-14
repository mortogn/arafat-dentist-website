import { FaqBlock } from '@/payload-types'
import React, { FC } from 'react'
import RichTextContent from '../RichTextContent'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

type Props = {
  data: FaqBlock
}

const FAQSection: FC<Props> = ({ data }) => {
  return (
    <div className="container py-12 space-y-3 not-prose">
      <h2 className="text-3xl text-center font-bold mb-6">{data.title}</h2>
      {data.description && <RichTextContent data={data.description} />}
      <Accordion type="single" collapsible className="w-full">
        {data.faq?.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="">
            <AccordionTrigger className="">{faq.question}</AccordionTrigger>
            <AccordionContent>
              <RichTextContent data={faq.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQSection
