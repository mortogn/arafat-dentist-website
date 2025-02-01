import { getCookie, setCookie } from 'cookies-next'

type LocaleType = 'en-US' | 'bn-BD'

export function getLocale(): LocaleType | Promise<LocaleType> {
  const cookie = getCookie('locale')

  console.log({ cookie })

  if (cookie !== 'en-US' && cookie !== 'bn-BD') {
    return 'en-US'
  }

  return cookie
}

export function setLocale(locale: LocaleType) {
  if (locale === 'bn-BD' || locale === 'en-US') {
    return setCookie('locale', locale)
  }

  return setCookie('locale', 'en-US', {
    // expire after 10 years
    maxAge: 60 * 60 * 24 * 365 * 10,
  })
}
