import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

type InfoCardProps = {
  icon: LucideIcon
  title?: string | null
  children: ReactNode
}

export default function InfoCard({ icon, title, children }: InfoCardProps) {
  const Icon = icon
  return (
    <Card>
      <CardHeader>
        <Icon className="w-6 h-6 text-green-700 mb-3" />
        <CardTitle className="font-sans text-sm">{title}</CardTitle>
        <CardDescription>{children}</CardDescription>
      </CardHeader>
    </Card>
  )
}
