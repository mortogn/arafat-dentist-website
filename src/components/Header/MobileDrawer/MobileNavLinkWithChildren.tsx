'use client'

import React, { FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Header, Treatment } from '@/payload-types'
import { Locale } from '@/types'
import { MobileNavListItem } from './MobileNavListItem'

// Animation variants
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

const childrenVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
}

type MobileNavLinkWithChildrenProps = {
  data: Header['links'][0]
  locale: Locale
  treatments?: Treatment[] | null
}

export const MobileNavLinkWithChildren: FC<MobileNavLinkWithChildrenProps> = ({
  data,
  treatments,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div variants={itemVariants}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-sm font-medium"
      >
        {data.label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={childrenVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="pb-4 pl-4 flex flex-col space-y-2"
          >
            {data.showTreatments && treatments && treatments.length > 0
              ? treatments.map((treatment) => (
                  <motion.div key={treatment.id} variants={itemVariants}>
                    <MobileNavListItem
                      data={{
                        label: treatment.title,
                        href: `/treatments/${treatment.slug}`,
                        description: treatment.description,
                      }}
                    />
                  </motion.div>
                ))
              : data?.children?.map((child) => (
                  <motion.div key={child.id} variants={itemVariants}>
                    <MobileNavListItem data={child} />
                  </motion.div>
                ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
