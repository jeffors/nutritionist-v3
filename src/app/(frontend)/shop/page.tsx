import { getPayload } from 'payload'
import config from '@payload-config'
import { ShopClient } from './ShopClient'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { draftMode } from 'next/headers'

export default async function Shop() {
  const payload = await getPayload({ config })
  const { isEnabled: isDraftMode } = await draftMode()

  const { docs } = await payload.find({
    collection: 'guides',
    depth: 1,
    sort: '-createdAt',
    where: { isActive: { equals: true } },
  })
  const payloadGlobalShopPage = await payload.findGlobal({ slug: 'shop-page', draft: isDraftMode })

  return (
    <>
      <RefreshRouteOnSave />
      <ShopClient guides={docs} page={payloadGlobalShopPage} />
    </>
  )
}
