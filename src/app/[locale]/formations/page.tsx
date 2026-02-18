import { redirect } from 'next/navigation'

export default async function FormationsRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/solutions/formations`)
}
