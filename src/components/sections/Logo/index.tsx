import { Leaf } from 'lucide-react'

export default function Logo() {
  return (
    <>
      <div className="w-8 h-8 rounded-full bg-green-300/30 flex items-center justify-center">
        <Leaf className="w-4 h-4" />
      </div>
      <div>
        <div className="font-heading text-lg font-semibold">Лариса Галимова</div>
        <div className="text-xs text-gray-400 tracking-widest uppercase">Нутрициолог</div>
      </div>
    </>
  )
}
