import React from 'react'
import './styles.css'
import { Inter, Merriweather } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const merriweather = Merriweather({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-merriweather',
})

export const metadata = {
  description: 'Сайт нутрициолога.',
  title: 'Нутрициолог',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ru" className={`${inter.variable} ${merriweather.variable} antialiased`}>
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
