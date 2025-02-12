import { FaqBlock } from '@/payload-types'
import React, { FC } from 'react'
import RichTextContent from '../RichTextContent'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

type Props = {
  data: FaqBlock
}

const FAQSection: FC<Props> = ({ data }) => {
  return (
    <div className="container py-12">
      <h2 className="text-xl text-center font-bold mb-6">{data.title}</h2>
      {data.description && (
        <div className="mb-8">
          <RichTextContent data={data.description} />
        </div>
      )}
      <Accordion type="single" collapsible className="w-full">
        {data.faq?.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
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
