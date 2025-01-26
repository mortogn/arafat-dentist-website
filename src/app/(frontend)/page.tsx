import HeroSection from '@/components/Blocks/Hero'
import { BookingFormBlock, HeroBlock } from '@/payload-types'
import { getPageBySlug } from '@/utilities/getPageBySlug'
import React from 'react'

export default async function Home() {
  const homePage = await getPageBySlug('home', 2, 'en-US')

  return homePage.layout?.map((block) => renderer(block))
}

type Blocks = HeroBlock | BookingFormBlock

function renderer(block: Blocks) {
  switch (block.blockType) {
    case 'hero':
      return <HeroSection key={block.id} data={block} />
    default:
      return null
  }
}
