import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold font-heading">
        {!user && 'Сайт нутрициолога.'}
        {user && `Привет, ${user.email}`}
      </h1>
      <div className="flex min-h-svh items-center justify-center">
        <Button className="font-bold w-full" size={'lg'}>
          <Link href={payloadConfig.routes.admin} target="_blank">
            Перейти в админ панель
          </Link>
        </Button>
      </div>
    </div>
  )
}
