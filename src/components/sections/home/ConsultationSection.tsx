import ConsultationForm from '@/components/forms/ConsultationForm/ConsultationForm'
import SectionHeading from '@/components/shared/SectionHeading'
import { HomePage } from '@/payload-types'

type ConsultationSectionProps = {
  consultation: HomePage['consultation']
}

export default function ConsultationSection({ consultation }: ConsultationSectionProps) {
  return (
    <section id="consultation" className="bg-white py-15">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={consultation?.heading} description={consultation?.description} />
        <ConsultationForm />
      </div>
    </section>
  )
}
