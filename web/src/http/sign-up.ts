import { api } from '@/lib/api'

interface SingUpRequest {
  name: string
  email: string
  password: string
}

type SingUpResponse = {
  userId: string
}

export async function singUp({
  name,
  email,
  password,
}: SingUpRequest): Promise<SingUpResponse> {
  const response = await api
    .post('users', {
      json: {
        name,
        email,
        password,
      },
    })
    .json<SingUpResponse>()

  return response
}
