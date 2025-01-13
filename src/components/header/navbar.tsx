'use client'

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
import { Header } from '@/payload-types'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type NavbarProps = {
  data: Header
}

const Navbar: FC<NavbarProps> = ({ data }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {data.links.map((link) =>
          link.hasChildren ? (
            <NavLinkWithChildren key={link.id} data={link} />
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
}

const NavLinkWithChildren: FC<NavLinkWithChildrenProps> = ({ data }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{data.label}</NavigationMenuTrigger>
      <NavigationMenuContent className="">
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-2">
          {data?.children?.map((child) => <NavListItem key={child.id} data={child} />)}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

type NavLinkWithoutChildrenProps = {
  data: Header['links'][0]
}

const NavLinkWithoutChildren: FC<NavLinkWithoutChildrenProps> = ({ data }) => {
  return (
    <NavigationMenuItem>
      <Link href={data.href} passHref legacyBehavior>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <div>{data.label}</div>
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
          <div className="text-sm">{data.label}</div>
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
