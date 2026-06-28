import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'

export default async function ConsultationsWidget() {
  const payload = await getPayload({ config: configPromise })

  const { totalDocs } = await payload.count({
    collection: 'consultations',
    where: {
      isActive: {
        equals: false,
      },
    },
  })

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '6px',
        marginTop: '20px',
      }}
    >
      <h3 style={{ margin: '0 0 10px 0' }}>Сводка по заявкам</h3>
      <p style={{ fontSize: '16px', margin: '0 0 15px 0' }}>
        Необработанных консультаций:{' '}
        <strong style={{ color: totalDocs > 0 ? 'var(--theme-error-500)' : 'inherit' }}>
          {totalDocs}
        </strong>
      </p>

      {totalDocs > 0 && (
        <Link
          href="/admin/collections/consultations?where[isActive][equals]=false"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: 'var(--theme-success-500, #52c41a)',
            color: '#fff',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          Открыть необработанные
        </Link>
      )}
    </div>
  )
}
