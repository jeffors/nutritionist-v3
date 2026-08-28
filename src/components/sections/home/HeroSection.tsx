import { Button } from '@/components/ui/button'
import { HomePage } from '@/payload-types'
import { ArrowRight, ChevronDown, Leaf } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type HeroSectionProps = {
  hero: HomePage['hero']
  backgroundImage: StaticImageData
}

export default function HeroSection({ hero, backgroundImage }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <Image src={backgroundImage} alt="" className="w-full h-full object-cover" priority />
        <div className="absolute inset-0 bg-white opacity-75" />
      </div>

      <div className="relative z-10  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-green-500/15 backdrop-blur-sm border border-green-500/30 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            {hero?.badge}
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-black font-light leading-tight mb-6">
            {hero?.heading}
            <br />
            <span className="text-green-700 italic">{hero?.headingAccent}</span>
          </h1>
          <p className="text-lg text-black/80 leading-relaxed mb-8 max-w-lg">{hero?.description}</p>

          <div className="flex items-center gap-6 mb-10">
            {hero?.stats?.map((stat) => (
              <div key={stat.id}>
                <div className="font-heading text-2xl font-semibold text-black">{stat.value}</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild variant="default" size="xl">
              <Link href="#consultation">
                {hero?.ctaLabel}
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
  )
}
