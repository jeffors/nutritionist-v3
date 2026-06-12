'use client'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { getMediaUrl } from '@/lib/media'
import { Media } from '@/payload-types'
import { ChevronsUpDown, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ItemProps {
  image?: number | Media | null | undefined
  year: string
  title: string
  place: string
  variant: string
  id?: string | null
}

export function EducationCard({ item }: { item: ItemProps }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const imageUrl = getMediaUrl(item.image)
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white border border-gray-100 rounded-2xl hover:border-gray-300 transition"
    >
      <CollapsibleTrigger asChild className="w-full">
        <div className="  p-6 flex items-start gap-4 ">
          <div className="w-14 h-14 rounded-xl bg-green-500/10 flex flex-col items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-green-900" />
            <span className="text-xs font-semibold text-green-900 mt-0.5">{item.year}</span>
          </div>
          <div className="flex flex-col items-start my-auto">
            <div className="flex gap-2">
              <h3 className="font-semibold text-black">{item.title}</h3>
              <span className="text-xs bg-green-500/10 text-green-900 px-3 py-1 rounded-full">
                {item.variant}
              </span>
            </div>
            <p className="text-gray-500">{item.place}</p>
          </div>
          <div className="ml-auto my-auto">
            <Button variant={'secondary'} size={'xl'}>
              <ChevronsUpDown />
            </Button>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex justify-center pb-6">
        {imageUrl && (
          <Image src={imageUrl} alt={`Фото/скан ${item.title}`} width={800} height={1000} />
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
