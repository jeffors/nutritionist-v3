import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function UnprocessedCount() {
  const payload = await getPayload({ config: configPromise })

  // Считаем только те заявки, где isActive === false
  const { totalDocs } = await payload.count({
    collection: 'consultations',
    where: {
      isActive: {
        equals: false,
      },
    },
  })

  if (totalDocs === 0) return null

  return (
    <div
      style={{
        padding: '12px 16px',
        backgroundColor: 'var(--theme-error-10, #fff5f5)',
        borderLeft: '4px solid var(--theme-error-500, #ff4d4f)',
        color: 'var(--theme-error-900, #820014)',
        marginBottom: '20px',
        borderRadius: '4px',
        fontWeight: 'bold',
        fontSize: '14px',
      }}
    >
      🚨 Внимание! Необработанных заявок на консультацию: {totalDocs}
    </div>
  )
}
