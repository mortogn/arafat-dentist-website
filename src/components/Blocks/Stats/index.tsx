import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Media from '@/components/Media'
import { StatsBlock } from '@/payload-types'
import React, { FC } from 'react'

type Props = {
  data: StatsBlock
}

const StatsSection: FC<Props> = ({ data }) => {
  return (
    <div className="bg-primary/70 text-primary-foreground my-20">
      <MaxWidthWrapper
        element="section"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x p-0"
      >
        {data.stats?.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center flex-col justify-center border border-border lg:border-0 p-6"
          >
            <Media
              resource={stat.icon}
              height={80}
              width={80}
              className="size-[55px] lg:size-[80px]"
            />
            <div className="mt-3 space-y-1 text-center">
              <h3 className="font-medium text-base lg:text-lg font-body">{stat.label}</h3>
              <div className="text-lg lg:text-xl font-bold tracking-wide">{stat.value}</div>
            </div>
          </div>
        ))}
      </MaxWidthWrapper>
    </div>
  )
}

export default StatsSection
