import { getCachedGlobal } from '@/utilities/getGlobals'
import React, { FC } from 'react'
import { type Contacts, type Socials, type Footer as FooterType } from '@/payload-types'
import Media from '../Media'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { Link } from '@/i18n/routing'
import Icon from '../Icons/Icon'
import { getTranslations } from 'next-intl/server'

type Props = {
  locale: 'en-US' | 'bn-BD'
}

const Footer: FC<Props> = async ({ locale }) => {
  const [footer, contacts, socials] = await Promise.all([
    getCachedGlobal('footer', 2, locale)() as Promise<FooterType>,
    getCachedGlobal('contacts', 1, locale)() as Promise<Contacts>,
    getCachedGlobal('socials', 1)() as Promise<Socials>,
  ])

  if (!footer || !contacts || !socials) return null

  const t = await getTranslations({ locale, namespace: 'Footer' })

  return (
    <footer className="bg-secondary/40 py-10 md:py-20 pb-[99px] lg:pb-20">
      <MaxWidthWrapper className="flex items-center md:items-start flex-col md:flex-row gap-10 justify-between">
        <div className="max-w-xs flex flex-col items-center md:items-start gap-4 md:gap-6">
          <Media resource={footer.logo} height={100} width={100} className="h-[80px] w-auto" />
          <div className="space-y-4 mt-8">
            {contacts.contacts?.map((contact) => (
              <Link href={contact.url} className="flex items-center gap-3" key={contact.id}>
                <Icon className="size-6 flex-shrink-0" icon={contact.icon} />
                <span>{contact.label}</span>
              </Link>
            ))}
          </div>
        </div>
        {footer.links?.map((group) => (
          <div key={group.id} className="flex flex-col items-center md:items-start">
            <h3 className="text-xl tracking-tight font-body font-medium">{group.groupTitle}</h3>
            <div className="flex items-center md:items-start flex-col gap-2 mt-3 ">
              {group.groupLinks?.map((link) => (
                <Link key={link.id} href={link.url} className="block">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center md:items-center">
          <h3 className="text-xl tracking-tight font-medium font-body">{t('follow_socials')}</h3>
          <div className="flex items-start gap-3 mt-3">
            {socials.socials &&
              socials.socials.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  className="group py-2 gap-2 rounded-md"
                >
                  {social.image ? (
                    <Media resource={social.image} height={50} width={50} className="size-10" />
                  ) : (
                    <Icon icon={social.icon} className="fill-primary-foreground size-10 " />
                  )}

                  <span className="sr-only font-medium">{social.platform}</span>
                </Link>
              ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
