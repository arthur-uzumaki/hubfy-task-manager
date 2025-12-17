import { and, eq } from 'drizzle-orm'
import type { Task } from '../../../../domain/entities/task.ts'
import type { TaskRepository } from '../../../../domain/repositories/task/task-repository.ts'
import { db } from '../../connection.ts'
import { TaskMapper } from '../../mappers/mapper-task.ts'
import { schema } from '../../schema/index.ts'

export class TaskRepositoryDrizzle implements TaskRepository {
  async findById(id: string): Promise<Task | null> {
    const result = await db
      .select({
        id: schema.task.id,
        userId: schema.task.userId,
        title: schema.task.title,
        description: schema.task.description,
        slug: schema.task.slug,
        status: schema.task.status,
        createdAt: schema.task.createdAt,
        updatedAt: schema.task.updatedAt,
      })
      .from(schema.task)
      .where(eq(schema.task.id, id))

    if (result.length === 0) {
      return null
    }

    const task = TaskMapper.toDomain(result[0])

    return task
  }
  async create(task: Task): Promise<{ id: string }> {
    const raw = TaskMapper.toPersistence(task)

    await db.insert(schema.task).values(raw)

    return { id: raw.id }
  }
  async findMany(userId: string): Promise<Task[]> {
    const result = await db
      .select({
        id: schema.task.id,
        userId: schema.task.userId,
        title: schema.task.title,
        description: schema.task.description,
        slug: schema.task.slug,
        status: schema.task.status,
        createdAt: schema.task.createdAt,
        updatedAt: schema.task.updatedAt,
      })
      .from(schema.task)
      .where(eq(schema.task.userId, userId))

    const tasks = result.map(TaskMapper.toDomain)

    return tasks
  }

  async save(task: Task): Promise<void> {
    const raw = TaskMapper.toPersistence(task)

    const { id, ...updateSet } = raw

    await db.update(schema.task).set(updateSet).where(eq(schema.task.id, id))
  }

  async delete(slug: string, userId: string): Promise<boolean> {
    const result = await db
      .delete(schema.task)
      .where(and(eq(schema.task.slug, slug), eq(schema.task.userId, userId)))

    return result[0].affectedRows > 0
  }

  async findBySlug(slug: string): Promise<Task | null> {
    const result = await db
      .select()
      .from(schema.task)
      .where(eq(schema.task.slug, slug))

    if (result.length === 0) {
      return null
    }

    const task = TaskMapper.toDomain(result[0])

    return task
  }
}
