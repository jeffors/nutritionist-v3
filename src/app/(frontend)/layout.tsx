import React from 'react'
import './styles.css'
import { Inter, Merriweather } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { draftMode } from 'next/headers'
import { PreviewBanner } from '@/components/PreviewBanner'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const merriweather = Merriweather({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-merriweather',
  style: ['normal', 'italic'],
})
export const metadata = {
  description:
    'Клинический нутрициолог с высшим медицинским образованием. Помогает людям обрести здоровье и энергию через осознанное питание.',
  title: 'Лариса Галимова - Сайт нутрициолога',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="ru" className={`${inter.variable} ${merriweather.variable} antialiased`}>
      <body>
        {isDraftMode && <PreviewBanner currentPath="/" />}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
