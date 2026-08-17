import SectionHeading from '@/components/shared/SectionHeading'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HomePage } from '@/payload-types'

type HowItWorksSectionProps = {
  howItWorks: HomePage['howItWorks']
}

export default function HowItWorksSection({ howItWorks }: HowItWorksSectionProps) {
  return (
    <section className="bg-gray-50 py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={howItWorks?.heading} description={howItWorks?.description} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks?.steps?.map((step) => (
            <Card key={step.id}>
              <CardHeader>
                <div className="font-heading text-4xl md:text-5xl text-gray-200 font-light mb-4">
                  {step.number}
                </div>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
