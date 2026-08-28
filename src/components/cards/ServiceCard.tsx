import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { colorMap, iconMap } from '@/lib/service-maps'
import { Service } from '@/payload-types'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon]
  const { bg, text } = colorMap[service.color] ?? colorMap.green

  return (
    <Card className="justify-between">
      <CardHeader className="flex items-start gap-4 relative">
        {service.tag && (
          <Badge className="absolute top-2 right-6 hidden lg:block">{service.tag}</Badge>
        )}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${bg} ${text}`}
        >
          {Icon && <Icon className="w-8 h-8" />}
        </div>
        <div>
          <CardTitle className="text-2xl">{service.title}</CardTitle>
          <CardDescription className="flex items-center gap-3">
            <span className="text-xl font-bold text-black">
              {service.price !== 0 ? `От ${service.price} ₽` : `Бесплатно`}
            </span>
            <Badge variant="secondary">{service.duration}</Badge>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-black/80 mb-5">{service.description}</p>
        <div className="">
          <p className="font-semibold text-black/80 uppercase tracking-wider mb-3">Что включено:</p>
          <ul className="space-y-2">
            {service.includes?.map((item) => (
              <li key={item.id} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>{item.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild size={'xl'} className="w-full">
          <Link href="/contacts">Записаться</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
