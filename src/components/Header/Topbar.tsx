import { Header, Social } from '@/payload-types'
import React, { FC } from 'react'
import Buttons from '../Buttons'
import Icon from '../Icons/Icon'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from 'next/link'

type Props = {
  data: Header['topbar'] & { socials?: Social['socials'] }
}

const Topbar: FC<Props> = ({ data }) => {
  return (
    <div className="bg-primary py-3 text-primary-foreground my-auto">
      <MaxWidthWrapper className="flex items-center justify-between">
        <div className="font-medium tracking-wide text-sm">{data.text}</div>
        {data.callToAction && data.buttons && <Buttons data={data.buttons} />}
        {data.showSocials && data.socials && (
          <div className="flex items-center gap-2">
            {data.socials.map((social) => (
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
