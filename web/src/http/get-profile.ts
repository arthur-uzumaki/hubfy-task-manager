import { api } from '@/lib/api'

interface GetProfileResponse {
  user: {
    id: string
    name: string
    email: string
    password: string
    createdAt: string
  }
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get('me').json<GetProfileResponse>()

  return response
}
