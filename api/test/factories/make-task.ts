import { faker } from '@faker-js/faker'
import type { UniqueEntityId } from '../../src/core/entities/unique-entity-id.ts'
import { Task, type TaskProps } from '../../src/domain/entities/task.ts'
import { Slug } from '../../src/domain/entities/value-object/slug.ts'

export function makeTask(
  override: Partial<TaskProps> = {},
  id?: UniqueEntityId
) {
  const task = Task.create(
    {
      userId: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 3, max: 6 }),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement([
        'pending',
        'in_progress',
        'completed',
      ]),
      slug: Slug.createFromText(
        faker.helpers.slugify(faker.lorem.words(3)).toLowerCase()
      ),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  )

  return task
}
