import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header as HeaderData, Media } from '@/payload-types'
import Logo from '../logo'
import Navbar from './navbar'

import Buttons from '../buttons'

const Header = async () => {
  const headerData: HeaderData = await getCachedGlobal('header', 2)()

  console.log({ headerData })

  return (
    <header className="flex items-center justify-between h-[80px] py-4">
      <Logo
        src={(headerData.logo as Media).url!}
        alt={(headerData.logo as Media).alt}
        className="h-[75px]"
      />

      <Navbar data={headerData} />

      {headerData.buttons && <Buttons data={headerData.buttons} />}
    </header>
  )
}

export default Header
