import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckSquare,
  Mail,
  User,
} from 'lucide-react'
import type { Metadata } from 'next'
import { updateTag } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth/auth'
import { ThemeSwitcher } from '@/components/theme/theme-switcher'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { deleteCount } from '@/http/delete-count'
import { getUserTasksCount } from '@/http/get-user-tasks-count'
import { formatDate } from '@/utils/format-date'
import { DeleteCount } from './delete-count'

export const metadata: Metadata = {
  title: 'Settings',
}

export default async function SettingsPage() {
  const { user } = await auth()
  const { count } = await getUserTasksCount()

  async function handleDeleteAccount() {
    'use server'
    try {
      await deleteCount()
      updateTag('tasks')
    } catch (error) {
      console.log(error)
    }

    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para dashboard
        </Link>

        <h1 className="font-bold text-3xl text-foreground tracking-tight">
          Configurações
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gerencie suas informações de conta e preferências
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Informações da Conta
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Seus dados pessoais e informações de contato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-border">
                <AvatarFallback className="bg-primary font-semibold text-lg text-primary-foreground">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground text-lg">
                  {user.name}
                </h3>
                <p className="text-muted-foreground text-sm">ID: {user.id}</p>
              </div>
            </div>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Nome</p>
                    <p className="text-base text-foreground">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-base text-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Membro desde</p>
                    <p className="text-base text-foreground">{formatDate(user.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Tarefas Criadas</p>
                    <p className="text-base text-foreground">{count === 0 ? "Nenhuma tarefa criada": count}</p>
                  </div>
                </div>
              </div>

            <div className="flex justify-end border-border border-t pt-6">
              <Button asChild>
                <Link href={`/settings/${user.id}/update-count`}>
                  Editar Conta
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Aparência</CardTitle>
            <CardDescription className="text-muted-foreground">
              Personalize a aparência do aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Tema</p>
                <p className="text-muted-foreground text-sm">
                  Alternar entre modo claro e escuro
                </p>
              </div>
              <ThemeSwitcher />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Ações irreversíveis que afetam sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-medium text-foreground">Deletar Conta</h4>
                  <p className="text-muted-foreground text-sm">
                    Uma vez deletada, sua conta não poderá ser recuperada. Todos
                    os seus dados serão permanentemente removidos.
                  </p>
                </div>
                <DeleteCount onDelete={handleDeleteAccount} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
