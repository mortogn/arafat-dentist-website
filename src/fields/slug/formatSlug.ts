import { FieldHook } from 'payload'

export const formatSlug = (value: string) => {
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
