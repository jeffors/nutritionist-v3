import {
  Stethoscope,
  Leaf,
  Salad,
  Pill,
  Activity,
  Dna,
  Heart,
  Brain,
  Scale,
  Microscope,
  type LucideIcon,
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Leaf,
  Salad,
  Pill,
  Activity,
  Dna,
  Heart,
  Brain,
  Scale,
  Microscope,
}

export const colorMap: Record<string, { bg: string; text: string }> = {
  green: { bg: 'bg-green-500/10', text: 'text-green-900' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-900' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-900' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-900' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-900' },
  sky: { bg: 'bg-sky-500/10', text: 'text-sky-900' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-900' },
}
