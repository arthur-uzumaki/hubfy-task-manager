import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  RefreshCw,
  User,
} from 'lucide-react'
import { updateTag } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { deleteTask } from '@/http/delete-task'
import type { GetTaskResponse } from '@/http/get-task'
import type { Status } from '@/http/types/status'
import { updateTaskStatus } from '@/http/update-task-status'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/format-date'
import { DeleteTask } from './delete-task'
import { TaskStatusSelect } from './task-status-select'

const statusConfig = {
  pending: {
    label: 'Pendente',
    icon: Clock,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
  },
  in_progress: {
    label: 'Em Progresso',
    icon: RefreshCw,
    color: 'text-chart-1',
    bgColor: 'bg-chart-1/10',
  },
  completed: {
    label: 'Concluída',
    icon: CheckCircle2,
    color: 'text-chart-2',
    bgColor: 'bg-chart-2/10',
  },
}

interface Props extends GetTaskResponse {}

export function Details({ task }: Props) {
  const config = statusConfig[task.status]
  const Icon = config.icon

  async function handleDeleteTask() {
    'use server'
    try {
      await deleteTask({ slug: task.slug })
      updateTag('tasks')
    } catch (error) {
      console.error(error)
    }

    redirect('/dashboard')
  }

  async function handleUpdateTaskStatus(value: Status) {
    'use server'
    try {
      await updateTaskStatus({
        slug: task.slug,
        status: value,
      })

      updateTag(`task ${task.slug}`)
      updateTag('tasks')
    } catch (error) {
      console.error('Erro ao atualizar status', error)
    }
  }

  return (
    <>
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para dashboard
      </Link>

      <div className="mb-6">
        <div className="mb-4 flex items-start gap-4">
          <div className={cn('rounded-lg p-3', config.bgColor)}>
            <Icon className={cn('h-6 w-6', config.color)} />
          </div>
          <div className="flex-1">
            <h1 className="text-balance font-bold text-3xl text-foreground tracking-tight">
              {task.title}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={cn(
                  'rounded-full px-3 py-1 font-medium text-sm',
                  config.bgColor,
                  config.color
                )}
              >
                {config.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Descrição</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">
            {task.description || 'Sem descrição disponível'}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Gerenciar Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label
              htmlFor="status"
              className="font-medium text-foreground text-sm"
            >
              Alterar progresso da task
            </label>
            <TaskStatusSelect
              onUpdateStatus={handleUpdateTaskStatus}
              defaultValue={task.status}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1" variant="default">
              <Link href={`/task/${task.slug}/update-task`}>Editar Task</Link>
            </Button>
            <DeleteTask onDelete={handleDeleteTask} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Informações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-muted-foreground text-sm">
                Criada em
              </p>
              <p className="text-base text-foreground">
                {formatDate(task.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-muted-foreground text-sm">
                Última atualização
              </p>
              <p className="text-base text-foreground">
                {formatDate(task.updatedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-muted-foreground text-sm">
                ID do usuário
              </p>
              <p className="font-mono text-base text-foreground">
                {task.userId}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
