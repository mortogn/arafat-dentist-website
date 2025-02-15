import { Header, Socials } from '@/payload-types'
import React, { FC } from 'react'
import Buttons from '../Buttons'
import Icon from '../Icons/Icon'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = {
  data: Header['topbar']
}

const Topbar: FC<Props> = async ({ data }) => {
  let socials: Socials['socials'] | null = null

  if (data.showSocials) {
    const fetchedSocial = (await getCachedGlobal('socials', 1)()) as Socials
    socials = fetchedSocial.socials
  }

  return (
    <div className="bg-primary py-3 text-primary-foreground my-auto">
      <MaxWidthWrapper className="flex items-center justify-between">
        <div className="font-medium tracking-wide text-sm">{data.text}</div>
        {data.callToAction && data.buttons && <Buttons data={data.buttons} />}
        {data.showSocials && socials && (
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <Link
                key={social.id}
                href={social.url}
                target="_blank"
                className="hover:bg-primary-foreground group p-2 rounded-md"
              >
                <Icon
                  icon={social.icon}
                  className="fill-primary-foreground size-5 group-hover:fill-primary"
                />
                <span className="sr-only">{social.platform}</span>
              </Link>
            ))}
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  )
}

export default Topbar
