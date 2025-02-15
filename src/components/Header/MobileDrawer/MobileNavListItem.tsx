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

type MobileNavListItemProps = {
  data: {
    label: string
    href: string
    description?: string | null
  }
}

export const MobileNavListItem: FC<MobileNavListItemProps> = ({ data }) => {
  return (
    <motion.div variants={itemVariants}>
      <DrawerClose asChild>
        <Link
          href={data.href}
          className={cn(
            'block rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors',
          )}
        >
          <div className="font-medium">{data.label}</div>
          {data.description && (
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{data.description}</p>
          )}
        </Link>
      </DrawerClose>
    </motion.div>
  )
}
