'use client'

import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { DrawerClose } from '@/components/ui/drawer'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
}

type MobileNavLinkWithoutChildrenProps = {
  data: {
    label: string
    href: string
  }
}

export const MobileNavLinkWithoutChildren: FC<MobileNavLinkWithoutChildrenProps> = ({ data }) => {
  return (
    <motion.div variants={itemVariants}>
      <DrawerClose asChild>
        <Link
          href={data.href}
          className={cn('block py-4 text-sm font-medium hover:text-primary transition-colors')}
        >
          {data.label}
        </Link>
      </DrawerClose>
    </motion.div>
  )
}
