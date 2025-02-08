import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header as HeaderData, Media, Socials } from '@/payload-types'
import Logo from '../Logo'
import Navbar from './navbar'

import Buttons from '../Buttons'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from 'next/link'
import Topbar from './Topbar'

type HeaderProps = {
  locale: 'en-US' | 'bn-BD'
}

const Header = async ({ locale }: HeaderProps) => {
  //@ts-expect-error - This is the correct header header data
  const headerData: HeaderData & {
    topbar: HeaderData['topbar'] & { socials?: Socials['socials'] }
  } = await getCachedGlobal('header', 2, locale)()

  return (
    <>
      {headerData.topbar && <Topbar data={headerData.topbar} />}
      <header className="">
        <MaxWidthWrapper className="flex items-center justify-between h-[80px] py-4">
          <div className="flex items-center gap-10">
            <Link href={'/'}>
              <Logo
                src={(headerData.logo as Media).url!}
                alt={(headerData.logo as Media).alt}
                className="h-[40px]"
              />
            </Link>

            <div className="hidden lg:block">
              <Navbar data={headerData} />
            </div>
          </div>

          {headerData.buttons && <Buttons data={headerData.buttons} />}
        </MaxWidthWrapper>
      </header>
    </>
  )
}

export default Header
