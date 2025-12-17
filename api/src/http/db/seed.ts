import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { db } from './connection.ts'
import { schema } from './schema/index.ts'

// helper simples pra slug
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function seed() {
  const passwordHash = await hash('1234567889', 8)

  for (let i = 0; i < 10; i++) {
    // 👤 cria usuário
    const userId = randomUUID()

    await db.insert(schema.user).values({
      id: userId,
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: passwordHash,
    })

    // 📝 cria entre 1 e 5 tasks para cada usuário
    const tasksCount = faker.number.int({ min: 1, max: 5 })

    const tasks = Array.from({ length: tasksCount }).map(() => {
      const title = faker.lorem.sentence({ min: 3, max: 6 })

      return {
        id: randomUUID(),
        userId,
        title,
        description: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement([
          'pending',
          'in_progress',
          'completed',
        ] as const),
        slug: `${slugify(title)}-${faker.string.nanoid(6)}`,
      }
    })

    await db.insert(schema.task).values(tasks)
  }

  console.log('✅ Seed com usuários e tasks criado com sucesso!')
}

seed()
  .catch(err => {
    console.error('❌ Erro ao rodar seed:', err)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
