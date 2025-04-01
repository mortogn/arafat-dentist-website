import { Treatment } from '@/payload-types'
import { getCachedCollection } from '@/utilities/getCollection'
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'

import { Link } from '@/i18n/routing'
import { FC } from 'react'
import Header from '..'
import NavListItem from './NavListItem'
import { Locale } from '@/types'

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
      limit: 100,
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

export default NavLinkWithChildren
