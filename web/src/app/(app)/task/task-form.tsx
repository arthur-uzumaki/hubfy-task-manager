'use client'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
  createTaskAction,
  type TaskFormSchema,
  updateTaskAction,
} from '@/app/(app)/task/actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { userFormState } from '@/hooks/use-form-state'
import type { Status } from '@/http/types/status'

interface TaskFormProps {
  isUpdating?: boolean
  initialDate?: TaskFormSchema
}

const statusLabels = {
  pending: 'Pendente',
  in_progress: 'Em Progresso',
  completed: 'Concluída',
}
export function TaskForm({ initialDate, isUpdating }: TaskFormProps) {
  const [status, setStatus] = useState<Status>(initialDate?.status ?? 'pending')
  const formActions = isUpdating ? updateTaskAction : createTaskAction

  const [{ errors, message, success }, formAction, isPending] =
    userFormState(formActions)

  function handleStatusChange(value: Status) {
    setStatus(value)
  }

  return (
    <Card className="p-6">
      {success === false && message && (
        <Alert variant={'destructive'}>
          <AlertTriangle className="size-4" />
          <AlertTitle>Criar tarefa falhou </AlertTitle>
          <AlertDescription>
            <span>{message}</span>
          </AlertDescription>
        </Alert>
      )}
      {success === true && message && (
        <Alert variant="success">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <form className="space-y-6" action={formAction}>
        <div className="space-y-2">
          <Label htmlFor="title" className="font-medium text-sm">
            Título <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Digite o título da task"
            defaultValue={initialDate?.title}
          />
          {errors?.title && (
            <span className="font-medium text-red-400 text-xs dark:text-red-500">
              {errors.title[0]}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="font-medium text-sm">
            Descrição
          </Label>
          <Textarea
            name="description"
            id="description"
            placeholder="Digite uma descrição detalhada (opcional)"
            defaultValue={initialDate?.description}
          />
          <p className="text-muted-foreground text-xs">Campo opcional</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="font-medium text-sm">
            Status <span className="text-destructive">*</span>
          </Label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">{statusLabels.pending}</SelectItem>
              <SelectItem value="in_progress">
                {statusLabels.in_progress}
              </SelectItem>
              <SelectItem value="completed">
                {statusLabels.completed}
              </SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="status" value={status} />

          {errors?.status && (
            <span className="font-medium text-red-400 text-xs dark:text-red-500">
              {errors.status[0]}
            </span>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Salve task'
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
