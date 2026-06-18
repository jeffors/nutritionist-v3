import PasswordResetEmail from 'emails/password-reset'
import type { CollectionConfig } from 'payload'
import { render } from 'react-email'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: async ({ token } = {}) => {
        return await render(
          PasswordResetEmail({
            url: `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/reset/?token=${token}`,
          }),
        )
      },
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
