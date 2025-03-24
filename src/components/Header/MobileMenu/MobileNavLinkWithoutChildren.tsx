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

type MobileNavLinkWithoutChildrenProps = {
  data: {
    label: string
    href: string
  }
  onClose: () => void
}

export const MobileNavLinkWithoutChildren: FC<MobileNavLinkWithoutChildrenProps> = ({
  data,
  onClose,
}) => {
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={data.href}
        className={cn('block py-4 text-sm font-medium hover:text-primary transition-colors')}
        onClick={onClose}
      >
        {data.label}
      </Link>
    </motion.div>
  )
}
