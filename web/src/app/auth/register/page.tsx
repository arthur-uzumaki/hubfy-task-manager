import type { Metadata } from 'next'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterForm } from './register-form'

export const metadata: Metadata = {
  title: 'Registrar',
}

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm space-y-10">
      <CardHeader>
        <CardTitle>Criar sua conta</CardTitle>
        <CardDescription>
          Insira suas informações abaixo para criar sua conta.
        </CardDescription>
      </CardHeader>

      <RegisterForm />
    </div>
  )
}
