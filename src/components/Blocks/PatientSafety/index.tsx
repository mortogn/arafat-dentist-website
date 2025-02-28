import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Media from '@/components/Media'
import SectionTitle from '@/components/SectionTitle'
import Heading from '@/components/Typography/Heading'
import Paragraph from '@/components/Typography/Paragraph'
import { PatientSafetyBlock } from '@/payload-types'
import React, { FC } from 'react'

type Props = {
  data: PatientSafetyBlock
}

const PatientSafetyBlockComponent: FC<Props> = ({ data }) => {
  return (
    <MaxWidthWrapper element="section" className="my-10">
      <div className="mx-auto max-w-screen-xl">
        <SectionTitle title={data.title} description={data.description} />

        <div className="mt-8 grid lg:grid-cols-3 grid-cols-2 gap-4">
          <div className="lg:row-span-2 lg:col-span-1 col-span-2 flex flex-col h-full">
            <div className="flex-grow h-full relative">
              <Media
                height={900}
                width={300}
                resource={data.intro.image}
                className="hidden lg:block w-full h-full object-cover absolute inset-0"
              />
              <Media
                height={400}
                width={600}
                resource={data.intro.mobileImage}
                className="lg:hidden w-full object-cover max-h-72"
              />
            </div>
            <div className="mt-4 flex flex-col text-center">
              <Heading as="h3" className="text-lg tracking-tight font-body">
                {data.intro.title}
              </Heading>
              <Paragraph className="mt-2">{data.intro.description}</Paragraph>
            </div>
          </div>

          {data.points.map((point) => (
            <div key={point.id} className="flex flex-col h-full">
              <div className="h-60 relative">
                <Media
                  resource={point.image}
                  height={300}
                  width={600}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
              <div className="mt-4 flex flex-col text-center flex-1 flex-grow">
                <Heading as="h3" className="text-lg tracking-tight font-body">
                  {point.title}
                </Heading>
                <Paragraph className="mt-2 hidden lg:block">{point.description}</Paragraph>
                <div className="mt-auto pb-6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default PatientSafetyBlockComponent
