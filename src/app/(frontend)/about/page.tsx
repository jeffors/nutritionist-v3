import { Button } from '@/components/ui/button'
import { ArrowRight, Award, BookOpen, CheckCircle, GraduationCap, Heart } from 'lucide-react'
import Link from 'next/link'

import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getMediaUrl } from '@/lib/media'
import { iconMap } from '@/lib/service-maps'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default async function About() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const payloadGlobalAboutPage = await payload.findGlobal({ slug: 'about-page' })
  const imageAboutUrl = getMediaUrl(payloadGlobalAboutPage.hero?.image)

  return (
    <div className="pt-20">
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="">
              <div className="w-60 h-1 bg-green-500  mb-4"></div>
              <h1 className="font-heading text-5xl md:text-6xl text-black font-light mb-6">
                {payloadGlobalAboutPage.hero?.heading}
              </h1>
              <div className="text-xl text-black/80 leading-relaxed mb-6">
                {payloadGlobalAboutPage.hero?.paragraph1}
              </div>
              <p className="text-black/70 leading-relaxed mb-8">
                {payloadGlobalAboutPage.hero?.paragraph2}
              </p>
              <Button asChild variant="default" size="xl">
                <Link href="/contacts">
                  {payloadGlobalAboutPage.hero?.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-3/4 max-w-sm mx-auto">
                {imageAboutUrl && (
                  <Image
                    src={imageAboutUrl}
                    alt="Нутрициолог Лариса Галимова"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                  ></Image>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"> </div>
            <h2 className="font-heading text-4xl text-black font-light">
              {payloadGlobalAboutPage.values?.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {payloadGlobalAboutPage.values?.items?.map((item) => {
              const Icon = iconMap[item.icon]
              return (
                <div className="text-center p-6" key={item.id}>
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-900 mx-auto mb-4">
                    <Icon className="w-6 h-6"></Icon>
                  </div>
                  <h3 className="font-semibold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="py-15 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl text-black font-light">
              {payloadGlobalAboutPage.education?.heading}
            </h2>
          </div>
          <div className="space-y-4">
            {payloadGlobalAboutPage.education?.items?.map((item) => {
              const image = getMediaUrl(item.image)
              return (
                <Dialog key={item.id}>
                  <DialogTrigger className="w-full">
                    <div className="bg-white rounded-2xl p-6 flex items-start gap-4 border border-gray-100">
                      <div className="w-14 h-14 rounded-xl bg-green-500/10 flex flex-col items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-green-900" />
                        <span className="text-xs font-semibold text-green-900 mt-0.5">
                          {item.year}
                        </span>
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="font-semibold text-black">{item.title}</h3>
                        <p className="text-gray-500">{item.place}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-xs bg-green-500/10 text-green-900 px-3 py-1 rounded-full">
                          {item.variant}
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>{item.title}</DialogTitle>
                    {image && (
                      <Image src={image} alt="Фото образования" width={700} height={1200} />
                    )}
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </div>
      </section>
      <section className="py-15 bg-green-700 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-light mb-4">
            {payloadGlobalAboutPage.cta?.heading}
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            {payloadGlobalAboutPage.cta?.description}
          </p>
          <Button asChild variant="secondary" size="xl">
            <Link href="/contacts">
              {payloadGlobalAboutPage.cta?.button}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
