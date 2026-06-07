import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { ru } from '@payloadcms/translations/languages/ru'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Guides } from './collections/Guides'
import { Reviews } from './collections/Reviews'
import { Contacts } from './globals/Contacts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    dateFormat: 'dd MMMM yyyy, HH:mm',
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/admin/logo',
        Icon: '/components/admin/icon',
      },
    },
  },
  collections: [Users, Media, Services, Guides, Reviews],
  globals: [Contacts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
  i18n: {
    supportedLanguages: { ru },
    translations: {
      ru: {
        general: {
          createNewLabel: 'Создать новый предмет "{{label}}"',
          creatingNewLabel: 'Создание нового предмета "{{label}}"',
        },
      },
    },
  },
})
