'use client'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { FC, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { isActivePath } from '@/utilities/isActivePath'
import { useSearchParams } from 'next/navigation'

type NavLinkWithoutChildrenProps = {
  data: {
    label: string
    href: string
  }
}

const NavLinkWithoutChildren: FC<NavLinkWithoutChildrenProps> = ({ data }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [fullPath, setFullPath] = useState<string>(pathname)

  // This effect will run on mount and whenever pathname or router events change
  useEffect(() => {
    // Function to update the full path with hash
    const updateFullPath = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash
        setFullPath(`${pathname}${hash}`)
      }
    }

    // Initial update
    updateFullPath()

    // Set up MutationObserver to detect URL changes including hash changes
    // This is more reliable than hashchange for detecting fragment changes in Next.js
    if (typeof window !== 'undefined' && window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        // Check if URL has changed
        if (window.location.pathname === pathname) {
          updateFullPath()
        }
      })

      // Observe changes to the URL by watching the document title
      // (Next.js often updates the title when navigating)
      observer.observe(document.head, {
        subtree: true,
        childList: true,
        characterData: true,
      })

      return () => observer.disconnect()
    }

    // Also listen for standard hashchange events as a fallback
    window.addEventListener('hashchange', updateFullPath)
    return () => window.removeEventListener('hashchange', updateFullPath)
  }, [pathname, searchParams])

  return (
    <NavigationMenuItem>
      <Link href={data.href} passHref legacyBehavior>
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), {
            'bg-primary text-primary-foreground': isActivePath(fullPath, data.href, true),
          })}
        >
          <div className="bn:text-base">{data.label}</div>
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

export default NavLinkWithoutChildren
