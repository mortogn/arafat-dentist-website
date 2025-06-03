'use client'

import { Popup } from '@/payload-types'
import React, { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import Slider from './Slider'
import { usePathname } from '@/i18n/routing'

type Props = {
  popups: Popup[]
}

const HIDDEN_POPUPS_KEY = 'hidden-popups'
const HIDDEN_POPUP_PATHS = ['/appointments']

const PopupClient = ({ popups }: Props) => {
  const [open, setOpen] = useState(false)
  const [filteredPopups, setFilteredPopups] = useState<Popup[]>([])
  const pathname = usePathname()

  useEffect(() => {
    // Filter out popups that the user has chosen not to see again
    const hiddenPopupIds = getHiddenPopupIds()
    const visiblePopups = popups.filter((popup) => !hiddenPopupIds.includes(popup.id))

    setFilteredPopups(visiblePopups)

    // Only open the dialog if there are popups to show
    if (visiblePopups.length > 0 && !HIDDEN_POPUP_PATHS.includes(pathname)) {
      setOpen(true)
    }
  }, [popups, pathname])

  const getHiddenPopupIds = (): string[] => {
    if (typeof window === 'undefined') return []

    try {
      const savedIds = localStorage.getItem(HIDDEN_POPUPS_KEY)
      return savedIds ? JSON.parse(savedIds) : []
    } catch (error) {
      console.error('Error getting hidden popups from localStorage:', error)
      return []
    }
  }

  const handleHidePopup = (popupId: string) => {
    try {
      const hiddenPopupIds = getHiddenPopupIds()
      const updatedHiddenIds = [...hiddenPopupIds, popupId]
      localStorage.setItem(HIDDEN_POPUPS_KEY, JSON.stringify(updatedHiddenIds))

      // Update the filtered popups
      setFilteredPopups((prev) => prev.filter((popup) => popup.id !== popupId))
    } catch (error) {
      console.error('Error saving hidden popup to localStorage:', error)
    }
  }

  // Don't render anything if there are no popups to show
  if (filteredPopups.length === 0) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader>
        <DialogTitle className="sr-only">Promotional Popup</DialogTitle>
        <DialogDescription className="sr-only">
          Promotional content that can be displayed to users. Click on the image to visit the linked
          page.
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        <div className="mt-4">
          <Slider popups={filteredPopups} setDialogOpen={setOpen} onHidePopup={handleHidePopup} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PopupClient
