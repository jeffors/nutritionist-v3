import { getConsentPageData } from '@/data/consent'
import LegalPageLayout from '@/components/shared/LegalPageLayout'

export default async function Consent() {
  const consentPage = await getConsentPageData()

  return (
    <LegalPageLayout
      heading={consentPage.hero.heading}
      intro={consentPage.hero.intro}
      lastUpdated={consentPage.hero.lastUpdated}
      items={consentPage.sections?.items}
      notice={consentPage.notice.description}
    />
  )
}
