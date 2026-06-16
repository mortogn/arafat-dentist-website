import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { generateSEO } from '@/utilities/generateSeo'
import { getTreatment } from '@/utilities/getTreatment'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RichTextContent from '@/components/RichTextContent'
import { treatmentJsxConverter } from '@/converters/treatmentJsxConverter'
import { getCollection } from '@/utilities/getCollection'
import { Locale } from '@/types'
import { Treatment } from '@/payload-types'
import { locales } from '@/const/locale'
import { draftMode } from 'next/headers'

export const dynamicParams = true

const getTreatmentSlugs = async (locale: Locale) => {
  const treatments = await getCollection({
    collection: 'treatments',
    locale,
    limit: 1000,
    where: {
      _status: { equals: 'published' },
    },
    select: {
      slug: true,
    } as Partial<Record<keyof Treatment, true>>,
  })

  return treatments.docs as Pick<Treatment, 'slug' | 'id'>[]
}

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = []

  try {
    for (const locale of locales) {
      const treatments = await getTreatmentSlugs(locale)

      const localeParams = treatments
        .filter(({ slug }) => typeof slug === 'string' && slug.length > 0)
        .map(({ slug }) => ({
          locale,
          slug: slug as string,
        }))

      params.push(...localeParams)
    }
  } catch (err) {
    console.error('[generateStaticParams] Failed to fetch treatment slugs:', err)
  }

  return params
}

interface PageProps {
  params: Promise<{
    locale: 'en-US' | 'bn-BD'
    slug: string
  }>
}

export default async function TreatmentPage({ params }: PageProps) {
  const { locale, slug } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const { isEnabled: draft } = await draftMode()

  const pageData = await getTreatment({ slug, locale, draft })

  // If page not found, return 404
  if (!pageData) {
    notFound()
  }

  return (
    <MaxWidthWrapper className="mt-10">
      {/* Add your treatment page content here */}
      {/* <h1>{pageData.title}</h1> */}
      {/* You can use the pageData and globalData to render your content */}
      <article className="w-full mx-auto pb-8">
        {pageData.content ? (
          <RichTextContent
            data={pageData.content}
            converters={treatmentJsxConverter}
            proseSize="compact"
            className="w-full max-w-screen-lg mx-auto"
          />
        ) : (
          <div className="text-center py-10">
            <p>No content available for this treatment.</p>
          </div>
        )}
      </article>
    </MaxWidthWrapper>
  )
}

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale, slug } = await params
  const pageData = await getTreatment({ slug, locale })

  if (!pageData?.meta) {
    return {}
  }

  return generateSEO(pageData.meta)
}

// Generate static params for the treatments
// export async function generateStaticParams({params}: PageProps) {
//     // You might want to fetch all treatment slugs here
//     // This is just a placeholder
//     return [
//         { locale: 'en-US', slug: 'dental-implants' },
//         { locale: 'bn-BD', slug: 'dental-implants' },
//         // Add more treatments as needed
//     ]
// }
