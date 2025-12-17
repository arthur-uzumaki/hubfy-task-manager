import { api } from '@/lib/api'
import type { Status } from './types/status'

interface CreateTaskRequest {
  title: string
  description?: string
  status: Status
}

interface CreateTaskResponse {
  taskId: string
}

export async function createTask({
  status,
  title,
  description,
}: CreateTaskRequest): Promise<CreateTaskResponse> {
  const response = await api
    .post('tasks', {
      json: {
        title,
        description,
        status,
      },
    })
    .json<CreateTaskResponse>()

  return response
}
