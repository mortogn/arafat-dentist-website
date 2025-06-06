'use client'

import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useIsActive } from '@/hooks/useIsActive'

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
  const isActive = useIsActive()

  return (
    <motion.div variants={itemVariants}>
      <Link
        href={data.href}
        className={cn(
          'block py-4 px-6 text-sm font-medium transition-colors',
          isActive(data.href, true)
            ? 'bg-primary text-primary-foreground font-semibold'
            : 'hover:text-primary',
        )}
        onClick={onClose}
      >
        {data.label}
      </Link>
    </motion.div>
  )
}
