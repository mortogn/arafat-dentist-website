'use client'
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface PopupContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handlePopupClose: () => void
  hasAlreadyClosedBefore: boolean
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
  const [open, setOpen] = useState(true)
  const [hasAlreadyClosedBefore, setHasAlreadyClosedBefore] = useState(false)

  const handlePopupClose = useCallback(() => {
    setHasAlreadyClosedBefore(true)
    setOpen(false)
  }, [])

  const value: PopupContextType = {
    open,
    handlePopupClose,
    setOpen,
    hasAlreadyClosedBefore,
  }

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
