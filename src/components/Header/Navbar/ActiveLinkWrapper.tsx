'use client'

import React, { FC, ReactNode } from 'react'
import { usePathname } from '@/i18n/routing'

type ActiveLinkWrapperProps = {
  paths: string[]
  children: (isActive: boolean) => ReactNode
}

const ActiveLinkWrapper: FC<ActiveLinkWrapperProps> = ({ paths, children }) => {
  const pathname = usePathname()

  // Check if any of the paths match the current pathname
  const isActive = paths.some((path) => {
    // Handle exact matches
    if (path === pathname) return true

    // Handle fragment URLs
    const [pathBase, pathFragment] = path.split('#')
    const [currentPathBase, currentFragment] = pathname.split('#')

    if (
      pathFragment &&
      currentFragment &&
      pathBase === currentPathBase &&
      pathFragment === currentFragment
    ) {
      return true
    }

    // Handle parent paths (e.g. /treatments is active when viewing /treatments/dental-implants)
    if (path !== '/' && pathname.startsWith(path + '/')) {
      return true
    }

    return false
  })

  return <>{children(isActive)}</>
}

export default ActiveLinkWrapper
