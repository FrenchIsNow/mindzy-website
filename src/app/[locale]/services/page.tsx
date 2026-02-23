import { permanentRedirect } from 'next/navigation'

export default async function ServicesRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  permanentRedirect(`/${locale}/solutions/site-web`)
}
