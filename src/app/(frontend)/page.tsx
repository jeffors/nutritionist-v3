import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'
import Image from 'next/image'
import BackgroundImage from './../../../public/images/hero-bg.png'
import Portrait from './../../../public/images/portrait.jpg'
import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronDown,
  ImageIcon,
  Leaf,
  Mail,
  Phone,
  Send,
  ShoppingBag,
  Star,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { ServiceHomeCard } from '@/components/cards/ServiceHomeCard'
import { GuideHomeCard } from '@/components/cards/GuideHomeCard'
import { ReviewHomeCard } from '@/components/cards/ReviewHomeCard'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const payloadServices = await payload.find({
    collection: 'services',
    where: { isActive: { equals: true } },
    sort: 'order',
    limit: 3,
  })
  const payloadGuides = await payload.find({
    collection: 'guides',
    depth: 1,
    sort: '-createdAt',
    limit: 3,
  })
  const payloadReviews = await payload.find({
    collection: 'reviews',
    where: { isActive: { equals: true } },
    sort: '-data',
    limit: 2,
  })
  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image src={BackgroundImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white opacity-75" />
        </div>

        <div className="relative z-10  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-green-500/15 backdrop-blur-sm border border-green-500/30 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Нутрициолог · Онлайн-консультации
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-black font-light leading-tight mb-6">
              Ваше здоровье —
              <br />
              <span className="text-green-700 italic">мой приоритет</span>
            </h1>
            <p className="text-lg text-black/80 leading-relaxed mb-8 max-w-lg">
              Помогаю улучшить самочувствие, нормализовать вес и восстановить здоровье через
              индивидуальный подход к питанию и образу жизни.
            </p>

            <div className="flex items-center gap-6 mb-10">
              <div>
                <div className="font-heading text-2xl font-semibold text-black">500+</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">клиентов</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-semibold text-black">5 лет</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">практики</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-semibold text-black">97%</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">
                  довольны результатом
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default" size="xl">
                <Link href="#consultation">
                  Записаться на консультацию
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-green-700" />
        </div>
      </section>

      <section className="bg-white py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                <Image src={Portrait} alt="Портрет" className="w-full h-full object-cover" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-black">Лариса Галимова</p>
                      <p className="text-xs text-black/70">Rлинический нутрициолог</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="w-60 h-1 bg-green-500 mb-4"></div>
              <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
                Обо мне
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                Меня зовут Лариса Галимова. Я — клинический нутрициолог с высшем медицинским
                образованием. Помогаю людям по всему миру улучшить здоровье через осознанное и
                сбалансированное питание.
              </p>
              <p className="text-black/80 leading-relaxed mb-6">
                Моя цель — помочь вам достичь оптимального здоровья и благополучия через правильное
                питание и образ жизни.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Индивидуальный подход к каждому клиенту',
                  'Научно обоснованные рекомендации',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-black/80">{item}</p>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" size="xl">
                <Link href="/about">
                  Подробнее обо мне
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">Услуги</h2>
            <p className="text-black/80 max-w-xl mx-auto">
              Индивидуальный подход к каждому клиенту. Работаю онлайн со всем миром.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payloadServices.docs.map((service) => (
              <ServiceHomeCard key={service.id} service={service}></ServiceHomeCard>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="default" size="xl">
              <Link href="/services">
                Все услуги
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              Гайды и лекции
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">
              Авторские цифровые продукты — скачайте и начните улучшать своё здоровье прямо сейчас.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {payloadGuides.docs.length === 1 && <div className=""></div>}

            {payloadGuides.docs.map((guide) => (
              <GuideHomeCard key={guide.id} guide={guide} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="xl">
              <Link href="/shop">
                <ShoppingBag className="w-4 h-4" />
                Все продукты в магазине
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              Как проходит работа
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">
              Простой и понятный процесс на пути к вашему здоровью
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="font-heading text-4xl md:text-5xl text-gray-200 font-light mb-4">
                  01
                </div>
                <CardTitle>Оставляете заявку</CardTitle>
                <CardDescription>
                  Заполняете форму или пишете в мессенджер. Я отвечаю в течение 2 часов.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="font-heading text-4xl md:text-5xl text-gray-200 font-light mb-4">
                  02
                </div>
                <CardTitle>Первичная консультация</CardTitle>
                <CardDescription>
                  Разбираем ваш запрос, анализы, образ жизни и формулируем цели.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="font-heading text-4xl md:text-5xl text-gray-200 font-light mb-4">
                  03
                </div>
                <CardTitle>Получаете план</CardTitle>
                <CardDescription>
                  Индивидуальный план питания, рекомендации по нутриентам и образу жизни.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="font-heading text-4xl md:text-5xl text-gray-200 font-light mb-4">
                  04
                </div>
                <CardTitle>Результат</CardTitle>
                <CardDescription>
                  Наблюдаете изменения, получаете поддержку и корректировки на каждом этапе.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      <section className="bg-white py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              Отзывы клиентов
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">
              Более 500 довольных клиентов по всему миру
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {payloadReviews.docs.map((review) => (
              <ReviewHomeCard key={review.id} review={review} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="xl">
              <Link href="/reviews">
                Все отзывы
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-indigo-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 bg-indigo-200 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="w-24 h-24 text-indigo-600 mx-auto mb-4 opacity-30" />
                  <p className="text-indigo-600 font-medium">Галимов Ринат Фаритович</p>
                  <p className="text-indigo-500">Врач-проктолог</p>
                </div>
              </div>
            </div>

            <div>
              <Badge className="mb-4 bg-indigo-100 text-indigo-700">Смежный специалист</Badge>
              <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
                Врач-проктолог
                <div className="text-indigo-600">Галимов Ринат Фаритович</div>
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                Опытный врач-проктолог с 20-летней практикой. Специализируется на диагностике и
                лечении заболеваний прямой кишки, анального канала и толстого кишечника.
              </p>
              <p className="text-black/80 leading-relaxed mb-6">
                Работает в тесном сотрудничестве с нутрициологом для комплексного подхода к здоровью
                пациентов. Правильное питание часто является ключевым элементом лечения
                проктологических проблем.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Консультации и диагностика',
                  'Лечение геморроя и анальных трещин',
                  'Колоноскопия и другие процедуры',
                  'Координация с нутрициологом для комплексного плана',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-black/80">{item}</p>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" size="xl">
                <Link href="/services">
                  Записаться к врачу
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-15">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              Часто задаваемые вопросы
            </h2>
          </div>
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Как проходит консультация?</AccordionTrigger>
              <AccordionContent>
                Консультация проходит онлайн — через WhatsApp или Telegram. После записи я пришлю
                анкету для заполнения, чтобы подготовиться к встрече.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Нужно ли сдавать анализы перед консультацией?</AccordionTrigger>
              <AccordionContent>
                Не обязательно. Если у вас есть результаты анализов — отлично, мы их разберём. Если
                нет — я помогу определить, какие анализы стоит сдать.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Сколько длится сопровождение?</AccordionTrigger>
              <AccordionContent>
                Минимальный срок — 1 месяц. Оптимально — 2–3 месяца. За это время успевают
                проявиться устойчивые изменения и формируются новые привычки.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="consultation" className="bg-white py-15">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              Записаться на консультацию
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">
              Оставьте заявку, и я свяжусь с вами в течение 2 часов
            </p>
          </div>
          <ConsultationForm></ConsultationForm>
        </div>
      </section>

      <section className="bg-gray-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              Контакты
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">Выберите удобный способ связи</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader className="">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                </div>

                <CardTitle className="flex font-sans justify-center">WhatsApp</CardTitle>
                <CardDescription className="flex justify-center">
                  +7 (900) 123-45-67
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-green-600 mb-3">
                    <Send className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                <CardTitle className="flex font-sans justify-center">Telegram</CardTitle>
                <CardDescription className="flex justify-center">@samplename</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-green-600 mb-3">
                    <Mail className="w-6 h-6 text-gray-600" />
                  </div>
                </div>

                <CardTitle className="flex font-sans justify-center">Mail</CardTitle>
                <CardDescription className="flex justify-center">
                  larisa.galimova@example.com
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
