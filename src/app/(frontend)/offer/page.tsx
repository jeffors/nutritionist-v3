import { getOfferPageData } from '@/data/offer'
import LegalPageLayout from '@/components/shared/LegalPageLayout'

export default async function Offer() {
  const offerPage = await getOfferPageData()
  return (
    <LegalPageLayout
      heading={offerPage.hero.heading}
      lastUpdated={offerPage.hero.lastUpdated}
      items={offerPage.sections?.items}
    />
  )
}
