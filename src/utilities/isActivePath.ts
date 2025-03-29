// Helper to check if a path is active (including handling URL fragments)
export const isActivePath = (
  currentPath: string,
  href: string,
  exact: boolean = false,
): boolean => {
  // Handle fragment URLs
  const [currentPathBase, currentFragment] = currentPath.split('#')
  const [linkPathBase, linkFragment] = href.split('#')

  // If current URL has a fragment but the link doesn't have any fragment
  // or has a different fragment, the link shouldn't be active
  if (currentFragment && (!linkFragment || currentFragment !== linkFragment)) {
    return false
  }

  // For links with fragments, both the path and fragment must match
  if (linkFragment) {
    // If the link has a fragment, but current path doesn't, it's not active
    if (!currentFragment) {
      return false
    }

    // Check both base path and fragment match
    return currentPathBase === linkPathBase && linkFragment === currentFragment
  }

  // For exact matches we need perfect equality of the base path
  if (exact) {
    return currentPathBase === linkPathBase
  }

  // For non-exact matches, check if the current path starts with the link path
  // But ensure we're not matching partial segments (e.g. /about should not match /about-us)
  if (currentPathBase === linkPathBase) {
    return true
  }

  // Check if it's a parent path (e.g. /treatments is active when viewing /treatments/dental-implants)
  if (linkPathBase !== '/' && currentPathBase.startsWith(linkPathBase + '/')) {
    return true
  }

  return false
}
