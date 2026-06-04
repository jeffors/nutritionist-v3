import type { Media } from '@/payload-types'

export function getMediaUrl(media: Media | number | null | undefined): string | null {
  if (typeof media === 'object' && media !== null) {
    return media.url ?? null
  }
  return null
}
