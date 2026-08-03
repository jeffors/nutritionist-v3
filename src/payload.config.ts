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
import { HomePageGlobal } from './globals/HomePageGlobal'
import { AboutPageGlobal } from './globals/AboutPageGlobal'
import { ContactsPageGlobal } from './globals/ContactsPageGlobal'
import { ServicesPageGlobal } from './globals/ServicesPageGlobal'
import { ShopPageGlobal } from './globals/ShopPageGlobal'
import { ReviewPageGlobal } from './globals/ReviewPageGlobal'
import { Consultations } from './collections/Consultations'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { ConsentPageGlobal } from './globals/ConsentPageGlobal'
import { OfferPageGlobal } from './globals/OfferPageGlobal'
import { PrivacyPageGlobal } from './globals/PrivacyPageGlobal'
import { seoPlugin } from '@payloadcms/plugin-seo'
import ConsultationsWidget from './components/admin/ConsultationsWidget'
import { Recipes } from './collections/Recipes'
import { MenuGuides } from './collections/MenuGuides'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_DOMAIN ?? '',
    defaultFromName: 'Лариса Галимова | Нутрициолог',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
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
      beforeDashboard: ['/components/admin/ConsultationsWidget'],
    },
    livePreview: {
      url: ({ globalConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
        const secret = process.env.PAYLOAD_SECRET || ''

        let pagePath = '/'
        if (globalConfig?.slug === 'about-page') pagePath = '/about/'
        if (globalConfig?.slug === 'contacts-page') pagePath = '/contacts/'
        if (globalConfig?.slug === 'services-page') pagePath = '/services/'
        if (globalConfig?.slug === 'shop-page') pagePath = '/shop/'
        if (globalConfig?.slug === 'review-page') pagePath = '/reviews/'
        if (globalConfig?.slug === 'consent-page') pagePath = '/consent/'
        if (globalConfig?.slug === 'offer-page') pagePath = '/offer/'
        if (globalConfig?.slug === 'privacy-page') pagePath = '/privacy/'

        return `${baseUrl}/api/preview?secret=${secret}&url=${pagePath}`
      },
      globals: [
        'home-page',
        'about-page',
        'contacts-page',
        'services-page',
        'shop-page',
        'review-page',
        'consent-page',
        'offer-page',
        'privacy-page',
      ],
      breakpoints: [
        { label: 'Телефон', name: 'mobile', width: 375, height: 667 },
        { label: 'Планшет', name: 'tablet', width: 768, height: 1024 },
        { label: 'Компьютер', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Services, Guides, Reviews, Consultations, Recipes, MenuGuides],
  globals: [
    Contacts,
    HomePageGlobal,
    AboutPageGlobal,
    ContactsPageGlobal,
    ServicesPageGlobal,
    ShopPageGlobal,
    ReviewPageGlobal,
    ConsentPageGlobal,
    OfferPageGlobal,
    PrivacyPageGlobal,
  ],
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
          false: 'НЕТ',
          true: 'ДА',
        },
      },
    },
  },
})
