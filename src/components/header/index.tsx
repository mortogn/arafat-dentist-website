import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header as HeaderData, Media } from '@/payload-types'
import Logo from '../Logo'
import Navbar from './navbar'

import Buttons from '../Buttons'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from 'next/link'

const Header = async () => {
  const headerData: HeaderData = await getCachedGlobal('header', 2)()

  return (
    <header className="">
      <MaxWidthWrapper className="flex items-center justify-between h-[80px] py-4">
        <Link href={'/'}>
          <Logo
            src={(headerData.logo as Media).url!}
            alt={(headerData.logo as Media).alt}
            className="h-[75px]"
          />
        </Link>

        <Navbar data={headerData} />

        {headerData.buttons && <Buttons data={headerData.buttons} />}
      </MaxWidthWrapper>
    </header>
  )
}

export default Header
