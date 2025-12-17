import type { Task } from '../../../src/domain/entities/task.ts'
import type { TaskRepository } from '../../../src/domain/repositories/task/task-repository.ts'

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = []

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find(task => task.id.toString() === id)

    if (!task) {
      return null
    }
    return task
  }
  async create(task: Task): Promise<{ id: string }> {
    this.tasks.push(task)

    return { id: task.id.toString() }
  }

  async findMany(userId: string): Promise<Task[]> {
    return this.tasks.filter(task => task.userId === userId)
  }

  async save(task: Task): Promise<void> {
    const taskIndex = this.tasks.findIndex(
      t => t.id.toString() === task.id.toString()
    )
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = task
    }
  }
  async delete(slug: string, userId: string): Promise<boolean> {
    const taskIndex = this.tasks.findIndex(
      task => task.slug.value === slug && task.userId === userId
    )

    if (taskIndex === -1) {
      return false
    }

    this.tasks.splice(taskIndex, 1)

    return true
  }

  async findBySlug(slug: string): Promise<Task | null> {
    return this.tasks.find(t => t.slug.value === slug) || null
  }
}
