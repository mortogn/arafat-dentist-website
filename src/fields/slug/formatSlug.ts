import { FieldHook } from 'payload'

function isEnglishText(value: string): boolean {
  // Basic check that text contains only Latin letters, digits, spaces, dashes or underscores
  return /^[a-zA-Z0-9\s\-_]+$/.test(value)
}

export const formatSlug = (value: string) => {
  if (!isEnglishText(value)) {
    // If text is not English, skip transformation
    return value
  }
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
}

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ operation, data, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' && !data?.slug) {
      const fallbackData = data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }
  }
