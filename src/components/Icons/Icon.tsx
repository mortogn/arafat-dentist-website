import React, { FC } from 'react'
import { IconProps } from './type'
import FacebookIcon from './FacebookIcon'
import InstagramIcon from './InstagramIcon'
import YoutubeIcon from './YoutubeIcon'
import TwitterIcon from './TwitterIcon'
import { cn } from '@/lib/utils'

type Props = {
  icon: 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'none'
} & IconProps

const Icon: FC<Props> = ({ icon, ...props }) => {
  return renderIcon(icon, { ...props, className: cn('size-4', props.className) })
}

function renderIcon(icon: Props['icon'], props: IconProps) {
  switch (icon) {
    case 'facebook':
      return <FacebookIcon {...props} />
    case 'instagram':
      return <InstagramIcon {...props} />
    case 'youtube':
      return <YoutubeIcon {...props} />
    case 'twitter':
      return <TwitterIcon {...props} />
    default:
      return null
  }
}

export default Icon
