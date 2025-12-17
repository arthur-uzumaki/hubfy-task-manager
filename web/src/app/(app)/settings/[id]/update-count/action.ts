'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import z from 'zod'
import { auth } from '@/auth/auth'
import { updateCount } from '@/http/update-count'

const updateCountFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .refine(
        value => value.split(' ').length > 1,
        'Por favor, digite seu nome completo.'
      ),
    email: z
      .email('Por favor, forneça um endereço de e-mail válido.')
      .min(1, 'Email é obrigatório'),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
  })
  .refine(
    data => {
      if (data.password && data.password.trim() !== '') {
        return data.password.length >= 8
      }
      return true
    },
    {
      message: 'A senha deve ter no mínimo 8 caracteres.',
      path: ['password'],
    }
  )
  .refine(
    data => {
      if (data.password && data.password.trim() !== '') {
        return data.password === data.password_confirmation
      }
      return true
    },
    {
      message: 'A confirmação da senha não corresponde.',
      path: ['password_confirmation'],
    }
  )

export async function updateCountAction(_: unknown, data: FormData) {
  const result = updateCountFormSchema.safeParse(Object.fromEntries(data))
  const { user } = await auth()

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  try {
    const { email, name, password } = result.data

    const updateData: {
      name: string
      email: string
      password?: string
    } = {
      name,
      email,
    }

    if (password && password.trim() !== '') {
      updateData.password = password
    }

    await updateCount(updateData)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      return { success: false, message, errors: null }
    }

    console.error('Erro ao atualizar conta:', error)
    return {
      success: false,
      message: 'Ocorreu um erro ao atualizar a conta.',
      errors: null,
    }
  }

  redirect(`/settings/${user.id}`)
}
