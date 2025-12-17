import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'
import request from 'supertest'
import { app } from '../../src/http/app.ts'
import { db } from '../../src/http/db/connection.ts'
import { schema } from '../../src/http/db/schema/index.ts'
export async function makeUserDrizzle({
  email,
  password,
}: {
  email?: string
  password?: string
} = {}) {
  const hashedPassword = await hash(password ?? '123456789', 8)
  const id = randomUUID()
  await db.insert(schema.user).values({
    id,
    name: faker.person.fullName(),
    email: email ?? faker.internet.email(),
    password: hashedPassword,
  })

  return {
    id,
    email,
    password,
  }
}

interface MakeAuthenticateUserParams {
  email?: string
  password?: string
}

export async function makeAuthenticateUser(
  params?: MakeAuthenticateUserParams
) {
  const email = params?.email ?? faker.internet.email()
  const password = params?.password ?? '123456789'

  const user = await makeUserDrizzle({
    email,
    password,
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({ email, password })

  const { accessToken } = authResponse.body

  return {
    accessToken,
    userId: user.id,
    email,
    password,
  }
}
