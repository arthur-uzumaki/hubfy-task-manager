import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getProfile } from '@/http/get-profile'

export async function getCurrentTask(): Promise<string | null> {
  const cookiesStore = await cookies()
  const slug = cookiesStore.get('task')?.value

  return slug ?? null
}

export async function isAuthenticate(): Promise<boolean> {
  const cookiesStore = await cookies()

  return !!cookiesStore.get('accessToken')?.value
}

export async function auth() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('accessToken')?.value

  if (!token) {
    redirect('/auth/login')
  }

  try {
    const { user } = await getProfile()
    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
