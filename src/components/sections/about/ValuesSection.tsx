import SectionHeading from '@/components/shared/SectionHeading'
import { AboutPage } from '@/payload-types'
import { iconMap } from '@/lib/service-maps'

type ValuesSectionProps = {
  values: AboutPage['values']
}

export default function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={values?.heading} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values?.items?.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <div className="text-center p-6" key={item.id}>
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-900 mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
