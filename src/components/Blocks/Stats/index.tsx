import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Media from '@/components/Media'
import { StatsBlock } from '@/payload-types'
import React, { FC } from 'react'

type Props = {
  data: StatsBlock
}

const StatsSection: FC<Props> = ({ data }) => {
  return (
    <div className="bg-secondary py-5 my-20">
      <MaxWidthWrapper
        element="section"
        className="flex items-center md:justify-between justify-center flex-col md:flex-row gap-10 md:gap-5"
      >
        {data.stats?.map((stat) => (
          <div key={stat.id} className="flex items-center flex-col gap-3 justify-center">
            <Media resource={stat.icon} height={80} width={80} className="size-[80px]" />
            <h3 className="font-medium text-lg font-body">{stat.label}</h3>
            <div className="text-xl font-bold tracking-wide">{stat.value}</div>
          </div>
        ))}
      </MaxWidthWrapper>
    </div>
  )
}

export default StatsSection
