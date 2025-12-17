'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import z from 'zod'
import { singUp } from '@/http/sign-up'

const signUpFormSchema = z
  .object({
    name: z
      .string()
      .refine(
        value => value.split(' ').length > 1,
        'Por favor, digite seu nome completo .'
      ),
    email: z.email('Por favor, forneça um endereço de e-mail válido.'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    password_confirmation: z.string(),
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'A confirmação da senha não corresponde.',
    path: ['password_confirmation'],
  })

export type SignUpForm = z.infer<typeof signUpFormSchema>

export async function registerAction(_: unknown, data: FormData) {
  const result = signUpFormSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { email, name, password } = result.data
    await singUp({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }
  }

  redirect('/auth/login')
}
