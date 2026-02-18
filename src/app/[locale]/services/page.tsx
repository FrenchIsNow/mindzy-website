import { redirect } from 'next/navigation'

export default async function ServicesRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/solutions/site-web`)
}
