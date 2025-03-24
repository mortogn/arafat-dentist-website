'use client'

import React, { FC } from 'react'
import { motion } from 'framer-motion'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Header, Treatment } from '@/payload-types'
import { Locale } from '@/types'
import { MobileNavLinkWithChildren } from './MobileNavLinkWithChildren'
import { MobileNavLinkWithoutChildren } from './MobileNavLinkWithoutChildren'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

type MobileDrawerProps = {
  data: Header
  locale: Locale
  treatments?: Treatment[] | null
}

const MobileDrawer: FC<MobileDrawerProps> = ({ data, locale, treatments }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className=" [&_svg]:size-8">
          <Menu className="size-8" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] flex flex-col">
        <DrawerHeader className="flex-shrink-0">
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <motion.div
            className="px-4 pb-8 flex flex-col divide-y"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {data.links.map((link) =>
              link.hasChildren || link.showTreatments ? (
                <MobileNavLinkWithChildren
                  key={link.id}
                  data={link}
                  locale={locale}
                  treatments={treatments}
                />
              ) : (
                <MobileNavLinkWithoutChildren key={link.id} data={link} />
              ),
            )}
          </motion.div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileDrawer
