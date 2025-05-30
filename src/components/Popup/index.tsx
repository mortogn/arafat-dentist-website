import { Locale } from '@/types'
import { getCachedCollection } from '@/utilities/getCollection'
import React from 'react'
import PopupClient from './index.client'
import { type Popup as PopupType } from '@/payload-types'

type Props = {
  locale: Locale
}

const Popup = async ({ locale }: Props) => {
  const popups = await fetchPopup(locale)

  if (!popups) {
    return null
  }

  return <PopupClient popups={popups} />
}

export default Popup

const fetchPopup = async (locale: Locale) => {
  const collection = await getCachedCollection({
    collection: 'popup',
    locale: locale,
    sort: '-createdAt',
    depth: 1,
  })()

  if (collection.docs.length === 0) {
    return null
  }

  return collection.docs as PopupType[]
}
