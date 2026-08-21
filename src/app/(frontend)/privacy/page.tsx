import { RichText } from '@payloadcms/richtext-lexical/react'
import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import SectionHeading from '@/components/shared/SectionHeading'
import { getPrivacyPageData } from '@/data/privacy'

export default async function Privacy() {
  const privacyPage = await getPrivacyPageData()
  return (
    <>
      <div className="pt-20 py-15 bg-white">
        <RefreshRouteOnSave />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={privacyPage.hero.heading} align="left" as="h1" />
          <div className="text-gray-500 text-sm mb-8">{privacyPage.hero.lastUpdated}</div>
          {privacyPage.sections?.items?.map((item) => (
            <div key={item.id} className="mb-8">
              <h2 className="font-serif text-2xl text-black font-light mb-3">{item.title}</h2>
              <div className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
                <RichText data={item.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
