import type { InferSelectModel } from 'drizzle-orm'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id.ts'
import { Task } from '../../../domain/entities/task.ts'
import { Slug } from '../../../domain/entities/value-object/slug.ts'
import type { schema } from '../schema/index.ts'

type TaskRaw = InferSelectModel<typeof schema.task>

// biome-ignore lint/complexity/noStaticOnlyClass: <Não precisa ser instanciado>
export class TaskMapper {
  static toDomain(raw: TaskRaw): Task {
    return Task.create(
      {
        title: raw.title,
        userId: raw.userId,
        description: raw.description ?? undefined,
        slug: Slug.create(raw.slug),
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPersistence(task: Task) {
    return {
      id: task.id.toString(),
      userId: task.userId,
      title: task.title,
      description: task.description,
      slug: task.slug.value,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }
}
