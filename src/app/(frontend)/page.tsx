import HeroSection from '@/components/Blocks/Hero'
import { BookingFormBlock, HeroBlock, TreatmentsBlock } from '@/payload-types'
import { getPageBySlug } from '@/utilities/getPageBySlug'
import { getLocale } from '@/utilities/locales'
import React from 'react'

export default async function Home() {
  const locale = await getLocale()

  console.log({ locale })

  const homePage = await getPageBySlug('home', 2, locale)

  return homePage.layout?.map((block) => renderer(block))
}

type Blocks = HeroBlock | BookingFormBlock | TreatmentsBlock

function renderer(block: Blocks) {
  switch (block.blockType) {
    case 'hero':
      return <HeroSection key={block.id} data={block} />

    default:
      return null
  }
}
