'use client'

import { cn } from '@/lib/utils'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Link, usePathname } from '@/i18n/routing'
import { FC } from 'react'
import Header from '..'
import { isActivePath } from '@/utilities/isActivePath'

type NavListItemProps = {
  data: NonNullable<Header['links'][0]['children']>[0]
}

const NavListItem: FC<NavListItemProps> = ({ data }) => {
  const pathname = usePathname()

  return (
    <li>
      <Link href={data.href} passHref legacyBehavior>
        <NavigationMenuLink
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            {
              'bg-primary text-primary-foreground': isActivePath(pathname, data.href, true),
            },
          )}
        >
          <div className="text-sm bn:text-base bn:font-medium">{data.label}</div>
          {data.description && (
            <p
              className={cn('text-muted-foreground text-wrap line-clamp-2 text-sm tracking-wide', {
                'text-primary-foreground/80': isActivePath(pathname, data.href, true),
              })}
            >
              {data.description}
            </p>
          )}
        </NavigationMenuLink>
      </Link>
    </li>
  )
}

export default NavListItem
