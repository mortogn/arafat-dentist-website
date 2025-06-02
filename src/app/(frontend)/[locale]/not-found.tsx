import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

export default async function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-6 text-lg">Sorry, the page you are looking for could not be found.</p>
      <Button asChild>
        <Link href={'/'}>Go To Home</Link>
      </Button>
    </main>
  )
}
