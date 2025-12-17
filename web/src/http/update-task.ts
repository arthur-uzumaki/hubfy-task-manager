import { api } from '@/lib/api'
import type { Status } from './types/status'

interface UpdateTaskRequest {
  title: string
  description?: string
  status: Status
  slug: string
}

// biome-ignore lint/suspicious/noConfusingVoidType: <a reposta http não tem retorno>
type UpdateTaskResponse = void

export async function updateTask({
  status,
  title,
  description,
  slug,
}: UpdateTaskRequest): Promise<UpdateTaskResponse> {
  'use cache: private'
  await api
    .put(`tasks/${slug}`, {
      json: {
        title,
        description,
        status,
      },
    })
    .json<UpdateTaskResponse>()
}
