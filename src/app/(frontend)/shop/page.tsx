import { getPayload } from 'payload'
import config from '@payload-config'
import { ShopClient } from './ShopClient'

export default async function Shop() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'guides',
    depth: 1,
    sort: '-createdAt',
  })

  return <ShopClient guides={docs} />
}
