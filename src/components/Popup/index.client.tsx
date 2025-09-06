'use client'

import { Popup } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { usePathname } from '@/i18n/routing'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import Slider from './Slider'
import { isValidUrl } from '@/utilities/validateURL'

type Props = {
  popups: Popup[]
}

const HIDDEN_POPUPS_KEY = 'hidden-popups'
const HIDDEN_POPUP_PATHS = ['/appointments', '/not-found']

const PopupClient = ({ popups }: Props) => {
  const [open, setOpen] = useState(false)
  const [filteredPopups, setFilteredPopups] = useState<Popup[]>([])
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  // Ensure client-side only rendering to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

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

    // Filter out popups that the user has chosen not to see again
    const hiddenPopupIds = getHiddenPopupIds()

    // Filter out popups with invalid URLs and hidden popups
    const validPopups = popups.filter((popup) => {
      const isNotHidden = !hiddenPopupIds.includes(popup.id)
      const hasValidUrl = popup.url && isValidUrl(popup.url)
      return isNotHidden && hasValidUrl
    })

    setFilteredPopups(validPopups)

    // Check if we should show popups on this page
    const shouldShowPopups =
      !HIDDEN_POPUP_PATHS.some((path) => pathname.includes(path)) &&
      !pathname.includes('not-found') &&
      validPopups.length > 0

    if (shouldShowPopups) {
      // Add a small delay to prevent immediate opening which might cause issues
      const timer = setTimeout(() => {
        setOpen(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [popups, pathname, isClient])

  const handleHidePopup = (popupId: string) => {
    if (!isClient || typeof window === 'undefined') return

    try {
      const savedIds = localStorage.getItem(HIDDEN_POPUPS_KEY)
      const hiddenPopupIds = savedIds ? JSON.parse(savedIds) : []
      const updatedHiddenIds = [...hiddenPopupIds, popupId]
      localStorage.setItem(HIDDEN_POPUPS_KEY, JSON.stringify(updatedHiddenIds))

      // Update the filtered popups
      setFilteredPopups((prev) => prev.filter((popup) => popup.id !== popupId))
    } catch (error) {
      console.error('Error saving hidden popup to localStorage:', error)
    }
  }

  // Don't render anything if not on client or no popups to show
  if (!isClient || filteredPopups.length === 0) {
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
