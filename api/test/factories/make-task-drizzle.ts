import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { db } from '../../src/http/db/connection.ts'
import { schema } from '../../src/http/db/schema/index.ts'

interface MakeTaskParams {
  userId: string
}

export async function makeTaskDrizzle({ userId }: MakeTaskParams) {
  const slug = `${faker.helpers
    .slugify(faker.lorem.words(3))
    .toLowerCase()}-${randomUUID().slice(0, 8)}`

  await db.insert(schema.task).values({
    id: randomUUID(),
    userId,
    title: faker.lorem.sentence({ min: 3, max: 6 }),
    description: faker.lorem.paragraph(),
    slug,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return { slug }
}
