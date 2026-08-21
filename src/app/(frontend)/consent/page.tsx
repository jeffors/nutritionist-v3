import { RichText } from '@payloadcms/richtext-lexical/react'
import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import SectionHeading from '@/components/shared/SectionHeading'
import { getConsentPageData } from '@/data/consent'

export default async function Consent() {
  const consentPage = await getConsentPageData()

  return (
    <>
      <div className="pt-20 py-15 bg-white">
        <RefreshRouteOnSave />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={consentPage.hero.heading} align="left" as="h1" />

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <div className="text-black/80 text-sm leading-relaxed">{consentPage.hero.intro}</div>
          </div>

          {consentPage.sections?.items?.map((item) => (
            <div key={item.id} className="mb-8">
              <h2 className="font-serif text-2xl text-black font-light mb-3">{item.title}</h2>
              <div className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
                <RichText data={item.description} />
              </div>
            </div>
          ))}

          <div className="bg-amber-50 rounded-2xl p-6 mt-8">
            <p className="text-black/70 text-sm leading-relaxed">
              <strong>Обратите внимание:</strong> {consentPage.notice.description}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
