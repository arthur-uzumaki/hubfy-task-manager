import { getCookie } from 'cookies-next'
import ky from 'ky'
import { env } from '@/env/env'
export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async request => {
        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          const getToken = (await serverCookies()).get('accessToken')?.value

          if (getToken) {
            request.headers.set('Authorization', `Bearer ${getToken}`)
          }
        } else {
          const token = getCookie('accessToken')
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        }
      },
    ],
  },
})
