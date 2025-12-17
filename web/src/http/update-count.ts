import { api } from '@/lib/api'

interface UpdateCountRequest {
  name?: string
  email?: string
  password?: string
}

// biome-ignore lint/suspicious/noConfusingVoidType: <Não retorna >
type UpdateCountResponse = void

export async function updateCount({
  name,
  email,
  password,
}: UpdateCountRequest): Promise<UpdateCountResponse> {
  await api
    .put('users', {
      json: {
        name,
        email,
        password,
      },
    })
    .json<UpdateCountResponse>()
}
