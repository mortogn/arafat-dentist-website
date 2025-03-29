import { usePathname } from '@/i18n/routing'
import { isActivePath } from '@/utilities/isActivePath'
import { useEffect, useState } from 'react'

// Custom hook to check if a link is active including hash fragments
export function useIsActive() {
  const pathname = usePathname()
  const [fullPath, setFullPath] = useState<string>(pathname)

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
    if (typeof window !== 'undefined' && window.MutationObserver) {
      const observer = new MutationObserver(() => {
        // Check if URL has changed
        if (window.location.pathname === pathname) {
          updateFullPath()
        }
      })

      // Observe changes to the URL by watching the document title
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
  }, [pathname])

  return (href: string, exact: boolean = false) => isActivePath(fullPath, href, exact)
}
