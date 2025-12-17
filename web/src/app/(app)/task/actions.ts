/** biome-ignore-all lint/style/noNonNullAssertion: <Nunca vai ser null> */
'use server'

import { HTTPError } from 'ky'
import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import z from 'zod'
import { getCurrentTask } from '@/auth/auth'
import { createTask } from '@/http/create-task'
import { updateTask } from '@/http/update-task'

const taskFormSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']),
})

export type TaskFormSchema = z.infer<typeof taskFormSchema>

export async function createTaskAction(_: unknown, data: FormData) {
  const result = taskFormSchema.safeParse(Object.fromEntries(data))
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { status, title, description } = result.data
    await createTask({
      title,
      description,
      status,
    })
    updateTag('tasks')
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    console.error(error)
  }
  return {
    success: true,
    message: 'Tarefa criada com sucesso!',
    errors: null,
  }
}

export async function updateTaskAction(_: unknown, data: FormData) {
  const currentTask = await getCurrentTask()
  const result = taskFormSchema.safeParse(Object.fromEntries(data))
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { status, title, description } = result.data
    await updateTask({
      title,
      description,
      status,
      slug: currentTask!,
    })
    updateTag('tasks')
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    console.error(error)
  }
  redirect('/dashboard')
}
