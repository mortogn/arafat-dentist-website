'use client'

import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
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
  onClose: () => void
}

export const MobileNavListItem: FC<MobileNavListItemProps> = ({ data, onClose }) => {
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={data.href}
        className={cn(
          'block rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors',
        )}
        onClick={onClose}
      >
        <div className="font-medium">{data.label}</div>
        {data.description && (
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{data.description}</p>
        )}
      </Link>
    </motion.div>
  )
}
