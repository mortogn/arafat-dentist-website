'use client'

import { Popup } from '@/payload-types'
import React, { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import Slider from './Slider'

type Props = {
  popups: Popup[]
}

const PopupClient = ({ popups }: Props) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [setOpen])

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
          <Slider popups={popups} setDialogOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PopupClient
