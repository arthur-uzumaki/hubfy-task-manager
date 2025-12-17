import { api } from '@/lib/api'

interface DeleteTaskRequest {
  slug: string
}

// biome-ignore lint/suspicious/noConfusingVoidType: <Não retorna nada>
type DeleteTaskResponse = void

export async function deleteTask({
  slug,
}: DeleteTaskRequest): Promise<DeleteTaskResponse> {
  await api.delete(`tasks/${slug}`).json<DeleteTaskResponse>()
}
