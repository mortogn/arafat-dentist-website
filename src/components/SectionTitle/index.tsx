import React, { FC } from 'react'
import RichTextContent from '../RichTextContent'

type Props = {
  title: string
  description?: React.ComponentPropsWithoutRef<typeof RichTextContent>['data'] | null
}

const SectionTitle: FC<Props> = ({ title, description }) => {
  return (
    <div className="text-center space-y-2 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl text-foreground font-semibold">{title}</h2>

      {description && (
        <RichTextContent
          data={description}
          className="en:[&_p]:text-base bn:[&_p]:text-lg md:[&_p]:text-base"
        />
      )}
    </div>
  )
}

export default SectionTitle
