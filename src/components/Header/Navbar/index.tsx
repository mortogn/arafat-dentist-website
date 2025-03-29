import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu'

import { FC, Suspense } from 'react'
import NavLinkWithChildren from './NavLinkWithChildren'
import NavLinkWithoutChildren from './NavLinkWithoutChildren'
import { Header } from '@/payload-types'
import { Locale } from '@/types'

type NavbarProps = {
  data: Header
  locale: Locale
}

const Navbar: FC<NavbarProps> = ({ data, locale }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {data.links.map((link) =>
          link.hasChildren || link.showTreatments ? (
            <NavLinkWithChildren key={link.id} data={link} locale={locale} />
          ) : (
            <Suspense key={link.id}>
              <NavLinkWithoutChildren data={link} />
            </Suspense>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar
