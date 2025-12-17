import { redirect } from 'next/navigation'
import { isAuthenticate } from '@/auth/auth'

export default async function AuthRedirect({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticate()

  if (authenticated) {
    redirect('/')
  }

  return <>{children}</>
}
