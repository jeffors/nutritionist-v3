import type { Metadata } from 'next'
import { getMenuGuides } from '@/data/guides'
import GuidesSection from '@/components/sections/guides/GuidesSection'

export const metadata: Metadata = {
  title: 'Терапевтические меню-гайды и статьи по питанию',
  description: 'Полноценные руководства по питанию, готовые меню и терапевтические рационы.',
}

export default async function MenuGuidesPage() {
  const menuGuides = await getMenuGuides()

  return <GuidesSection menuGuides={menuGuides} />
}
