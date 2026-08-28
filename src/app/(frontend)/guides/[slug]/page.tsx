import type { Metadata } from 'next'
import NotFound from '../../[...not-found]/page'
import { getMenuGuidesBySlug, getMenuGuidesSlugs } from '@/data/guides'
import GuidesDetail from '@/components/sections/guides/GuidesDetail'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getMenuGuidesSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = await getMenuGuidesBySlug(slug)
  if (!guide) return {}

  return {
    title: `${guide.title} | Терапевтический меню-гайд`,
    description: guide.description ?? undefined,
  }
}

export default async function MenuGuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = await getMenuGuidesBySlug(slug)

  if (!guide) {
    return NotFound()
  }

  return <GuidesDetail guide={guide} />
}
