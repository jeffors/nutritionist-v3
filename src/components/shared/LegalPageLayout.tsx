import { ConsentPage } from '@/payload-types'
import { RefreshRouteOnSave } from '../chrome/RefreshRouteOnSave'
import SectionHeading from './SectionHeading'
import { RichText } from '@payloadcms/richtext-lexical/react'

type LegalSectionItem = NonNullable<NonNullable<ConsentPage['sections']>['items']>[number]

type LegalPageLayoutProps = {
  heading: string
  lastUpdated?: string
  items?: LegalSectionItem[] | null
  intro?: string
  notice?: string
}

export default function LegalPageLayout({
  heading,
  lastUpdated,
  items,
  intro,
  notice,
}: LegalPageLayoutProps) {
  return (
    <div className="pt-20 py-15 bg-white">
      <RefreshRouteOnSave />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={heading} align="left" as="h1" />
        {lastUpdated && <div className="text-gray-500 text-sm mb-8">{lastUpdated}</div>}

        {intro && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <div className="text-black/80 text-sm leading-relaxed">{intro}</div>
          </div>
        )}

        {items?.map((item) => (
          <div key={item.id} className="mb-8">
            <h2 className="font-serif text-2xl text-black font-light mb-3">{item.title}</h2>
            <div className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
              <RichText data={item.description} />
            </div>
          </div>
        ))}

        {notice && (
          <div className="bg-amber-50 rounded-2xl p-6 mt-8">
            <p className="text-black/70 text-sm leading-relaxed">
              <strong>Обратите внимание:</strong> {notice}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
