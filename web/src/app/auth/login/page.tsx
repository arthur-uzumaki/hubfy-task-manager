import type { Metadata } from 'next'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Login',
}
export default function LoginPage() {
  return (
    <div className="w-full max-w-sm space-y-10">
      <CardHeader>
        <CardTitle>Faça login na sua conta</CardTitle>
        <CardDescription>
          Insira seu e-mail abaixo para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <LoginForm />
    </div>
  )
}
