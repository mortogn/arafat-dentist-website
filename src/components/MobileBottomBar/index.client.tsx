'use client'

import React, { FC, useEffect, useState } from 'react'
import ToothIcon from '../Icons/ToothIcon'
import { Link } from '@/i18n/routing'
import Icon from '../Icons/Icon'
import Image from 'next/image'
import { MapIcon } from 'lucide-react'

type Props = {
  phone?: string
  whatsApp?: string
  address?: string
}

const MobileBottomBarClient: FC<Props> = ({ phone, whatsApp }) => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total scrollable height
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      // Get current scroll position
      const currentScroll = window.scrollY
      // Calculate rotation (0 to 180 degrees)
      const newRotation = (currentScroll / totalHeight) * 360

      setRotation(newRotation)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial calculation
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed bottom-0 right-0 left-0 px-4 lg:hidden bg-primary text-primary-foreground flex items-center justify-between h-[65px] text-sm">
      <Link className="flex items-center flex-col gap-0.5" href={phone || '#'}>
        <Icon className="size-6" icon="phone" />
        <span>Phone</span>
      </Link>
      <Link className="flex items-center flex-col gap-0.5" href={whatsApp || '#'}>
        <Icon className="size-6 fill-white" icon="whatsapp" />
        <span>WhatsApp</span>
      </Link>
      <div></div>
      <Link href={'/'} className="absolute left-1/2  -translate-x-1/2">
        <div className="bg-primary p-3 rounded-full border-background border-4 -mt-[65px]">
          <ToothIcon
            className="fill-primary-foreground size-8"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>
      </Link>
      <Link className="flex items-center flex-col gap-0.5" href={'/treatments'}>
        <Image height={20} width={20} src={'/clinic.png'} alt="clinic" className="size-7 invert" />
        Treatments
      </Link>
      <Link className="flex items-center flex-col gap-0.5" href={`/about#location`}>
        <MapIcon className="size-6 " />
        <span>Address</span>
      </Link>
    </div>
  )
}

export default MobileBottomBarClient
