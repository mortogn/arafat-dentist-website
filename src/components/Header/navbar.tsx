import React, { FC } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { Header, Treatment } from '@/payload-types'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { getCachedCollection } from '@/utilities/getCollection'
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
            <NavLinkWithoutChildren key={link.id} data={link} />
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

type NavLinkWithChildrenProps = {
  data: Header['links'][0]
  locale: Locale
}

const NavLinkWithChildren: FC<NavLinkWithChildrenProps> = async ({ data, locale }) => {
  let treatments: Treatment[] | null = null

  if (data.showTreatments) {
    const result = await getCachedCollection({
      collection: 'treatments',
      locale,
      select: {
        title: true,
        description: true,
        slug: true,
      } as Partial<Record<keyof Treatment, true>>,
    })()

    treatments = (result.docs as Treatment[]) || null
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Link href={data.href} className="bn:text-base">
          {data.label}
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="">
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-2">
          {data.showTreatments && treatments && treatments.length > 0
            ? treatments.map((treatment) => (
                <NavListItem
                  key={treatment.id}
                  data={{
                    label: treatment.title,
                    href: `/treatments/${treatment.slug}`,
                    description: treatment.description,
                  }}
                />
              ))
            : data?.children?.map((child) => <NavListItem key={child.id} data={child} />)}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

type NavLinkWithoutChildrenProps = {
  data: {
    label: string
    href: string
  }
}

const NavLinkWithoutChildren: FC<NavLinkWithoutChildrenProps> = ({ data }) => {
  return (
    <NavigationMenuItem>
      <Link href={data.href} passHref legacyBehavior>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <div className="bn:text-base">{data.label}</div>
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

type NavListItemProps = {
  data: NonNullable<Header['links'][0]['children']>[0]
}

const NavListItem: FC<NavListItemProps> = ({ data }) => {
  return (
    <li>
      <Link href={data.href} passHref legacyBehavior>
        <NavigationMenuLink
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          )}
        >
          <div className="text-sm bn:text-base bn:font-medium">{data.label}</div>
          {data.description && (
            <p className="text-muted-foreground text-wrap line-clamp-2 text-sm tracking-wide">
              {data.description}
            </p>
          )}
        </NavigationMenuLink>
      </Link>
    </li>
  )
}

export default Navbar
