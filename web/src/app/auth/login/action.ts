'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'
import { sigIn } from '@/http/sig-in'

const signInFormSchema = z.object({
  email: z.email('Por favor, forneça um endereço de e-mail válido.'),
  password: z.string().min(1, 'Por favor, forneça sua senha.'),
})

export async function loginAction(_: unknown, data: FormData) {
  const result = signInFormSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { email, password } = result.data

    const { accessToken } = await sigIn({ email, password })

    const cookiesStore = await cookies()
    cookiesStore.set('accessToken', accessToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }
    console.error(error)
  }

  redirect('/dashboard')
}
