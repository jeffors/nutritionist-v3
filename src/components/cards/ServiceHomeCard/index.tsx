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

export function ServiceHomeCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon]
  const { bg, text } = colorMap[service.color] ?? colorMap.green

  return (
    <Card className="justify-between">
      <CardHeader>
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${bg} ${text}`}
        >
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between"></CardContent>
      <CardFooter className="flex flex-col gap-5">
        <div className="w-full flex justify-between">
          <p className="text-lg font-bold">
            {service.price !== 0 ? `От ${service.price} ₽` : `Бесплатно`}
          </p>
          <Badge variant="secondary">{service.duration}</Badge>
        </div>
        <Button variant="outline" className="w-full">
          Записаться
        </Button>
      </CardFooter>
    </Card>
  )
}
