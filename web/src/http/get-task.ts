import { cacheLife, cacheTag } from 'next/cache'
import { api } from '@/lib/api'
import type { Status } from './types/status'

interface GetTaskRequest {
  slug: string
}

export interface GetTaskResponse {
  task: {
    id: string
    userId: string
    title: string
    status: Status
    slug: string
    createdAt: string
    updatedAt: string
    description?: string | undefined
  }
}

export async function getTask({
  slug,
}: GetTaskRequest): Promise<GetTaskResponse> {
  'use cache: private'
  cacheLife('hours')
  cacheTag('task', slug)

  const response = await api.get(`tasks/${slug}`).json<GetTaskResponse>()
  return response
}
