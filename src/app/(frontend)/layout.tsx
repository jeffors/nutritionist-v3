import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Сайт нутрициолога.',
  title: 'Нутрициолог',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ru">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
