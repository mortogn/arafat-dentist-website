import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { type Contacts, type Socials, type Footer as FooterType } from '@/payload-types'
import Media from '../Media'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from 'next/link'
import Icon from '../Icons/Icon'

const Footer = async () => {
  const [footer, contacts, socials] = await Promise.all([
    getCachedGlobal('footer', 2)() as Promise<FooterType>,
    getCachedGlobal('contacts', 1)() as Promise<Contacts>,
    getCachedGlobal('socials', 1)() as Promise<Socials>,
  ])

  if (!footer || !contacts || !socials) return null

  return (
    <footer className="bg-secondary/40 py-20">
      <MaxWidthWrapper className="flex items-start justify-between">
        <div className="max-w-xs">
          <Media resource={footer.logo} height={100} width={100} className="h-[40px] w-auto" />
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
          <div key={group.id}>
            <h3 className="text-xl tracking-tight font-medium">{group.groupTitle}</h3>
            <div className="flex items-start flex-col gap-2 mt-3">
              {group.groupLinks?.map((link) => (
                <Link key={link.id} href={link.url} className="block">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col items-start">
          <h3 className="text-xl tracking-tight font-medium">Follow us on social media</h3>
          <div className="flex items-start flex-col gap-2 mt-3">
            {socials.socials &&
              socials.socials.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  className="group py-2 gap-2 rounded-md flex items-center"
                >
                  <Icon icon={social.icon} className="fill-primary-foreground size-5 " />
                  <span className=" font-medium">{social.platform}</span>
                </Link>
              ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
