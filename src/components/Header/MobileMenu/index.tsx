'use client'

import React, { FC, useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { Header, Treatment } from '@/payload-types'
import { Locale } from '@/types'
import { MobileNavLinkWithChildren } from './MobileNavLinkWithChildren'
import { MobileNavLinkWithoutChildren } from './MobileNavLinkWithoutChildren'
import { Button } from '@/components/ui/button'

// Animation variants
const menuVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

type MobileMenuProps = {
  data: Header
  locale: Locale
  treatments?: Treatment[] | null
}

const MobileMenu: FC<MobileMenuProps> = ({ data, locale, treatments }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [menuPosition, setMenuPosition] = useState(0)

  // Update menu position when opened or on resize
  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const headerRect = containerRef.current.closest('header')?.getBoundingClientRect()
        if (headerRect) {
          // Get the bottom position of the header relative to viewport
          setMenuPosition(headerRect.bottom)
        }
      }
    }

    if (isOpen) {
      updatePosition()
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition)
    }

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    }
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className="relative z-10" ref={containerRef}>
      <Button
        variant="ghost"
        size="icon"
        className="[&_svg]:size-8"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="size-8" /> : <Menu className="size-8" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay that starts below the header */}
            <motion.div
              className="fixed left-0 right-0 bottom-0"
              style={{
                top: `${menuPosition}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed left-0 right-0 w-full bg-white shadow-lg max-h-[65vh] overflow-y-auto z-10"
              style={{
                top: `${menuPosition}px`,
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              <div className="h-full max-h-[inherit] overflow-y-auto">
                <div className="px-6 py-8 flex flex-col divide-y">
                  {data.links.map((link) =>
                    link.hasChildren || link.showTreatments ? (
                      <MobileNavLinkWithChildren
                        key={link.id}
                        data={link}
                        locale={locale}
                        treatments={treatments}
                        onClose={() => setIsOpen(false)}
                      />
                    ) : (
                      <MobileNavLinkWithoutChildren
                        key={link.id}
                        data={link}
                        onClose={() => setIsOpen(false)}
                      />
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileMenu
