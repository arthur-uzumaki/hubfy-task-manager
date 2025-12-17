import type { Task } from '../../entities/task.ts'

export abstract class TaskRepository {
  abstract findById(id: string): Promise<Task | null>
  abstract create(task: Task): Promise<{ id: string }>
  abstract findMany(userId: string): Promise<Task[]>
  abstract save(task: Task): Promise<void>
  abstract delete(slug: string, userId: string): Promise<boolean>
  abstract findBySlug(slug: string): Promise<Task | null>
}
