import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UpdateForm } from './update-form'

export const metadata = {
  title: 'Editar conta',
}

export default async function EditAccountPage() {
  const { user } = await auth()
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={`/settings/${user.id}`}
          className="mb-6 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Configurações
        </Link>
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-foreground tracking-tight">
            Editar Conta
          </h1>
          <p className="mt-2 text-muted-foreground">
            Atualize suas informações pessoais
          </p>
        </div>{' '}
        {/* Header */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Informações Pessoais
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Faça alterações nas suas informações de perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateForm
              initialDate={{
                name: user.name,
                email: user.email,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
