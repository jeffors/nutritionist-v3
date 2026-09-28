import SectionHeading from '@/components/shared/SectionHeading'
import ReviewForm from 'src/components/forms/ReviewForm/ReviewForm'

export default function ReviewFormSection() {
  return (
    <section id="consultation" className="bg-gray-50 py-15">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Оставьте свой отзыв"
          description="Отзыв отобразится на сайте после прохождения модерации"
        />
        <ReviewForm />
      </div>
    </section>
  )
}
