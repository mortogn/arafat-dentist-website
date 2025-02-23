import Icon from '@/components/Icons/Icon'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RichTextContent from '@/components/RichTextContent'
import Heading from '@/components/Typography/Heading'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { CallToActionBlock, Contacts } from '@/payload-types'
import { Locale } from '@/types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getTranslations } from 'next-intl/server'
import React, { FC } from 'react'

type Props = {
  data: CallToActionBlock
  locale: Locale
}

const CallToAction: FC<Props> = async ({ data, locale }) => {
  const [t, { contacts }] = await Promise.all([
    getTranslations({ locale, namespace: 'CallToAction' }),
    getCachedGlobal('contacts', 1, locale)() as Promise<Contacts>,
  ])

  const phone = contacts?.find((contact) => contact.name === 'Phone')
  const whatsApp = contacts?.find((contact) => contact.name === 'WhatsApp')

  return (
    <div className="bg-primary text-primary-foreground py-10">
      <MaxWidthWrapper element="section" className="text-center flex flex-col items-center gap-4">
        <Heading as="h3" className="en:text-3xl en:font-medium en:tracking-tight">
          {data.title}
        </Heading>
        <RichTextContent data={data.description} className="en:prose-p:text-base" />

        <div className="flex items-center gap-3 flex-col lg:flex-row">
          <Button asChild variant="secondary">
            <Link href={'/book-appointment'}>{t('book-appointment')}</Link>
          </Button>

          {phone?.url && (
            <Button asChild variant="secondary">
              <Link href={phone?.url}>
                <Icon icon="phone" />
                <span>{phone.label}</span>
              </Link>
            </Button>
          )}

          {whatsApp?.url && (
            <Button asChild variant="secondary">
              <Link href={whatsApp?.url}>
                <Icon icon="whatsapp" />
                <span>{whatsApp.label}</span>
              </Link>
            </Button>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default CallToAction
