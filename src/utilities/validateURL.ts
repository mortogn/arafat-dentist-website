/**
 * Validates whether a given value is a valid URL or pathname.
 *
 * @param value - The string to validate. Can be a URL, pathname, or undefined/null.
 * @returns {boolean | string} Returns true if valid, or an error message string if invalid.
 *                            The error message suggests the correct format for URLs and pathnames.
 *
 * @example
 * // Returns true
 * validateURL('https://example.com')
 * validateURL('/about')
 *
 * // Returns error message
 * validateURL('invalid-url')
 * validateURL(null)
 */
export function validateURL(value?: string | string[] | null) {
  if (typeof value !== 'string')
    return 'Please enter a valid URL (e.g., https://example.com) or pathname (e.g., /about)'

  try {
    new URL(value)
    return true
  } catch {
    if (value.startsWith('/') && /^\/[\w-/#]*$/.test(value)) {
      return true
    }
    return 'Please enter a valid URL (e.g., https://example.com) or pathname (e.g., /about)'
  }
}

export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false

  try {
    // Check if it's a relative path (starts with /)
    if (url.startsWith('/')) {
      return url.length > 1 && !url.includes('..') && !/\s/.test(url)
    }

    // Check if it's a valid absolute URL
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const isInternalUrl = (url: string): boolean => {
  if (url.startsWith('/')) return true

  try {
    const urlObj = new URL(url)
    const currentDomain = typeof window !== 'undefined' ? window.location.hostname : ''
    return urlObj.hostname === currentDomain
  } catch {
    return false
  }
}
