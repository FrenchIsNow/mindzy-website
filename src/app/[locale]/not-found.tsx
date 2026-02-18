import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <div className="text-8xl font-display font-bold text-violet/20 mb-6">404</div>
      <h1 className="heading-2 text-anthracite mb-4">Page introuvable</h1>
      <p className="body-large text-gray-500 max-w-md mb-8">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/fr">
        <Button variant="primary" size="lg" icon={<ArrowIcon />}>
          Retour à l&apos;accueil
        </Button>
      </Link>
    </div>
  )
}
