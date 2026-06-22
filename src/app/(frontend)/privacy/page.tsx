import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { draftMode } from 'next/headers'

export default async function Privacy() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled: isDraftMode } = await draftMode()
  const payloadGlobalPrivacyPage = await payload.findGlobal({
    slug: 'privacy-page',
    draft: isDraftMode,
  })
  return (
    <>
      <div className="pt-20 py-15 bg-white">
        <RefreshRouteOnSave />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-60 h-1 bg-green-500 mb-4"></div>
          <h1 className="font-heading text-4xl text-black font-light mb-8">
            {payloadGlobalPrivacyPage.hero.heading}
          </h1>
          <div className="text-gray-500 text-sm mb-8">
            {payloadGlobalPrivacyPage.hero.lastUpdated}
          </div>
          {payloadGlobalPrivacyPage.sections?.items?.map((item) => (
            <div key={item.id} className="mb-8">
              <h2 className="font-serif text-2xl text-black font-light mb-3">{item.title}</h2>
              <p className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
                <RichText data={item.description} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
