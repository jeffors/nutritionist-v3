import { getPayload } from 'payload'
import config from '@payload-config'
import { ShopClient } from './ShopClient'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function Shop() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'guides',
    depth: 1,
    sort: '-createdAt',
  })
  const payloadGlobalShopPage = await payload.findGlobal({ slug: 'shop-page', draft: true })

  return (
    <>
      <RefreshRouteOnSave />
      <ShopClient guides={docs} page={payloadGlobalShopPage} />
    </>
  )
}
