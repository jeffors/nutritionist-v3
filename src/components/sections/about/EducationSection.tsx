import SectionHeading from '@/components/shared/SectionHeading'
import { AboutPage } from '@/payload-types'
import { EducationCard } from '@/components/cards/EducationCard'

type EducationSectionProps = {
  education: AboutPage['education']
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={education?.heading} />
        <div className="space-y-4">
          {education?.items?.map((item) => {
            return <EducationCard key={item.id} item={item} />
          })}
        </div>
      </div>
    </section>
  )
}
