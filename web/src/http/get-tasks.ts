import { cacheLife, cacheTag } from 'next/cache'
import { api } from '@/lib/api'
import type { Status } from './types/status'

interface GetTasksResponse {
  tasks: {
    id: string
    userId: string
    title: string
    status: Status
    slug: string
    createdAt: string
    updatedAt: string
    description?: string | undefined
  }[]
}

export async function getTasks(): Promise<GetTasksResponse> {
  'use cache: private'
  cacheLife('minutes')
  cacheTag('tasks')

  const response = await api.get('tasks').json<GetTasksResponse>()
  return response
}
