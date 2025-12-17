import { api } from '@/lib/api'

// biome-ignore lint/suspicious/noConfusingVoidType: <Não retorna nada>
type DeleteCountResponse = void

export async function deleteCount(): Promise<DeleteCountResponse> {
  await api.delete('users').json<DeleteCountResponse>()
}
