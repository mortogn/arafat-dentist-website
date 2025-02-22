import React from 'react'
import MobileBottomBarClient from './index.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Contacts } from '@/payload-types'

const MobileBottomBar = async () => {
  const { contacts } = (await getCachedGlobal('contacts', 1, 'en-US')()) as Contacts

  const phone = contacts?.find((contact) => contact.name === 'Phone')?.url
  const whatsApp = contacts?.find((contact) => contact.name === 'WhatsApp')?.url
  const address = contacts?.find((contact) => contact.name === 'Address')?.url

  return contacts && contacts ? (
    <MobileBottomBarClient phone={phone} whatsApp={whatsApp} address={address} />
  ) : null
}

export default MobileBottomBar
