'use client'

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface PopupContextType {
  shownPopupIds: string[]
  markPopupAsShown: (popupId: string) => void
  markPopupsAsShown: (popupIds: string[]) => void
  hasPopupBeenShown: (popupId: string) => boolean
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export const usePopupContext = () => {
  const context = useContext(PopupContext)
  if (!context) {
    throw new Error('usePopupContext must be used within a PopupProvider')
  }
  return context
}

interface PopupProviderProps {
  children: ReactNode
}

export const PopupProvider = ({ children }: PopupProviderProps) => {
  const [shownPopupIds, setShownPopupIds] = useState<string[]>([])

  const markPopupAsShown = useCallback((popupId: string) => {
    setShownPopupIds((prev) => {
      if (prev.includes(popupId)) return prev
      return [...prev, popupId]
    })
  }, [])

  const markPopupsAsShown = useCallback((popupIds: string[]) => {
    setShownPopupIds((prev) => {
      const newIds = popupIds.filter((id) => !prev.includes(id))
      if (newIds.length === 0) return prev
      return [...prev, ...newIds]
    })
  }, [])

  const hasPopupBeenShown = useCallback((popupId: string) => {
    return shownPopupIds.includes(popupId)
  }, [shownPopupIds])

  const value: PopupContextType = {
    shownPopupIds,
    markPopupAsShown,
    markPopupsAsShown,
    hasPopupBeenShown,
  }

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
