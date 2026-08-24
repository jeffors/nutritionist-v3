import { getPrivacyPageData } from '@/data/privacy'
import LegalPageLayout from '@/components/shared/LegalPageLayout'

export default async function Privacy() {
  const privacyPage = await getPrivacyPageData()
  return (
    <LegalPageLayout
      heading={privacyPage.hero.heading}
      lastUpdated={privacyPage.hero.lastUpdated}
      items={privacyPage.sections?.items}
    />
  )
}
