import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedCollection } from '@/utilities/getCollection'
import React from 'react'

import type { Header, Header as HeaderData, Media, Treatment } from '@/payload-types'
import Logo from '../Logo'
import Navbar from './navbar'

import Buttons from '../Buttons'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from 'next/link'
import Topbar from './Topbar'
import MobileDrawer from './MobileDrawer'

type HeaderProps = {
  locale: 'en-US' | 'bn-BD'
}

const Header = async ({ locale }: HeaderProps) => {
  const [headerData, treatments] = await Promise.all([
    getCachedGlobal('header', 2, locale)() as Promise<HeaderData>,
    getCachedCollection({
      collection: 'treatments',
      locale,
      select: {
        title: true,
        description: true,
        slug: true,
      },
    })() as Promise<{ docs: Treatment[] }>,
  ])

  return (
    <>
      {headerData.topbar && <Topbar data={headerData.topbar} />}
      <header className="sticky top-0 bg-background z-10">
        <MaxWidthWrapper className="flex items-center justify-between h-[80px] py-4 ">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-1">
              <div className="lg:hidden">
                <MobileDrawer
                  data={headerData}
                  locale={locale}
                  treatments={treatments.docs as Treatment[]}
                />
              </div>
              <Link href={'/'}>
                <Logo
                  src={(headerData.logo as Media).url!}
                  alt={(headerData.logo as Media).alt}
                  className="h-[40px]"
                />
              </Link>
            </div>

            <div className="hidden lg:block">
              <Navbar data={headerData} locale={locale} />
            </div>
          </div>

          {headerData.buttons && <Buttons data={headerData.buttons} />}
        </MaxWidthWrapper>
      </header>
    </>
  )
}

export default Header
