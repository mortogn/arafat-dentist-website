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

const getTreatmentSlugs = async (locale: Locale) => {
  const treatments = await getCollection({
    collection: 'treatments',
    locale,
    limit: 1000,
    select: {
      slug: true,
    } as Partial<Record<keyof Treatment, true>>,
  })

  return treatments.docs as Pick<Treatment, 'slug' | 'id'>[]
}

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = []

  for (const locale of locales) {
    const treatments = await getTreatmentSlugs(locale)

    // Map the treatments for current locale
    const localeParams = treatments.map(({ slug }) => ({
      locale,
      slug,
    }))

    params.push(...localeParams)
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

  const pageData = await getTreatment({ slug, locale })

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
        {pageData.content && (
          <RichTextContent
            data={pageData.content}
            converters={treatmentJsxConverter}
            className="lg:prose-lg xl:prose-xl w-full max-w-screen-lg mx-auto"
          />
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
