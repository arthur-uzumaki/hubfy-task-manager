import { api } from '@/lib/api'

interface SignRequest {
  email: string
  password: string
}

interface SignResponse {
  accessToken: string
}

export async function sigIn({
  email,
  password,
}: SignRequest): Promise<SignResponse> {
  const response = await api
    .post('sessions', {
      json: {
        email,
        password,
      },
    })
    .json<SignResponse>()

  return response
}
