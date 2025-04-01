import React, { FC } from 'react'
import EmbeddedMap from '../EmbeddedMap'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { Contacts, LocationBlock } from '@/payload-types'
import { Locale } from '@/types'
import Link from 'next/link'
import Icon from '../Icons/Icon'

import SectionTitle from '../SectionTitle'
import { getTranslations } from 'next-intl/server'
import Heading from '../Typography/Heading'
import Media from '../Media'

type Props = {
  locale: Locale
  data: LocationBlock
}

const LocationBlockComponent: FC<Props> = async ({ data, locale }) => {
  const { contacts } = (await getCachedGlobal('contacts', 1, locale)()) as Contacts

  const t = await getTranslations({ locale, namespace: 'LocationBlock' })

  return (
    <MaxWidthWrapper id="location" element="section" className="my-20">
      <SectionTitle title={data.title} description={data.description} />
      <div className="flex items-start gap-10 mt-8 flex-col md:flex-row">
        <div className="w-full md:w-[65%]">
          <EmbeddedMap src={data.mapUrl} />
        </div>
        <div id="contact" className="text-xl">
          <Heading as="h3">{t('contact-title')}</Heading>
          <div className="mt-2 space-y-3">
            {contacts?.map((contact) => (
              <Link
                href={contact.url}
                key={contact.id}
                className="flex items-center text-lg en:text-base gap-2"
              >
                <Media
                  resource={contact.image}
                  height={25}
                  width={25}
                  className="size-6 flex-shrink-0"
                />

                <span>{contact.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default LocationBlockComponent
