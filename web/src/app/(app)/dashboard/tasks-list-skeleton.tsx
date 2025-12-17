import { TaskCardSkeleton } from './task-card-skeleton'

export function TasksListSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <Usa o index>
        <TaskCardSkeleton key={index} />
      ))}
    </>
  )
}
