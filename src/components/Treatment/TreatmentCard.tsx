'use client'

import { Treatment } from '@/payload-types'
import React, { FC, HTMLAttributes } from 'react'
import Media from '../Media'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/routing'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'

type TreatmentCardProps = HTMLAttributes<HTMLDivElement> & {
  treatment: Pick<Treatment, 'id' | 'title' | 'description' | 'slug' | 'thumbnail'>
}

const TreatmentCard: FC<TreatmentCardProps> = ({ treatment, className, ...props }) => {
  const t = useTranslations('TreatmentCard')

  return (
    <Link href={`/treatments/${treatment.slug}`}>
      <Card className={cn('h-full', className)} {...props}>
        <div>
          <Media
            height={400}
            width={400}
            resource={treatment.thumbnail}
            className="aspect-[5/3] rounded-md w-full"
          />
        </div>
        <div>
          <CardHeader className="">
            <CardTitle className="text-center">{treatment.title}</CardTitle>
            <CardDescription>
              <p className="text-muted-foreground text-sm tracking-wide line-clamp-2">
                {treatment.description}
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Button>{t('viewDetails')}</Button>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

export default TreatmentCard
