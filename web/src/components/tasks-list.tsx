import { CheckCircle2, Clock, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { getTasks } from '@/http/get-tasks'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/format-date'
import { Card, CardContent } from './ui/card'

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

export async function TasksList() {
  const { tasks } = await getTasks()

  if (tasks.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Nenhuma task encontrada</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {tasks.map(task => {
        const config = statusConfig[task.status]
        const Icon = config.icon

        return (
          <Link key={task.id} href={`/task/${task.slug}`}>
            <Card className="h-full border-border transition-all hover:border-primary/50 hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className={cn('rounded-lg p-2.5', config.bgColor)}>
                      <Icon className={cn('h-5 w-5', config.color)} />
                    </div>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2.5 py-1 font-medium text-xs',
                        config.bgColor,
                        config.color
                      )}
                    >
                      {config.label}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="mb-2 text-balance font-semibold text-foreground leading-tight">
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="mb-3 line-clamp-2 text-muted-foreground text-sm">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-col gap-1 text-muted-foreground text-xs">
                      <span>Criada: {formatDate(task.createdAt)}</span>
                      <span>Atualizada: {formatDate(task.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </>
  )
}
