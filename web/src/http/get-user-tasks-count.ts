import { api } from '@/lib/api'

interface GetUserTasksCountResponse {
  count: number
}

export async function getUserTasksCount() {
  const result = await api.get('tasks/count').json<GetUserTasksCountResponse>()
  return result
}
