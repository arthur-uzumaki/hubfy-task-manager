'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Status } from '@/http/types/status'

type TaskStatusSelectProps = {
  onUpdateStatus?: (value: Status) => void
  defaultValue: Status
}

export function TaskStatusSelect({
  onUpdateStatus,
  defaultValue,
}: TaskStatusSelectProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onUpdateStatus}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="pending">Pendente</SelectItem>
        <SelectItem value="in_progress">Em progresso</SelectItem>
        <SelectItem value="completed">Concluída</SelectItem>
      </SelectContent>
    </Select>
  )
}
