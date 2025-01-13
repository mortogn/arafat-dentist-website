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
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
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
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <div>{data.label}</div>
        </NavigationMenuLink>
      </Link>
    </li>
  )
}

export default Navbar
