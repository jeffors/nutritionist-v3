import SectionHeading from '@/components/shared/SectionHeading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HomePage } from '@/payload-types'

type FaqSectionProps = {
  faq: HomePage['faq']
}

export default function FaqSection({ faq }: FaqSectionProps) {
  return (
    <section className="bg-gray-50 py-15">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={faq?.heading} />
        <Accordion type="multiple">
          {faq?.items?.map((item) => (
            <AccordionItem key={item.id} value={item.id?.toString() ?? ''}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
