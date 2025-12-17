import { cacheLife } from 'next/cache'
import { api } from '@/lib/api'
import type { Status } from './types/status'

interface UpdateTaskStatusRequest {
  status: Status
  slug: string
}

// biome-ignore lint/suspicious/noConfusingVoidType: <a reposta http não tem retorno>
type UpdateTaskStatusResponse = void

export async function updateTaskStatus({
  status,

  slug,
}: UpdateTaskStatusRequest): Promise<UpdateTaskStatusResponse> {
  'use cache: private'
  cacheLife('seconds')

  await api
    .patch(`tasks/${slug}/status`, {
      json: {
        status,
      },
    })
    .json<UpdateTaskStatusResponse>()
}
